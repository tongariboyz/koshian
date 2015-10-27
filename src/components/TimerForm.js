import React from 'react-native';
import KeyboardChangeButtons from './KeyboardChangeButtons';
import zn from '../styles/zn';
import styles from '../styles/components/timerForm';

const {
  TouchableHighlight,
  Text,
  TextInput,
  View
} = React;


export default class TimerForm extends React.Component {

  static propTypes = {
    actions: React.PropTypes.object.isRequired,
    timer: React.PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {description: ''};
  }

  /**
   * 編集中でない場合、フォームのフォーカスを解除
   */
  componentDidUpdate() {
    if (!this.props.timer.isEditing) {
      this.refs.timer.blur();
    }
  }

  /**
   * 入力されたテキストを保存
   *
   * @param {string} description description text
   */
  onChangeText = description => {
    this.setState({description});
  }

  /**
   * リターンキーが押された場合フォームを閉じる
   */
  onSubmitEditing = () => {
    this.props.actions.editEndForm();
  }

  /**
   * フォームへのフォーカス時にフォームの位置を調整
   */
  onFocus = () => {
    this.props.actions.editStartForm();
  }

  /**
   * キーボード選択ボタンが押下された場合
   * キーボードを切り替える
   *
   * @param {string} keyboardType 押下されたキーボード
   */
  onPressButton(keyboardType) {
    if (keyboardType === 'label') {
      this.refs.timer.focus();
    } else {
      this.refs.timer.blur();
    }
    this.props.actions.changeKeyboard(keyboardType);
  }

  /**
   * スタートボタンを押下された場合
   * TimeEntry を渡す
   */
  onPressStartButton = () => {
    this.props.actions.start({
      description: this.state.description
    });
  }

  /**
   * Form の props を返す
   *
   * @return {Object} props
   */
  getFormProps() {
    return {
      controlled: true,
      keyboardType: 'default',
      onChangeText: this.onChangeText,
      onFocus: this.onFocus,
      onSubmitEditing: this.onSubmitEditing,
      placeholder: 'タイマーを追加',
      ref: 'timer',
      style: styles.textInput,
      valur: this.state.description
    };
  }

  /**
   * レンダリング
   *
   * @return {ReactElement}
   */
  render() {
    return (
      <View>
        <View style={styles.formWrapper}>
          <TextInput {...this.getFormProps()} />
          <TouchableHighlight
            onPress={this.onPressStartButton}
            style={styles.startButton}
            underlayColor={zn.color.blue600}
          >
            <Text style={styles.startButtonLabel}>START</Text>
          </TouchableHighlight>
        </View>
        <KeyboardChangeButtons
          keyboardType={this.props.timer.keyboardType}
          onPressButton={this.onPressButton.bind(this)}
        />
      </View>
    );
  }
}
