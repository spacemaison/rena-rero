'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.styles = undefined;

var _StyleSheet = require('./StyleSheet');

var _base = require('./base');

var styles = exports.styles = _StyleSheet.StyleSheet.create({
  button: {
    backgroundColor: _base.colors.buttonBackground,
    height: _base.sizes.buttonHeight,
    padding: _base.size.one,
    borderColor: _base.colors.buttonForeground,
    borderWidth: 1
  },

  buttonText: {
    color: _base.colors.buttonForeground
  }
});