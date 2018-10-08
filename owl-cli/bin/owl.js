#!/usr/bin/env node

const {lstatSync, readdirSync} = require('fs')
const fs = require('fs')
const {join, resolve} = require('path')
const {getFormSpecs, flattenFormSpecs} = require('./dsl')
const template = require('art-template')

const isDirectory = source => lstatSync(source).isDirectory()
const isFile = source => {
    try {
        return fs.statSync(source).isFile()
    } catch (e) {
        return false
    }
}

var model_git_version = require('child_process')
    .execSync('git rev-parse HEAD')
    .toString().trim()
const owl_version = require('../package.json').version;

function getProjectCode(owl) {
    if (owl._t && owl.prefix) {
        return owl.prefix + owl._t
    } else {
        return "owl_"+owl._t
    }
}

function getProjectName(owl) {
    if (owl['#meta']) {
        return owl['#meta'].projectName
    }
    return null
}

function getMeta(owl) {
    return owl['#meta']
}

let cwd = process.cwd();

var desktopDistDir = ''
var libpath = 'undefined'
var buildProperties = 'undefined'


function mkdir(path) {
    try {
        fs.mkdirSync(path)
    } catch (e) {
    }
}

function processOwl(owl, outdir, templatePath, buildType, inputFile) {
    var projectCode = getProjectCode(owl)
    var projectName = getProjectName(owl)
    var meta = getMeta(owl)
    var formSpecs = getFormSpecs(owl, '')
    var flattenedSpecs = flattenFormSpecs(formSpecs)
    var id = meta.id
    var idFunc = 'null'
    var lockFunc = 'null'
    var lock = meta.lock
    if (id) {
        idFunc = template.compile(id).toString()
    }

    if (lock) {
        lockFunc = template.compile(lock).toString()
    }

    if (!projectCode) {
        console.log(inputFile + ' is not a valid owl file,no projectCode')
        return
    }
    if (!projectName) {
        console.log(inputFile + ' is not a valid owl file,no projectName')
        return
    }

    //  处理templatePath里面的每一个文件
    var fullTemplatePath = resolve(cwd, templatePath)
    readdirSync(fullTemplatePath).map(name => {
        if (name === 'node_modules') {
            return
        }

        // if (buildType !== 'debug' && name === 'desktop' && outdir.indexOf('erp_owl') === -1) {
        //    return
        // }

        var fullname = resolve(fullTemplatePath, name)
        if (isDirectory(fullname)) {
            var subOutDir = resolve(outdir, name)
            mkdir(subOutDir)
            processOwl(owl, subOutDir, fullname, buildType, inputFile)
            return
        }
        var dst = resolve(outdir, name)
        if (name.indexOf('.png') > -1 || name.indexOf('.PNG') > -1 ||
            name.indexOf('.jpg') > -1 || name.indexOf('.jpeg') > -1 ||
            name.indexOf('.JPG') > -1 || name.indexOf('.JPEG') > -1) {
            fs.copyFileSync(fullname, dst)
            return
        }

        var dynaspec = buildType === 'debug' ? JSON.stringify(owl) : 'window.spec'
        var fileContent = fs.readFileSync(fullname, {encoding: 'utf-8'})
        fileContent = fileContent.replace(/@dynaspec/g, dynaspec)
        fileContent = fileContent.replace(/@spec/g, JSON.stringify(owl))
        fileContent = fileContent.replace(/@projectCode/g, projectCode)
        fileContent = fileContent.replace(/@projectName/g, projectName)
        fileContent = fileContent.replace(/@meta/g, JSON.stringify(meta))
        fileContent = fileContent.replace(/@formSpecs/g, JSON.stringify(formSpecs))
        fileContent = fileContent.replace(/@flattenedSpecs/g, JSON.stringify(flattenedSpecs))
        fileContent = fileContent.replace(/@desktopDistDir/g, desktopDistDir)
        fileContent = fileContent.replace(/@idFunc/g, idFunc)
        fileContent = fileContent.replace(/@idOrig/g, id)
        fileContent = fileContent.replace(/@lockFunc/g, lockFunc)
        fileContent = fileContent.replace(/@lockOrig/g, lock)
        fileContent = fileContent.replace(/@buildProperties/g, buildProperties)
        fileContent = fileContent.replace(/@libpath/g, libpath)
        fileContent = fileContent.replace(/@model_git_version/g, model_git_version)
        fileContent = fileContent.replace(/@owl_version/g, owl_version)

        dst = resolve(outdir, name)
        fs.writeFileSync(dst, fileContent, {flag: 'w'})
    })
}

function processOwlFile(inputFile, outdir, templatePath, buildType, modelDir) {
    var content = fs.readFileSync(inputFile, {encoding: 'utf-8'})
    var owl = JSON.parse(content)
    var projectCode = getProjectCode(owl)
    var projectName = getProjectName(owl)
    if (!projectCode) {
        console.log(inputFile + ' is not a valid owl file,no projectCode')
        return
    }
    if (!projectName) {
        console.log(inputFile + ' is not a valid owl file,no projectName')
        return
    }
    var owlProjectDir = join(outdir, projectCode)
    try {
        fs.mkdirSync(owlProjectDir)
    } catch (e) {
    }
    processOwl(owl, owlProjectDir, templatePath, buildType)
    var owlProjectApiSrcDir = join(owlProjectDir, 'api/src')

    // 复制导出文件
    if (isDirectory(owlProjectApiSrcDir)) {
        var excelTemplate = join(modelDir, projectCode + '.xlsx')
        if (isFile(excelTemplate)) {
            var dst = join(owlProjectApiSrcDir, projectCode + '.xlsx')
            fs.copyFileSync(excelTemplate, dst)
        }
    }
}

function processInputDir(dir, outdir, templatePath, buildType) {
    readdirSync(resolve(cwd, dir)).map(name => {
        if (isDirectory(resolve(dir, name))) {
            try {
                fs.mkdirSync(resolve(outdir, name))
            } catch (e) {
            }
            processInputDir(resolve(dir, name), resolve(outdir, name), templatePath, buildType)
        } else if (name.indexOf('.json') > 0) {
            processOwlFile(resolve(dir, name), outdir, templatePath, buildType, dir)
        }
    })
}

var configFile = resolve(cwd,"owlconfig.json");
if (process.argv.length > 2) {
    configFile = resolve(cwd, process.argv[2]);
}


var content = fs.readFileSync(configFile, {encoding: 'utf-8'})
var owlconfig = JSON.parse(content)
var inPath = owlconfig.models;
var outPath = owlconfig.generatedApps
var templatePath = owlconfig.templates
var buildType = owlconfig.buildType;
buildProperties = owlconfig.buildProperties
libpath = owlconfig.libpath

var fulloutPath = resolve(cwd,outPath);

mkdir(fulloutPath);
processInputDir(inPath, fulloutPath, templatePath, buildType)
