import yugo from 'yugo';
import zn from '../zn';


const styles = {
  view: {
    flex: 1,
    flexDirection: 'row',
    padding: 16
  },
  description: yugo(zn.typo, {
    fontSize: 15,
    fontWeight: '400',
    flex: 1,
    paddingRight: 16
  }),
  noDescription: {
    color: zn.color.gray400
  },
  time: yugo(zn.typo, {
    color: zn.color.gray400,
    fontSize: 15,
    fontWeight: '200',
    textAlign: 'right',
    width: 100
  }),
  timeBold: {
    color: zn.color.gray900,
    fontWeight: '700'
  }
};

export default styles;
