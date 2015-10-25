import React from 'react-native';
import {connect} from 'react-redux/native';
import {logout} from '../actions/auth';
import {
  changePeriodViewIndex,
  changeViewPeriod,
  initializePeriodViewIndex
} from '../actions/period';
import TimerFormView from './TimerFormView';
import PeriodScrollView from '../components/PeriodScrollView';

const {View, Text} = React;


class IndexPage extends React.Component {

  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    period: React.PropTypes.object.isRequired
  }

  componentWillMount() {
    this.props.dispatch(initializePeriodViewIndex(this.props.period.currentDate));
  }

  onPressLogoutBtn = () => {
    this.props.dispatch(logout());
  }

  /**
   * FIXME: 仮ログアウトボタンをレンダリング
   *
   * @return {ReactElement}
   */
  renderLogoutBtn() {
    return (
      <Text onPress={this.onPressLogoutBtn}>Logout</Text>
    );
  }

  /**
   * レンダリング
   *
   * @return {ReactElement}
   */
  render() {
    return (
      <View>
        {this.renderLogoutBtn()}
        <PeriodScrollView
          changePeriodViewIndex={changePeriodViewIndex}
          changeViewPeriod={changeViewPeriod}
          dispatch={this.props.dispatch}
          period={this.props.period}
        />
        <TimerFormView />
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
  return {period: state.period};
}

export default connect(mapStateToProps)(IndexPage);
