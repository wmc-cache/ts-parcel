// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/Vue2.0/Dep.ts":[function(require,module,exports) {
"use strict"; //Dep 的角色，宛如一个“工具人”，它是 Watcher 和 Observer 之间的纽带，是“通信兵”

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Dep = void 0;

var Dep = /*#__PURE__*/function () {
  function Dep() {
    var subs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    _classCallCheck(this, Dep);

    this.subs = subs;
  } // 添加观察者


  _createClass(Dep, [{
    key: "addSub",
    value: function addSub(sub) {
      if (sub && sub.update) {
        this.subs.push(sub);
      }
    } // 发送通知

  }, {
    key: "notify",
    value: function notify() {
      this.subs.forEach(function (sub) {
        sub.update();
      });
    }
  }]);

  return Dep;
}();

exports.Dep = Dep;
},{}],"src/Vue2.0/Watcher.ts":[function(require,module,exports) {
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Watcher = void 0;

var Dep_1 = require("./Dep");

var Watcher = /*#__PURE__*/function () {
  function Watcher(vm, key, cb) {
    _classCallCheck(this, Watcher);

    this.vm = vm;
    this.key = key;
    this.cb = cb; // 把Watcher对象变化的时候更新视图

    Dep_1.Dep.target = this;
    console.log('Dep.target', Dep_1.Dep.target); // 触发get方法, 在get方法中调用addSub

    this.oldValue = vm[key];
    Dep_1.Dep.target = null;
  } // 当数据发生变化的时候更新视图


  _createClass(Watcher, [{
    key: "update",
    value: function update() {
      var newValue = this.vm[this.key]; // 判断新值和旧值是否相等

      if (this.oldValue === newValue) {
        return;
      }

      this.cb(newValue);
    }
  }]);

  return Watcher;
}();

exports.Watcher = Watcher;
},{"./Dep":"src/Vue2.0/Dep.ts"}],"src/Vue2.0/Compiler.ts":[function(require,module,exports) {
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Compiler = void 0;

var Watcher_1 = require("./Watcher");

var Compiler = /*#__PURE__*/function () {
  function Compiler(vm) {
    _classCallCheck(this, Compiler);

    this.vm = vm;
    this.el = vm.$el;
    this.vm = vm;
    this.compile(this.el);
  } // 编译模板, 处理文本节点和元素节点


  _createClass(Compiler, [{
    key: "compile",
    value: function compile(el) {
      var _this = this;

      var childNodes = el.childNodes;
      Array.from(childNodes).forEach(function (node) {
        // 处理文本节点
        // console.log(node.nodeType, 'nodeType')
        if (_this.isTextNode(node)) {
          _this.compileText(node);
        } else if (_this.isElementNode(node)) {
          // 处理元素节点
          _this.compileElement(node);
        } // 判断node节点,是否有子节点, 如果有子节点,要递归调用compile


        if (node.childNodes && node.childNodes.length) {
          _this.compile(node);
        }
      });
    } // 编译元素节点, 出来指令

  }, {
    key: "compileElement",
    value: function compileElement(node) {
      var _this2 = this;

      console.log(node.attributes); // 遍历所有的属性节点

      Array.from(node.attributes).forEach(function (attr) {
        // 判断是否是指令
        var attrName = attr.name;

        if (_this2.isDirective(attrName)) {
          // v-text --> text
          attrName = attrName.substr(2);
          var key = attr.value;

          _this2.update(node, key, attrName);
        }

        if (_this2.isEvent(attrName)) {
          // 是事件on开头
          console.log(_this2.vm, 'attrName');
          var _key = attr.value;
          var dir = attrName.substring(3);

          _this2.eventHandler(node, _this2.vm, _key, dir);
        }
      });
    }
  }, {
    key: "isEvent",
    value: function isEvent(attr) {
      console.log(attr);
      return attr.indexOf('on') === 0;
    }
  }, {
    key: "update",
    value: function update(node, key, attrName) {
      //@ts-ignore
      var updateFn = this[attrName + 'Updater'];
      updateFn && updateFn.call(this, node, this.vm[key], key);
    } // 处理 v-text 指令

  }, {
    key: "textUpdater",
    value: function textUpdater(node, value, key) {
      node.textContent = value;
      new Watcher_1.Watcher(this.vm, key, function (newValue) {
        node.textContent = newValue;
      });
    } // v-model

  }, {
    key: "modelUpdater",
    value: function modelUpdater(node, value, key) {
      var _this3 = this;

      node.value = value;
      new Watcher_1.Watcher(this.vm, key, function (newValue) {
        node.value = newValue;
      }); // 双向绑定

      node.addEventListener('input', function () {
        _this3.vm[key] = node.value;
      });
    } // 处理v-html

  }, {
    key: "htmlUpdater",
    value: function htmlUpdater(node, value, key) {
      node.innerHTML = value;
      new Watcher_1.Watcher(this.vm, key, function (newValue) {
        console.log(newValue, 'newValue');
        node.innerHTML = newValue;
      });
    } // 编译文本节点，出来差值

  }, {
    key: "compileText",
    value: function compileText(node) {
      // console.dir(node)
      var reg = /\{\{(.+?)\}\}/;
      var value = node.textContent;

      if (reg.test(value)) {
        var key = RegExp.$1.trim();
        node.textContent = value.replace(reg, this.vm[key]); // 创建watcher对象, 当数据改变更新视图

        new Watcher_1.Watcher(this.vm, key, function (newValue) {
          node.textContent = newValue;
        });
      }
    } // 添加事件

  }, {
    key: "eventHandler",
    value: function eventHandler(node, vm, exp, dir) {
      var fn = vm.$options.methods && vm.$options.methods[exp];

      if (dir && fn) {
        node.addEventListener(dir, fn.bind(vm));
      }
    } // 判断元素属性是否是指令

  }, {
    key: "isDirective",
    value: function isDirective(attrName) {
      return attrName.startsWith('v-');
    } // 判断节点是否是文本节点

  }, {
    key: "isTextNode",
    value: function isTextNode(node) {
      return node.nodeType === 3;
    } // 判读节点是否是元素节点

  }, {
    key: "isElementNode",
    value: function isElementNode(node) {
      return node.nodeType === 1;
    }
  }]);

  return Compiler;
}();

exports.Compiler = Compiler;
},{"./Watcher":"src/Vue2.0/Watcher.ts"}],"src/Vue2.0/Observer.ts":[function(require,module,exports) {
"use strict"; //Observer 的作用是遍历所有的属性，给它们安装上 getter / setter 方法

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Observer = void 0;

var Dep_1 = require("./Dep");

var Observer = /*#__PURE__*/function () {
  function Observer(data) {
    _classCallCheck(this, Observer);

    this.walk(data);
  }

  _createClass(Observer, [{
    key: "walk",
    value: function walk(data) {
      var _this = this;

      // 1. 判断data是否是对象
      if (!data || _typeof(data) !== 'object') {
        return;
      } // 2.遍历data对象的所有属性


      Object.keys(data).forEach(function (key) {
        _this.defineReactive(data, key, data[key]);
      });
    }
  }, {
    key: "defineReactive",
    value: function defineReactive(obj, key, val) {
      var that = this; // 负责收集依赖, 并发送通知

      var dep = new Dep_1.Dep(); // 如果是val对象,把val内部的属性转换成响应式对象

      that.walk(val);
      Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: function get() {
          // 收集依赖
          Dep_1.Dep.target && dep.addSub(Dep_1.Dep.target);
          console.log(Dep_1.Dep.target);
          return val;
        },
        set: function set(newValue) {
          if (newValue === val) {
            return;
          }

          val = newValue;
          that.walk(newValue); // 发送通知

          dep.notify();
        }
      });
    }
  }]);

  return Observer;
}();

exports.Observer = Observer;
},{"./Dep":"src/Vue2.0/Dep.ts"}],"src/Vue2.0/Vue.ts":[function(require,module,exports) {
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Vue = void 0;

var Compiler_1 = require("./Compiler");

var Observer_1 = require("./Observer");

var Vue = /*#__PURE__*/function () {
  function Vue(options) {
    _classCallCheck(this, Vue);

    this.options = options; //1. 通过属性保存选项的数据

    this.$data = options.data;
    this.$el = typeof options.el === 'string' ? document.querySelector(options.el) : options.el; // 2. 把data中的成员转换成getter/setter,注入到Vue实例中

    this.proxyData(this.$data); // 3. 调用observer对象,监听数据的辩护

    new Observer_1.Observer(this.$data); // 4. 调用compiler对象, 解析指令和差值表达式

    new Compiler_1.Compiler(this);
  }

  _createClass(Vue, [{
    key: "proxyData",
    value: function proxyData(data) {
      var _this = this;

      Object.keys(data).forEach(function (key) {
        Object.defineProperty(_this, key, {
          // @ts-ignore
          enumberable: true,
          configurable: true,
          get: function get() {
            return data[key];
          },
          set: function set(newValue) {
            if (newValue === data[key]) {
              return;
            }

            data[key] = newValue;
          }
        });
      });
    }
  }]);

  return Vue;
}();

exports.Vue = Vue;
},{"./Compiler":"src/Vue2.0/Compiler.ts","./Observer":"src/Vue2.0/Observer.ts"}],"src/Vue2.0/index.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Vue_1 = require("./Vue");

new Vue_1.Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!',
    html: '<h1>Hello Vue!</h1> <input v-model="message" />'
  }
});
},{"./Vue":"src/Vue2.0/Vue.ts"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "59913" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/Vue2.0/index.ts"], null)
//# sourceMappingURL=/Vue2.0.70fdd67f.js.map