#!/usr/bin/env node

const fs = require('fs')
const {join, resolve} = require('path')

let cwd = process.cwd();

//复制owlconfig.json到 当前目录
var templatePath = join(__dirname, "../defaultTemplate")
var buildProperties = join(cwd,'build.properties');
var antLibPath = join(__dirname,'../antLib')
let owlconfig = {
    "models":"models",
    "templates":templatePath,
    "generatedApps":"generatedApps",
    "buildType":"release",
    "buildProperties":buildProperties,
    "libpath":antLibPath
}

let dst = resolve(cwd, "owlconfig.json")
fs.writeFileSync(dst, JSON.stringify(owlconfig), {flag: 'w'})

//在当前目录创建models目录

let modelsDir = join(cwd,"models");
fs.mkdirSync(modelsDir)

//在models Dir 目录下创建一个example.json
let exampleDir = resolve( __dirname,"../examples/models")
fs.readdirSync(exampleDir).map(name => {
    let fullname = resolve(exampleDir,name)
    let dst = resolve(modelsDir,name)
    fs.copyFileSync(fullname, dst)
});

//在project目录下面创建一个build.properties


let buildPropertiesPath = join(__dirname,'../examples/buildProperties');
let fullname = resolve(buildPropertiesPath,'build.properties');
let dstBuildProperties = resolve(cwd,'build.properties')
fs.copyFileSync(fullname, dstBuildProperties)

//生成.gitignore
let gitignorePath = join(__dirname,'../examples/gitignore');
let gitignoreSrc = resolve(gitignorePath,'gitignore_example.txt');
let gitignoreDst = resolve(cwd,'.gitignore')
fs.copyFileSync(gitignoreSrc, gitignoreDst)

