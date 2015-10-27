import Dimensions from 'Dimensions';
import yugo from 'yugo';
import zn from '../zn';

const {width} = Dimensions.get('window');

const styles = {
  view: {
    height: 144
  },
  runningView: {
    flex: 1,
    flexDirection: 'row',
    height: 104,
    paddingHorizontal: 16
  },
  labelView: {
    justifyContent: 'center',
    paddingRight: 16,
    height: 104,
    flex: 1
  },
  description: yugo(zn.typo, {
    fontWeight: '500'
  }),
  noDescription: {
    color: zn.color.gray400
  },
  timeView: {
    justifyContent: 'center',
    height: 104,
    width: 100
  },
  time: yugo(zn.typo, {
    paddingTop: 16,
    fontSize: 20,
    fontWeight: '700'
  }),
  startDate: yugo(zn.typo, {
    fontSize: 10,
    color: zn.color.gray500
  }),
  stopButton: {
    paddingVertical: 12,
    backgroundColor: zn.color.red500,
    bottom: 0,
    width,
    position: 'absolute'
  },
  stopButtonLabel: {
    alignSelf: 'center',
    color: '#fff',
    fontWeight: '700'
  }
};

export default styles;
