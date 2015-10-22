import React from 'react-native';
import {connect} from 'react-redux/native';
import {login} from '../actions/auth';
import LoginForm from '../components/LoginForm';


class LoginPage extends React.Component {

  static propTypes = {
    auth: React.PropTypes.object.isRequired,
    dispatch: React.PropTypes.func.isRequired
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
        isConnecting={this.props.auth.isConnecting}
        onPressLogin={this.onPressLogin}
        token={this.props.auth.authToken}
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
  return {auth: state.auth};
}

export default connect(mapStateToProps)(LoginPage);
