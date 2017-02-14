'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.styles = undefined;

var _reactNative = require('react-native');

var _StyleSheet = require('./StyleSheet');

var styles = exports.styles = _StyleSheet.StyleSheet.create({
  iconBar: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  },

  icon: {
    margin: _reactNative.Platform.OS === 'ios' ? 2 : 8
  }
});