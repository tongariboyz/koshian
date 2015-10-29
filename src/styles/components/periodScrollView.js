import Dimensions from 'Dimensions';
import zn from '../zn';

const {height, width} = Dimensions.get('window');


const styles = {
  scrollView: {
    backgroundColor: zn.color.gray100
  },
  view: {
    alignItems: 'center',
    backgroundColor: zn.color.gray50,
    height,
    width,
    overflow: 'hidden'
  },
  listView: {
    top: 80,
    paddingVertical: 16,
    width
  }
};

export default styles;
