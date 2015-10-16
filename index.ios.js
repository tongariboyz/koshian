'use strict';

var React = require('react-native');
var {AppRegistry} = React;
var Root = require('./dist/containers/Root');

AppRegistry.registerComponent('koshian', () => Root);
