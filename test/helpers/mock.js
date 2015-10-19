import React from 'react';

export const ReactNative = {
  StyleSheet: {
    create: obj => obj
  },
  PixelRatio: {
    get: () => {}
  },
  Component: React.Component,
  ActivityIndicatorIOS: class extends React.Component {},
  TouchableHighlight: class extends React.Component {},
  Text: class extends React.Component {},
  PropTypes: React.PropTypes,
  createElement: React.createElement
};
