import React from 'react-native';
import {connect} from 'react-redux/native';
import {bindActionCreators} from 'redux';
import * as TimerActions from '../actions/timer';
import TimerView from '../components/TimerView';


class TimerFormView extends React.Component {

  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    timer: React.PropTypes.object.isRequired
  }

  /**
   * レンダリング
   *
   * @return {ReactElement}
   */
  render() {
    const actions = bindActionCreators(TimerActions, this.props.dispatch);
    return (
      <TimerView
        actions={actions}
        timer={this.props.timer}
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
  return {timer: state.timer};
}

export default connect(mapStateToProps)(TimerFormView);
