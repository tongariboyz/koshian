import React from 'react-native';
import {connect} from 'react-redux/native';
import {start} from '../actions/timer';
import TimerForm from '../components/TimerForm';


class TimerFormView extends React.Component {

  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    timer: React.PropTypes.object.isRequired
  }

  onPressStart = timeEntry => {
    this.props.dispatch(start(timeEntry));
  }

  /**
   * レンダリング
   *
   * @return {ReactElement}
   */
  render() {
    return (
      <TimerForm
        dispatch={this.props.dispatch}
        onPressStartButton={this.onPressStart}
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
