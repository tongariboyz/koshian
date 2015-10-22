import React from 'react-native';
import {connect} from 'react-redux/native';
import TimerForm from '../components/TimerForm';


class TimerFormView extends React.Component {

  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    period: React.PropTypes.object.isRequired
  }

  /**
   * レンダリング
   *
   * @return {ReactElement}
   */
  render() {
    return <TimerForm dispatch={this.props.dispatch} />;
  }
}

/**
 * state を整形
 *
 * @param {Object} state state
 * @return {Object}
 */
function mapStateToProps(state) {
  return {period: state.period};
}

export default connect(mapStateToProps)(TimerFormView);
