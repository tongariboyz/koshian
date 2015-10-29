import React from 'react-native';
import Dimensions from 'Dimensions';
import styles from '../styles/components/periodScrollView';
import TimeEntryListView from '../components/TimeEntryListView';
import {createTimeEntryKey} from '../helpers/dateUtils';

const {ScrollView} = React;
const {width} = Dimensions.get('window');

const SCROLL_EVENT_THROTTLE = 16;


export default class PeriodScrollView extends React.Component {

  static propTypes = {
    changePeriodViewIndex: React.PropTypes.func.isRequired,
    fetchTimeEntries: React.PropTypes.func.isRequired,
    period: React.PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      initialIndex: props.period.index,
      isMoving: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.isMoving) {
      this.setState({isMoving: false});
      if (this.props.period.index !== nextProps.period.index) {
        const key = createTimeEntryKey(nextProps.period.currentDate);
        if (!nextProps.period.timeEntries[key]) {
          this.props.fetchTimeEntries(nextProps.period.currentDate);
        }
      }
    }
  }

  /**
   * 現在のインデックスを設定する
   *
   * @param {Event} e event
   */
  onMomentumScrollEnd = e => {
    const index = e.nativeEvent.contentOffset.x / width;
    this.props.changePeriodViewIndex(index);
  }

  /**
   * 移動状態を変更
   */
  onTouchStart = () => {
    this.setState({isMoving: true});
  }

  /**
   * 現在の表示位置を返す
   *
   * @return {Object} offset
   */
  getOffset() {
    return {
      x: width * this.state.initialIndex,
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
      onTouchStart: this.onTouchStart,
      pagingEnabled: true,
      ref: 'scrollView',
      removeClippedSubviews: true,
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
      const key = createTimeEntryKey(s.date);
      const timeEntries = this.props.period.timeEntries[key] || [];
      return (
        <TimeEntryListView
          stack={s}
          timeEntries={timeEntries}
        />
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
