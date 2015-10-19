import React from 'react-native';
import {connect} from 'react-redux/native';
import LoginPage from './LoginPage';

const {Text, View} = React;


class App extends React.Component {

  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    login: React.PropTypes.object.isRequired
  }

  /**
   * レンダリング
   *
   * @return {ReactElement}
   */
  render() {
    if (this.props.login.authToken === '') {
      return <LoginPage />;
    }
    return (
      <View>
        <Text>{this.props.login.authToken}</Text>
      </View>
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

export default connect(mapStateToProps)(App);
