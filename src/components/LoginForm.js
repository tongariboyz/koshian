/* @flow */
import React from 'react-native';
import zn from '../styles/zn';
import type {NativeScrollEvent} from '../flowtypes';

const {
  ScrollView,
  StyleSheet,
  TouchableHighlight,
  Text,
  TextInput,
  View
} = React;

const SCROLL_EVENT_THROTTLE = 16;
const FOCUS_FORM_SCROLL_VIEW_OFFSET = 20;
const FOCUS_FORM_WAIT_TIME = 50;

const styles = StyleSheet.create({
  button: zn.button,
  buttonLabel: zn.buttonLabel,
  symbol: {
    alignSelf: 'center',
    backgroundColor: zn.themeColor,
    borderRadius: 25,
    height: 50,
    marginVertical: 80,
    width: 50
  },
  textInput: zn.form.line,
  view: {
    backgroundColor: zn.color.gray50,
    flex: 1,
    padding: 24
  }
});

const propTypes = {
  isConnecting: React.PropTypes.bool.isRequired,
  onPressLogin: React.PropTypes.func.isRequired
};

type Props = {
  isConnecting: bool;
  onPressLogin: bool;
};
type State = {
  beforeOffsetY: number;
  isEditing: bool;
  password: string;
  username: string;
};


export default class LoginForm extends React.Component {

  state: State;

  constructor(props: Props) {
    super(props);
    this.state = {
      beforeOffsetY: 0,
      isEditing: false,
      password: '',
      username: ''
    };

    this.onChangeTex = this.onChangeText.bind(this);
    this.onEndEditing = this.onEndEditing.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onPressLogin = this.onPressLogin.bind(this);
    this.onScroll = this.onScroll.bind(this);
    this.onTouchEnd = this.onTouchEnd.bind(this);
  }

  /**
   * 入力されたテキストを state に格納
   *
   * @param {string} ref refName
   * @param {string} text text
   */
  onChangeText(ref: string, text: string) {
    const state = {};
    state[ref] = text;
    this.setState(state);
  }

  /**
   * 編集完了時にスクロール位置を戻す
   */
  onEndEditing() {
    if (this.state.isEditing) {
      this.setState({isEditing: false});
      const scrollResponder = this.refs.scrollView.getScrollResponder();
      scrollResponder.scrollResponderScrollTo(0, this.state.beforeOffsetY);
    }
  }

  /**
   * フォームへのフォーカス時にフォームの位置を調整
   *
   * @param {string} refName ref name
   */
  onFocus(refName: string) {
    this.setState({isEditing: true});
    setTimeout(() => {
      const scrollResponder = this.refs.scrollView.getScrollResponder();
      scrollResponder.scrollResponderScrollNativeHandleToKeyboard(
        React.findNodeHandle(this.refs[refName]),
        FOCUS_FORM_SCROLL_VIEW_OFFSET,
        true
      );
    }, FOCUS_FORM_WAIT_TIME);
  }

  /**
   * onPressLogin に username と password を渡す
   */
  onPressLogin() {
    this.props.onPressLogin(this.state.username, this.state.password);
  }

  /**
   * スクロール時に現在の Y 座標を記録
   *
   * @param {Event} e event
   */
  onScroll(e: NativeScrollEvent) {
    if (!this.state.isEditing) {
      this.setState({beforeOffsetY: e.nativeEvent.contentOffset.y});
    }
  }

  /**
   * フォーム外でのタッチ終了時にスクロール位置を戻す
   */
  onTouchEnd() {
    if (this.state.isEditing) {
      this.setState({isEditing: false});
      const scrollResponder = this.refs.scrollView.getScrollResponder();
      scrollResponder.scrollResponderScrollTo(0, this.state.beforeOffsetY);
    }
  }

  /**
   * Form の props を返す
   *
   * @param {Object} props props
   * @param {string} props.ref ref
   * @param {string} [props.keyboardType] keyboardType
   * @param {string} [props.placeholder] placeholder
   * @param {boolean} [props.secureTextEntry] secureTextEntry
   * @return {Object} props
   *
   * @todo TextInput.propTypes をどうにか流用して import したい
   * @todo Optional な Object property を Flow で表現したい
   */
  getFormProps(props: Object): Object {
    return {
      keyboardType: 'default',
      onChangeText: t => this.onChangeText(props.ref, t),
      onEndEditing: this.onEndEditing,
      onFocus: this.onFocus.bind(this, props.ref),
      style: styles.textInput,
      value: this.state[props.ref],
      ...props
    };
  }

  /**
   * ScrollView の props を返す
   *
   * @return {Object} props
   * @todo ScrollView.propTypes をどうにか流用して import したい
   */
  getScrollViewProps(): Object {
    return {
      keyboardDismissMode: 'on-drag',
      keyboardShouldPersistTaps: false,
      onScroll: this.onScroll,
      onTouchEnd: this.onTouchEnd,
      ref: 'scrollView',
      scrollEnabled: !this.state.isEditing,
      scrollEventThrottle: SCROLL_EVENT_THROTTLE,
      showsVerticalScrollIndicator: false,
      style: styles.view
    };
  }

  /**
   * レンダリング
   *
   * @return {ReactElement}
   */
  render() {
    return (
      <ScrollView {...this.getScrollViewProps()}>
        <View style={styles.symbol} />
        <TextInput {...this.getFormProps({
          keyboardType: 'email-address',
          placeholder: 'Username',
          ref: 'username'
        })}
        />
        <TextInput {...this.getFormProps({
          placeholder: 'Password',
          ref: 'password',
          secureTextEntry: true
        })}
        />
        <TouchableHighlight
          onPress={this.onPressLogin}
          style={styles.button}
          underlayColor={zn.color.blue600}
        >
          <Text style={styles.buttonLabel}>ログイン</Text>
        </TouchableHighlight>
      </ScrollView>
    );
  }
}


LoginForm.propTypes = propTypes;
