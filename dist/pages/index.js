'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Accordion = require('./Accordion');

Object.keys(_Accordion).forEach(function (key) {
  if (key === "default") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Accordion[key];
    }
  });
});

var _AccordionPage = require('./AccordionPage');

Object.keys(_AccordionPage).forEach(function (key) {
  if (key === "default") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _AccordionPage[key];
    }
  });
});

var _Page = require('./Page');

Object.keys(_Page).forEach(function (key) {
  if (key === "default") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Page[key];
    }
  });
});