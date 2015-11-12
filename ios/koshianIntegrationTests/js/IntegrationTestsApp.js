import React from 'react-native';
import IntegrationTestHarnessTest from './IntegrationTestHarnessTest';
import KeyboardChangeButtonsTest from './KeyboardChangeButtonsTest';
import LoginFormSnapshotTest from './LoginFormSnapshotTest';
import SimpleSnapshotTest from './SimpleSnapshotTest';

const {
  AppRegistry,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} = React;

const TESTS = [
  IntegrationTestHarnessTest,
  KeyboardChangeButtonsTest,
  LoginFormSnapshotTest,
  SimpleSnapshotTest
];

TESTS.forEach(test => {
  AppRegistry.registerComponent(test.displayName, () => test);
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginTop: 40,
    margin: 15
  },
  row: {
    padding: 10
  },
  testName: {
    fontWeight: '500'
  },
  separator: {
    height: 1,
    backgroundColor: '#bbbbbb'
  }
});


class IntegrationTestsApp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      test: null
    };
  }

  render() {
    if (this.state.test) {
      return (
        <ScrollView>
          <this.state.test />
        </ScrollView>
      );
    }
    return (
      <View style={styles.container}>
        <Text style={styles.row}>
          Click on a test to run it in this shell for easier debugging and
          development.  Run all tests in the testing environment with cmd+U in
          Xcode.
        </Text>
        <View style={styles.separator} />
        <ScrollView>
          {TESTS.map(test => [
            <TouchableOpacity
              key={test.displayName}
              onPress={() => this.setState({test})}
              style={styles.row}
            >
              <Text style={styles.testName}>
                {test.displayName}
              </Text>
            </TouchableOpacity>,
            <View style={styles.separator} />
          ])}
        </ScrollView>
      </View>
    );
  }
}
IntegrationTestsApp.displayName = 'IntegrationTestsApp';

AppRegistry.registerComponent('IntegrationTestsApp', () => IntegrationTestsApp);
