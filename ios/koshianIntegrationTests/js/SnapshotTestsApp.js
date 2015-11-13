import React from 'react-native';
import LoginFormSnapshotTest from './LoginFormSnapshotTest';

const {
  AppRegistry,
  View
} = React;

const TESTS = [
  LoginFormSnapshotTest,
];

TESTS.forEach(test => {
  AppRegistry.registerComponent(test.displayName, () => test);
});


class SnapshotTestsApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      test: null
    };
  }

  render() {
    return (
      <View>{this.state.test}</View>
    );
  }
}

AppRegistry.registerComponent('SnapshotTestsApp', () => SnapshotTestsApp);
