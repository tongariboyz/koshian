import React from 'react-native';
import Dimensions from 'Dimensions';
import styles from '../styles/components/periodScrollView';
import RecordsHeader from '../components/RecordsHeader';
import {createTimeEntryKey} from '../helpers/dateUtils';

const {ScrollView, Text, View} = React;
const {width} = Dimensions.get('window');

const SCROLL_EVENT_THROTTLE = 16;


export default class PeriodScrollView extends React.Component {

  static propTypes = {
    changePeriodViewIndex: React.PropTypes.func.isRequired,
    changeViewPeriod: React.PropTypes.func.isRequired,
    dispatch: React.PropTypes.func.isRequired,
    period: React.PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {isMoving: false};
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.isMoving) {
      this.setState({isMoving: false});
      if (this.props.period.index < nextProps.period.index) {
        this.props.dispatch(this.props.changeViewPeriod('next'));
      } else if (this.props.period.index > nextProps.period.index) {
        this.props.dispatch(this.props.changeViewPeriod('prev'));
      }
    }
  }

  /**
   * 現在のインデックスを設定する
   *
   * @param {Event} e event
   */
  onMomentumScrollEnd = e => {
    if (this.state.isMoving) {
      const x = e.nativeEvent.contentOffset.x;
      this.props.dispatch(this.props.changePeriodViewIndex(x / width));
    }
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
      onTouchStart: this.onTouchStart,
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
      const key = createTimeEntryKey(s.date);
      const timeEntries = this.props.period.timeEntries[key] || [];
      return (
        <View style={styles.view}>
          <ScrollView
            style={styles.listScrollView}
          >
            <Text style={styles.title}>{s.name}</Text>
            <Text style={styles.title}>{s.date.toString()}</Text>
            {timeEntries.map(e => (<Text>{e.description}</Text>))}
          </ScrollView>
          <RecordsHeader
            date={s.date}
            dispatch={this.props.dispatch}
          />
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
