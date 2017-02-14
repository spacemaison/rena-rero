'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.colors = exports.sizes = exports.size = exports.SIZE_UNIT = undefined;

var _color = require('./color');

var SIZE_UNIT = exports.SIZE_UNIT = 8;
var size = exports.size = Object.freeze({
  one: SIZE_UNIT,
  two: SIZE_UNIT * 2,
  three: SIZE_UNIT * 3,
  four: SIZE_UNIT * 4,
  five: SIZE_UNIT * 5,
  six: SIZE_UNIT * 6,
  seven: SIZE_UNIT * 7,
  eight: SIZE_UNIT * 8,
  nine: SIZE_UNIT * 9,
  ten: SIZE_UNIT * 10
});

var sizes = exports.sizes = Object.freeze({
  buttonHeight: size.five,
  text: size.two - 2,
  header: size.three
});

var colors = exports.colors = Object.freeze({
  foreground: (0, _color.color)('black'),
  background: (0, _color.color)('white'),
  buttonBackground: (0, _color.color)('red'),
  buttonForeground: (0, _color.color)('white')
});