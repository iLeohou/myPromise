var path = require('path');
var fs = require('fs');
var myRequire = function (id) {
    var ext = Module.prototype.getPath(id);
    var myModule = new Module(ext);
    var extName = path.extname(ext);
    var result = Module.extensions[extName](myModule);
    return result;
};
function Module(id) {
    this.id = id;
    this.exports = {};
}
Module.extensions = {};
Module.extensions['.js'] = function (module) {
    var script = fs.readFileSync(module.id, 'utf-8');
    var self = this;
    (function (exports, myRequire, module) {
        eval(script);
    }(module.exports, myRequire, self));
    return module.exports;
};
Module.prototype.getPath = function (id) {
    var absPath = path.resolve(id);
    if (fs.existsSync(absPath)) {
        return absPath;
    }
    var extensions = Object.keys(Module.extensions);
    for (var i = 0; i < extensions.length; i++) {
        var ext = absPath + "." + extensions[i];
        if (fs.existsSync(ext)) {
            return ext;
        }
    }
    throw new Error('Can not find file');
};

const b = require('./b.js');
b()
