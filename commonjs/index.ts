const path = require('path')
const fs = require('fs')

const myRequire = function(id) {
    const ext = Module.prototype.getPath(id);
    const myModule = new Module(ext);
    const extName = path.extname(ext);
    const result = Module.extensions[extName](myModule);
    return result;
}

function Module(id) {
    this.id = id;
    this.exports = {}
}

Module.extensions = {};
Module.extensions['.js'] = function(module) {
    let script = fs.readFileSync(module.id, 'utf-8');
    let self = this;
    (function(exports, myRequire, module) { 
        eval(script);
    }(module.exports, myRequire, self))
    return module.exports;
}

Module.prototype.getPath = function(id) {
    const absPath = path.resolve(id);
    if(fs.existsSync(absPath)) {
        return absPath
    }

    const extensions = Object.keys(Module.extensions);
    for(let i = 0; i < extensions.length; i++) {
        const ext = `${absPath}.${extensions[i]}`;
        if(fs.existsSync(ext)) {
            return ext
        }
    }

    throw new Error('Can not find file');
}





