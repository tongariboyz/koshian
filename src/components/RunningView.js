import React from 'react-native';
import moment from 'moment';
import 'moment-duration-format';
import yugo from 'yugo';
import zn from '../styles/zn';
import styles from '../styles/components/runningView';

const {
  Text,
  TouchableHighlight,
  View
} = React;
const INTERVAL = 1000;
const BORDER_SECOND = 60;


export default class RunningView extends React.Component {

  static propTypes = {
    stop: React.PropTypes.func.isRequired,
    timeEntry: React.PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {time: 1};
  }

  /**
   * タイマーを設定
   */
  componentDidMount() {
    this.timer = setInterval(this.update, INTERVAL);
  }

  /**
   * タイマー処理
   */
  update = () => {
    const time = this.state.time + 1;
    this.setState({time});
  }

  /**
   * 計測を終了
   */
  onPressStopButton = () => {
    clearInterval(this.timer);
    this.props.stop(this.props.timeEntry.id);
  }

  /**
   * 説明スタイルを返す
   *
   * @return {Object} style
   */
  getDescriptionStyle() {
    return yugo(
      styles.description,
      [styles.noDescription, !this.props.timeEntry.description]
    );
  }

  /**
   * 説明をレンダリング
   *
   * @return {string} description
   */
  renderDescription() {
    if (this.props.timeEntry.description) {
      return this.props.timeEntry.description;
    }
    return '(no description)';
  }

  /**
   * 経過時間をレンダリング
   *
   * @return {string} time
   */
  renderTime() {
    const _moment = moment.duration(this.state.time, 's');
    if (this.state.time < BORDER_SECOND) {
      return `${_moment.format('s')} sec`;
    }
    return `${_moment.format('h:m:ss')} min`;
  }

  /**
   * レンダリング
   *
   * @return {ReactElement}
   */
  render() {
    return (
      <View style={styles.view}>
        <View style={styles.runningView}>
          <View style={styles.labelView}>
            <Text style={this.getDescriptionStyle()}>{this.renderDescription()}</Text>
          </View>
          <View style={styles.timeView}>
            <Text style={styles.time}>
              {this.renderTime()}
            </Text>
            <Text style={styles.startDate}>
              {moment(this.props.timeEntry.start).format('h:mm:ss')} →
            </Text>
          </View>
        </View>
        <TouchableHighlight
          onPress={this.onPressStopButton}
          style={styles.stopButton}
          underlayColor={zn.color.red600}
        >
          <Text style={styles.stopButtonLabel}>STOP</Text>
        </TouchableHighlight>
      </View>
    );
  }
}
