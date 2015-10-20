import React from 'react-native';
import Dimensions from 'Dimensions';
import zn from '../styles/zn';

const {ScrollView, StyleSheet, Text, View} = React;
const {height, width} = Dimensions.get('window');

const SCROLL_EVENT_THROTTLE = 16;

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: zn.color.gray50
  },
  view: {
    alignItems: 'center',
    backgroundColor: '#fff',
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


export default class PeriodScrollView extends React.Component {

  static propTypes = {
    changePeriodViewIndex: React.PropTypes.func.isRequired,
    dispatch: React.PropTypes.func.isRequired,
    period: React.PropTypes.object.isRequired
  }

  /**
   * 現在のインデックスを設定する
   *
   * @param {Event} e event
   */
  onMomentumScrollEnd = e => {
    const x = e.nativeEvent.contentOffset.x;
    this.props.dispatch(this.props.changePeriodViewIndex(x / width));
  }

  /**
   * 現在の表示位置を返す
   *
   * @return {Object} offset
   */
  getOffset() {
    return {
      x: width * this.props.period.index,
      y: 0
    };
  }

  /**
   * ScrollView の props を返す
   *
   * @return {Object} props
   */
  getScrollViewProps() {
    return {
      automaticallyAdjustContentInsets: false,
      contentOffset: this.getOffset(),
      horizontal: true,
      onMomentumScrollEnd: this.onMomentumScrollEnd,
      pagingEnabled: true,
      ref: 'scrollView',
      scrollEventThrottle: SCROLL_EVENT_THROTTLE,
      showsHorizontalScrollIndicator: false,
      showsVerticalScrollIndicator: false,
      style: styles.scrollView
    };
  }

  /**
   * ビューをレンダリング
   *
   * @return {ReactElement}
   */
  renderViews() {
    return this.props.period.stack.map(s => {
      return (
        <View style={styles.view}>
          <Text style={styles.title}>{s.name}</Text>
        </View>
      );
    });
  }

  /**
   * レンダリング
   *
   * @return {ReactElement}
   */
  render() {
    return (
      <ScrollView {...this.getScrollViewProps()}>
        {this.renderViews()}
      </ScrollView>
    );
  }
}
