'use strict';

var add1 = function add1(a) {
  return a + 1;
};
var times2 = function times2(a) {
  return a * 2;
};
var compose = function compose(a, b) {
  return function (c) {
    return a(b(c));
  };
};
var add1OfTimes2 = compose(add1, times2);
add1OfTimes2(5);

var greeting = function greeting(name) {
  return 'Hello ' + name;
};

var greeting2 = function greeting2(name) {
  var male = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
  var female = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];
  return 'Hello ' + (male ? 'Mr.' : female ? 'Ms. ' : '') + ' ' + name;
};

var formalGreeting = function formalGreeting(name) {
  return 'Hello ' + name;
};
var casualGreeting = function casualGreeting(name) {
  return 'Sup ' + name;
};
var male = function male(name) {
  return 'Mr. ' + name;
};
var female = function female(name) {
  return 'Mrs. ' + name;
};
var doctor = function doctor(name) {
  return 'Dr. ' + name;
};
var phd = function phd(name) {
  return name + ' PhD';
};
var md = function md(name) {
  return name + ' M.D.';
};
formalGreeting(male(phd("Chet")));