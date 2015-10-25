import React from 'react-native';
import {connect} from 'react-redux/native';
import LoginPage from './LoginPage';
import IndexPage from './IndexPage';

import {
  restoreToken,
  saveTokenIfNeeded
} from '../actions/auth';

const {StatusBarIOS, View, Text} = React;


class App extends React.Component {

  static propTypes = {
    auth: React.PropTypes.object.isRequired,
    dispatch: React.PropTypes.func.isRequired
  }

  componentDidMount() {
    this.props.dispatch(restoreToken());
    StatusBarIOS.setHidden(true);
  }

  componentWillReceiveProps(nextProps) {
    // client がセットされたタイミングで必要があれば AuthToken をストレージに保存
    if (this.props.auth.client === null && nextProps.auth.client !== null) {
      this.props.dispatch(saveTokenIfNeeded(nextProps.auth.client.apiToken));
    }
  }

  /**
   * レンダリング
   *
   * @return {ReactElement}
   */
  render() {
    if (!this.props.auth.isRestored) {
      // FIXME: ちゃんとしたローディングページを
      return (
        <View>
          <Text>Initializing...</Text>
        </View>
      );
    } else if (this.props.auth.client) {
      return <IndexPage />;
    }
    return <LoginPage />;
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
