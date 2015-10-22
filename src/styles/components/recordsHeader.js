import Dimensions from 'Dimensions';
import yugo from 'yugo';
import zn from '../zn';

const {width} = Dimensions.get('window');


const styles = {
  view: {
    alignItems: 'center',
    backgroundColor: '#fff',
    position: 'absolute',
    top: 0,
    height: 80,
    width,
    shadowColor: zn.color.gray300,
    shadowOpacity: 0.8,
    shadowOffset: {height: 0, width: 0}
  },
  title: yugo(zn.typo, {
    fontSize: 12,
    paddingTop: 20
  }),
  totalTimeWarpper: {
    alignItems: 'center',
    paddingVertical: 8,
    flexDirection: 'row',
    flex: 1
  },
  totalTimeLabel: yugo(zn.typo, {
    fontSize: 10,
    color: zn.color.gray700,
    paddingRight: 8
  }),
  totalTime: yugo(zn.typo, {
    fontWeight: '800'
  })
};

export default styles;
