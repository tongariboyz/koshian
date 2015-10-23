import React from 'react-native';
import moment from 'moment';
import styles from '../styles/components/recordsHeader';

const {
  Text,
  View
} = React;


export default class RecordsHeader extends React.Component {

  static propTypes = {
    date: React.PropTypes.object.isRequired,
    dispatch: React.PropTypes.func.isRequired
  }

  /**
   * レンダリング
   *
   * @return {ReactElement}
   */
  render() {
    return (
      <View style={styles.view} >
        <Text style={styles.title}>{moment(this.props.date).format('YYYY年MM月DD日')}</Text>
        <View style={styles.totalTimeWarpper}>
          <Text style={styles.totalTimeLabel}>Total</Text>
          <Text style={styles.totalTime}>3 h 33 min</Text>
        </View>
      </View>
    );
  }
}
