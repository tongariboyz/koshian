import React from 'react-native';
import {connect} from 'react-redux/native';
import {login} from '../actions/login';
import LoginForm from '../components/LoginForm';


class LoginPage extends React.Component {

  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    login: React.PropTypes.object.isRequired
  }

  onPressLogin = (username, password) => {
    this.props.dispatch(login({username, password}));
  }

  /**
   * レンダリング
   *
   * @return {ReactElement}
   */
  render() {
    return (
      <LoginForm
        isConnecting={this.props.login.isConnecting}
        onPressLogin={this.onPressLogin}
        token={this.props.login.authToken}
      />
    );
  }
}

/**
 * state を整形
 *
 * @param {Object} state state
 * @return {Object}
 */
function mapStateToProps(state) {
  return {login: state.login};
}

export default connect(mapStateToProps)(LoginPage);
