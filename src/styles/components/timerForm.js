import Dimensions from 'Dimensions';
import yugo from 'yugo';
import zn from '../zn';

const {height, width} = Dimensions.get('window');
const FORM_HEIGHT = 50;

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
    backgroundColor: '#fff',
    flex: 1,
    position: 'absolute',
    height,
    bottom: -(height - FORM_HEIGHT),
    width,
    shadowColor: zn.color.gray300,
    shadowOpacity: 0.8,
    shadowOffset: {height: 0, width: 0}
  },
  formWrapper: {
    flexDirection: 'row',
    height: 50,
    width
  },
  startButton: yugo(zn.button, {
    flex: 0.3,
    paddingVertical: 8,
    marginHorizontal: 8
  }),
  startButtonLabel: {
    color: '#fff',
    fontWeight: '700'
  },
  textInput: yugo(zn.form.line, {
    fontSize: 14,
    borderWidth: 0,
    flex: 1,
    marginVertical: 6,
    marginHorizontal: 4
  })
};

export default styles;
