import React from 'react-native';
import {connect} from 'react-redux/native';
import {bindActionCreators} from 'redux';
import {logout} from '../actions/auth';
import * as PeriodActions from '../actions/period';
import TimerFormView from './TimerFormView';
import PeriodScrollView from '../components/PeriodScrollView';

const {View, Text} = React;


class IndexPage extends React.Component {

  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    period: React.PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.actions = bindActionCreators(PeriodActions, this.props.dispatch);
  }

  componentWillMount() {
    this.actions.initializePeriodViewIndex(this.props.period.currentDate);
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
          changePeriodViewIndex={this.actions.changePeriodViewIndex}
          changeViewPeriod={this.actions.changeViewPeriod}
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
