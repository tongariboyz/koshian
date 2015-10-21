import React from 'react-native';
import {connect} from 'react-redux/native';
import {
  changePeriodViewIndex,
  changeViewPeriod
} from '../actions/period';
import PeriodScrollView from '../components/PeriodScrollView';

const {View} = React;


class IndexPage extends React.Component {

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
    return (
      <View>
        <PeriodScrollView
          changePeriodViewIndex={changePeriodViewIndex}
          changeViewPeriod={changeViewPeriod}
          dispatch={this.props.dispatch}
          period={this.props.period}
        />
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
