import React from 'react-native';
import styles from '../styles/components/periodScrollView';
import RecordsHeader from '../components/RecordsHeader';
import TimeEntry from '../components/TimeEntry';

const {ListView, View} = React;


export default class TimeEntryListView extends React.Component {

  static propTypes = {
    stack: React.PropTypes.object.isRequired,
    timeEntries: React.PropTypes.array.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      ds: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    };
  }

  /**
   * レンダリング
   *
   * @return {ReactElement}
   */
  render() {
    return (
      <View style={styles.view}>
        <ListView
          dataSource={this.state.ds.cloneWithRows(this.props.timeEntries)}
          renderRow={timeEntry => <TimeEntry timeEntry={timeEntry} />}
          style={styles.listView}
        />
        <RecordsHeader date={this.props.stack.date} />
      </View>
    );
  }
}
