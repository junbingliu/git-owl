const { lstatSync, readdirSync } = require('fs')
const fs = require('fs');
const { join,resolve } = require('path')
const {spawnSync} = require('child_process');
const {getFormSpecs} = require('./dsl');
const template= require("art-template");

var context = {
  eventHandlers:[]
}

const isDirectory = source => lstatSync(source).isDirectory()
const getDirectories = source =>
  readdirSync(resolve(__dirname, source)).map(name => join(source, name)).filter(isDirectory);



function readOwlEvent(fullPath){
  var content = fs.readFileSync(fullPath,{encoding:"utf-8"});
  var owlEvent = JSON.parse(content);
  return owlEvent;
}


function buildEventHandlers(owlEvent,ctx){
  var appId = owlEvent.appId;
  var eventHandlers = [];
  var events = owlEvent.events;
  for(var eventName in events){
    var evt = events[eventName];
    var description = evt.rem;
    var pageId = "eventHandlers/"+eventName+ ".jsx";
    var handlerId = appId + "_" + eventName;
    eventHandlers.push({
      eventName:eventName,
      pageId:pageId,
      handlerId:handlerId,
      description:description
    })
  }
  ctx.eventHandlers = eventHandlers;
}

function buildServices(evt,evtName,owlEvent,ctx){
  var pickItem = evt.process.pickItem;
  var types = {};
  if(pickItem){
    for(var k in pickItem){
      var item = pickItem[k];
      if(item._t){
        types[item._t] = item._t;
      }
    }
  }

  var actions = evt.process.actions;
  if(actions){
    actions.forEach(function(action){
      if(action._t){
        types[action._t] = action._t;
      }
    });
  }

  var pickService = evt.process.pickService;
  if(pickService){
    pickService.forEach(function(type){types[type] = type;})
  }


  var services = [];
  var imports = [];
  for(var _t in types){
    var service = "context.services['" + _t +"']="+"erp_"+_t+"Service;";
    services.push(service);
    ctx.services = services.join("\n");

    var importStr = "//#import $erp_" + _t + ":services/modelService.jsx" ;
    imports.push(importStr);
    ctx.imports = imports.join("\n");
  }
}

function buildCheck(evt,evtName,owlEvent,ctx){
  var check = "null";
  if(evt.check){
    check = evt.check.replace(/\$/g,"context.$");
    ctx.check = "function(context){ return (" + check + ")}";
  }
  else{
    ctx.check = null;
  }

}

function processOwlEvent(owlEvent,outdir,templateDir,ctx){


  if(!ctx){
    ctx = {};
    buildEventHandlers(owlEvent,ctx);
    //1.创建app
    var appId = owlEvent.appId;
    var appDir = join(outdir,appId);
    try{fs.mkdirSync(appDir);}catch(e){}
    outdir = appDir;
  }


  var fullTemplatePath = resolve(__dirname,templateDir);
  readdirSync(fullTemplatePath).map(name => {
    var fullname = resolve(fullTemplatePath,name);
    if(isDirectory(fullname)){
      subOutDir = resolve(outdir,name);
      try{fs.mkdirSync(subOutDir);}catch(e){};
      processOwlEvent(owlEvent,subOutDir,fullname,ctx);
      return;
    }
    if(name.indexOf(".png")>-1 || name.indexOf(".PNG") >-1
      || name.indexOf(".jpg")>-1 || name.indexOf(".jpeg")>-1 ||
      name.indexOf(".JPG")>-1 || name.indexOf(".jpeg")>-1){
      var dst = resolve(outdir,name);
      fs.copyFileSync(fullname,dst);
      return;
    }



    if(name.indexOf("handlerTemplate.jsx")==-1){

      var fileContent = fs.readFileSync(fullname,{encoding:"utf-8"});
      fileContent = fileContent.replace(/@appId/g,owlEvent.appId);
      fileContent = fileContent.replace(/@appName/g,owlEvent.appName);
      fileContent = fileContent.replace(/@eventHandlers/g,JSON.stringify(ctx.eventHandlers));
      var dst = resolve(outdir,name);
      fs.writeFileSync(dst,fileContent,{flag:'w'});
    }
    else{
      var events = owlEvent.events;
      for(var eventName in events){
        var fileContent = fs.readFileSync(fullname,{encoding:"utf-8"});
        fileContent = fileContent.replace(/@appId/g,owlEvent.appId);
        fileContent = fileContent.replace(/@appName/g,owlEvent.appName);
        fileContent = fileContent.replace(/@eventHandlers/g,JSON.stringify(ctx.eventHandlers));

        var eventConfig = events[eventName];
        buildServices(eventConfig,eventName,owlEvent,ctx);
        buildCheck(eventConfig,eventName,owlEvent,ctx);

        fileContent = fileContent.replace(/@services/g,ctx.services);
        fileContent = fileContent.replace(/@imports/g,ctx.imports);
        fileContent = fileContent.replace(/@check/g,ctx.check);
        fileContent = fileContent.replace(/@eventConfig/g,JSON.stringify(eventConfig));
        var dst = resolve(outdir,eventName + ".jsx");
        fs.writeFileSync(dst,fileContent,{flag:'w'});
      }
    }

  });
}

function processInputDir(inDir,outDir,templateDir){
  readdirSync(inDir).map(function(name){
    if(isDirectory(join(inDir,name))){
      var newOut = join(outDir,name);
      try{fs.mkdirSync(newOut);}catch(e){}
      processInputDir(join(inDir,name),newOut,templateDir);
    }
    else{
      if(name.indexOf(".json")>-1){
        var fullpath = join(inDir,name);
        var owlEvent = readOwlEvent(fullpath);
        processOwlEvent(owlEvent,outDir,templateDir,null);
      }
    }
  });
}

function main(){
  var eventsDir = process.argv[2];
  var eventsAppOut = process.argv[3];
  var eventsAppTemplate = process.argv[4];

  try{fs.mkdirSync(eventsAppOut);}catch(e){}
  //遍历eventsDir,读取每一个.json文件
  processInputDir(eventsDir,eventsAppOut,eventsAppTemplate);
}

main();