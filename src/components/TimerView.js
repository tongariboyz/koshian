import React from 'react-native';
import yugo from 'yugo';
import {EASE_KEY_OPEN, EASE_OUT_EXPO} from '../constants/easing';
import RunningView from './RunningView';
import TimerForm from './TimerForm';
import styles from '../styles/components/timerForm';

const {
  Animated,
  Easing,
  DeviceEventEmitter,
  View
} = React;
const ANIMATED_PAN = new Animated.ValueXY();
const KEYBOARD_CHANGE_BUTTONS_HEIGHT = 32;
const RUNNING_VIEW_POS_Y = 94;


export default class TimerView extends React.Component {

  static propTypes = {
    actions: React.PropTypes.object.isRequired,
    timer: React.PropTypes.object.isRequired
  }

  /**
   * キーボード表示時のイベントリスナを登録
   */
  componentDidMount() {
    DeviceEventEmitter.addListener('keyboardWillShow', this.updateKeyboardSpace);
  }

  /**
   * 編集状態でない場合、フォームを閉じる
   */
  componentDidUpdate() {
    if (!this.props.timer.isEditing) {
      this.closeForm();
    }
    if (this.props.timer.isRunning) {
      Animated.timing(ANIMATED_PAN, {
        easing: Easing.bezier(...EASE_KEY_OPEN),
        duration: 300,
        toValue: {x: 0, y: -RUNNING_VIEW_POS_Y}
      }).start();
    }
  }

  /**
   * キーボード表示時のイベントリスナを解除
   */
  componentWillUnmount() {
    DeviceEventEmitter.removeAllListeners('keyboardWillShow');
  }

  /**
   * キーボードが表示される際に
   * キーボードの高さ分フォームを移動
   *
   * @param {Object} frames frames
   */
  updateKeyboardSpace = frames => {
    Animated.timing(ANIMATED_PAN, {
      easing: Easing.bezier(...EASE_KEY_OPEN),
      duration: 300,
      toValue: {x: 0, y: -(frames.endCoordinates.height + KEYBOARD_CHANGE_BUTTONS_HEIGHT)}
    }).start();
  }

  /**
   * フォームを閉じる
   */
  closeForm() {
    Animated.timing(ANIMATED_PAN, {
      easing: Easing.bezier(...EASE_OUT_EXPO),
      duration: 1000,
      toValue: {x: 0, y: 0}
    }).start();
  }

  /**
   * リターンキーが押下された場合フォームを閉じる
   */
  onSubmitEditing = () => {
    this.closeForm();
  }

  /**
   * フォーム内がタッチされた場合、フォームを閉じない
   *
   * @param {Event} e event
   */
  onTouchStartForm = e => {
    e.stopPropagation();
  }

  /**
   * フォーム外がタッチされた場合、フォームを閉じる
   */
  onTouchStartView = () => {
    if (this.props.timer.isEditing) {
      this.props.actions.editEndForm();
      this.closeForm();
    }
  }

  /**
   * TimerForm または RunningView をレンダリング
   *
   * @return {ReactElement}
   */
  renderFormOrView() {
    if (this.props.timer.isRunning) {
      return (
        <RunningView
          stop={this.props.actions.stop}
          timeEntry={this.props.timer.timeEntry}
        />
      );
    }
    return (
      <TimerForm
        actions={this.props.actions}
        timer={this.props.timer}
      />
    );
  }

  /**
   * レンダリング
   *
   * @return {ReactElement}
   */
  render() {
    return (
      <View
        onTouchStart={this.onTouchStartView}
        style={yugo(styles.view, [styles.viewIsFocus, this.props.timer.isEditing])}
      >
        <Animated.View
          onTouchStart={this.onTouchStartForm}
          style={yugo(styles.animatedView, {transform: ANIMATED_PAN.getTranslateTransform()})}
        >
          {this.renderFormOrView()}
        </Animated.View>
      </View>
    );
  }
}
