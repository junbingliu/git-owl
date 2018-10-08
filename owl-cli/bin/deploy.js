#!/usr/bin/env node

const { lstatSync, readdirSync,readFileSync } = require('fs')
const fs = require('fs')
const { join,resolve } = require('path')
const {spawnSync} = require('child_process')
const os = require('os')
let cwd = process.cwd();

const isDirectory = source => lstatSync(source).isDirectory()
const getDirectories = source =>
  readdirSync(resolve(cwd, source)).map(name => join(source, name)).filter(isDirectory)

const isAppDir = function (dir) {
  try {
    return fs.existsSync(join(dir, 'build.xml'))
  } catch (e) {
    return false
  }
}


function buildAppDir (dir) {
  var platform = os.platform()
  var ant = platform === 'win32' ? 'ant.bat' : 'ant'
  spawnSync(ant,[],{cwd:resolve(cwd, dir),stdio: 'inherit'});
}

function buildDir(d){
  console.log("processing " + d);
  if(isAppDir(d)){
    buildAppDir(d);
  }else{
    var dirs = getDirectories(d);
    dirs.map(dir=>{
        var fulldir = resolve(d,dir);
        buildDir(fulldir);
   });
  }
}

var configFile = resolve(cwd,"owlconfig.json");

if(process.argv.length>2){
  configFile = resolve(cwd, process.argv[2]);
}

var content = readFileSync(configFile, {encoding: 'utf-8'})
var owlconfig = JSON.parse(content)

var full = resolve(cwd,owlconfig.generatedApps);
buildDir(full);



