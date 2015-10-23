import React from 'react-native';
import {connect} from 'react-redux/native';
import LoginPage from './LoginPage';
import IndexPage from './IndexPage';

const {StatusBarIOS} = React;


class App extends React.Component {

  static propTypes = {
    auth: React.PropTypes.object.isRequired,
    dispatch: React.PropTypes.func.isRequired
  }

  componentDidMount() {
    StatusBarIOS.setHidden(true);
  }

  /**
   * レンダリング
   *
   * @return {ReactElement}
   */
  render() {
    if (this.props.auth.client === null) {
      return <LoginPage />;
    }
    return <IndexPage />;
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

export default connect(mapStateToProps)(App);
