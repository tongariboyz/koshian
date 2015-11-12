import {TestModule as RCTTestModule} from 'NativeModules';
import React from 'react-native';

const {
  Text,
  View
} = React;


export default class IntegrationTestHarnessTest extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      done: false
    };
  }

  componentDidMount() {
    if (this.props.waitOneFrame) {
      requestAnimationFrame(this.runTest.bind(this));
    } else {
      this.runTest();
    }
  }

  runTest() {
    if (this.props.shouldThrows) {
      throw new Error('Throwing error because shouldThrows');
    }
    if (!RCTTestModule) {
      throw new Error('RCTTestModule is not registered.');
    } else if (!RCTTestModule.markTestCompleted) {
      throw new Error('RCTTestModule.markTestCompleted not defined.');
    }
    this.setState({done: true}, () => RCTTestModule.markTestCompleted());
  }

  render() {
    return (
      <View style={{backgroundColor: 'white', padding: 40}}>
        <Text>
          {`${this.constructor.displayName}: `}
          {this.state.done ? 'Done' : 'Testing...'}
        </Text>
      </View>
    );
  }
}

IntegrationTestHarnessTest.propTypes = {
  shouldThrows: React.PropTypes.bool,
  waitOneFrame: React.PropTypes.bool
};
IntegrationTestHarnessTest.displayName = 'IntegrationTestHarnessTest';
