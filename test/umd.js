(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.registerKeyboard = factory());
}(this, function () { 'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  var Register = /*#__PURE__*/function () {
    function Register() {
      _classCallCheck(this, Register);

      this.singleCommand = {
        'left': 37,
        'top': 38,
        'right': 39,
        'bottom': 40,
        'tab': 9,
        'back': 8,
        'enter': 13,
        'esc': 27,
        'space': 32
      };
    }

    _createClass(Register, [{
      key: "handleKeyDown",
      value: function handleKeyDown(e, keys, fn) {
        var ctrl = e.ctrlKey;
        var shift = e.shiftKey;
        var alt = e.altKey;
        var keyIdent = e.keyIdentifier;

        if (ctrl && keys.indexOf('ctrl') === -1) {
          // 按了 ctrl，但是没注册 ctrl
          return;
        }

        if (shift && keys.indexOf('shift') === -1) {
          // 按了 shift，但是没注册 shift
          return;
        }

        if (alt && keys.indexOf('alt') === -1) {
          // 按了 alt，但是没注册 alt
          return;
        }

        if (keys.length === 1 && e.keyCode === this.singleCommand[keys[0]]) {
          // 注册了单个键盘指令
          this.trigger(e, fn);
        }

        if (e.keyCode > 47 && e.keyCode < 91) {
          keyIdent = String.fromCharCode(e.keyCode);

          if (keyIdent.toLowerCase() === keys[keys.length - 1]) {
            // 注册了组合键盘指令
            this.trigger(e, fn);
          }
        }
      }
    }, {
      key: "trigger",
      value: function trigger(e, fn) {
        e.preventDefault();
        this.beforeTrigger();
        fn(e);
        this.afterTrigger();
      }
      /**
       * 触发事件之前的钩子
       */

    }, {
      key: "beforeTrigger",
      value: function beforeTrigger() {}
      /**
       * 触发事件之后的钩子
       */

    }, {
      key: "afterTrigger",
      value: function afterTrigger() {}
      /**
       * 注册键盘事件
       * @param {*单个键或者组合键} cmd 
       * @param {*触发事件时的回调} fn 
       */

    }, {
      key: "register",
      value: function register(cmd, fn, option) {
        var _this = this;

        cmd = cmd || '';

        fn = fn || function () {};

        var keys = cmd.replace(/\s/g, '');
        keys = keys.toLowerCase();
        keys = keys.split('+');

        if (keys.length === 0) {
          console.log('请检查您注册的快捷键');
          return;
        }

        var callback = function callback(e) {
          _this.handleKeyDown(e, keys, fn);
        };

        document.addEventListener('keydown', callback);
        return function () {
          document.removeEventListener('keydown', callback);
        };
      }
    }, {
      key: "registerOnce",
      value: function registerOnce(cmd, fn) {}
    }]);

    return Register;
  }();

  var index = new Register();

  return index;

}));
