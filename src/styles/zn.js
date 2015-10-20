import React from 'react-native';
const {PixelRatio} = React;

import {color} from './constants';

const zn = {
  color,
  themeColor: '#5a4a4a',
  button: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: color.blue500,
    borderColor: color.blue700,
    borderRadius: 4,
    borderWidth: 1 / PixelRatio.get(),
    padding: 12,
    marginVertical: 8
  },
  buttonLabel: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700'
  },
  form: {
    line: {
      backgroundColor: '#fff',
      borderColor: color.gray200,
      borderWidth: 1,
      height: 40,
      paddingLeft: 8,
      paddingRight: 8,
      marginVertical: 8
    }
  }
};

export default zn;
