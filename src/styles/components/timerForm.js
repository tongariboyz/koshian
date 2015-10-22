import React from 'react-native';
import Dimensions from 'Dimensions';
import yugo from 'yugo';
import zn from '../zn';

const {PixelRatio} = React;
const {height, width} = Dimensions.get('window');
export const FORM_HEIGHT = 50;

const styles = {
  view: {
    backgroundColor: 'transparent',
    flex: 1,
    position: 'absolute',
    height: FORM_HEIGHT,
    top: height - FORM_HEIGHT,
    width
  },
  viewIsFocus: {
    height,
    top: 0
  },
  animatedView: {
    borderTopWidth: 1 / PixelRatio.get(),
    borderTopColor: zn.color.gray200,
    backgroundColor: '#fff',
    flex: 1,
    position: 'absolute',
    height,
    bottom: -(height - FORM_HEIGHT),
    width
  },
  textInput: yugo(zn.form.line, {fontSize: 14, borderWidth: 0})
};

export default styles;
