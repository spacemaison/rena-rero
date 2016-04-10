"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.action = action;
function action(type, payload) {
  return { type: type, payload: payload };
}