import React from 'react-native';
import {TestModule as RCTTestModule} from 'NativeModules';
import LoginForm from '../../../dist/components/LoginForm';
const {View} = React;


export default class LoginFormSnapshotTest extends React.Component {

  componentDidMount() {
    if (!RCTTestModule.verifySnapshot) {
      throw new Error('TestModule.verifySnapshot not defined.');
    }
    requestAnimationFrame(() => RCTTestModule.verifySnapshot(this.done));
  }

  done(success) {
    RCTTestModule.markTestPassed(success);
  }

  render() {
    const props = {
      isConnecting: false,
      onPressLogin: () => {}
    };
    return (
      <View>
        <LoginForm
          isConnecting={props.isConnecting}
          onPressLogin={props.onPressLogin}
        />
      </View>
    );
  }
}

LoginFormSnapshotTest.displayName = 'LoginFormSnapshotTest';
