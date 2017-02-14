"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DefaultPageBindings = exports.DefaultPageBindings = function () {
  function DefaultPageBindings() {
    var overrides = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, DefaultPageBindings);

    this.state = overrides.state || this.state;
    this.events = overrides.events || this.events;
  }

  _createClass(DefaultPageBindings, [{
    key: "state",
    value: function state() {
      return {};
    }
  }, {
    key: "events",
    value: function events() {
      return {};
    }
  }]);

  return DefaultPageBindings;
}();