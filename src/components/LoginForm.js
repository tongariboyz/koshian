import React from 'react-native';
import {ScrollView, StyleSheet, TextInput} from 'react-native';
import NavButton from './NavButton';

const SCROLL_EVENT_THROTTLE = 16;
const FOCUS_FORM_SCROLL_VIEW_OFFSET = 20;
const FOCUS_FORM_WAIT_TIME = 50;

const styles = StyleSheet.create({
  textInput: {
    height: 40,
    borderColor: '#e0e0e0',
    borderWidth: 1,
    paddingLeft: 8,
    paddingRight: 8,
    margin: 20
  },
  view: {
    backgroundColor: '#fff',
    flex: 1
  }
});


export default class LoginForm extends React.Component {

  static propTypes = {
    isConnecting: React.PropTypes.bool.isRequired,
    onPressLogin: React.PropTypes.func.isRequired,
    token: React.PropTypes.string.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      beforeOffsetY: 0,
      isEditing: false,
      password: '',
      username: ''
    };
  }

  /**
   * 入力されたテキストを state に格納
   *
   * @param {string} ref refName
   * @param {string} text text
   */
  onChangeText = (ref, text) => {
    const state = {};
    state[ref] = text;
    this.setState(state);
  }

  /**
   * 編集完了時にスクロール位置を戻す
   */
  onEndEditing = () => {
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
  onFocus(refName) {
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
  onPressLogin = () => {
    this.props.onPressLogin(this.state.username, this.state.password);
  }

  /**
   * スクロール時に現在の Y 座標を記録
   *
   * @param {Event} e event
   */
  onScroll = e => {
    if (!this.state.isEditing) {
      this.setState({beforeOffsetY: e.nativeEvent.contentOffset.y});
    }
  }

  /**
   * フォーム外でのタッチ終了時にスクロール位置を戻す
   */
  onTouchEnd = () => {
    if (this.state.isEditing) {
      this.setState({isEditing: false});
      const scrollResponder = this.refs.scrollView.getScrollResponder();
      scrollResponder.scrollResponderScrollTo(0, this.state.beforeOffsetY);
    }
  }

  /**
   * レンダリング
   *
   * @return {ReactElement}
   */
  render() {
    return (
      <ScrollView
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps={false}
        onScroll={this.onScroll}
        onTouchEnd={this.onTouchEnd}
        ref="scrollView"
        scrollEnabled={!this.state.isEditing}
        scrollEventThrottle={SCROLL_EVENT_THROTTLE}
        showsVerticalScrollIndicator={false}
        style={styles.view}
      >
        <TextInput
          keyboardType="email-address"
          onChangeText={t => this.onChangeText('username', t)}
          onEndEditing={this.onEndEditing}
          onFocus={this.onFocus.bind(this, 'username')}
          placeholder="Username"
          ref="username"
          style={styles.textInput}
          value={this.state.user}
        />
        <TextInput
          keyboardType="default"
          onChangeText={t => this.onChangeText('password', t)}
          onEndEditing={this.onEndEditing}
          onFocus={this.onFocus.bind(this, 'password')}
          placeholder="Password"
          ref="password"
          secureTextEntry={true}
          style={styles.textInput}
          value={this.state.password}
        />
        <NavButton
          label="login"
          onPress={this.onPressLogin}
        />
      </ScrollView>
    );
  }
}
