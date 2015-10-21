import Dimensions from 'Dimensions';
import zn from '../zn';

const {height, width} = Dimensions.get('window');


const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: zn.color.gray100
  },
  view: {
    alignItems: 'center',
    backgroundColor: zn.color.gray50,
    height,
    padding: 20,
    width
  },
  title: {
    fontSize: 20,
    paddingTop: 20,
    paddingBottom: 20
  }
});

export default styles;
