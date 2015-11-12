import React from 'react-native';
import {TestModule as RCTTestModule} from 'NativeModules';
import KeyboardChangeButtons from '../../../dist/components/KeyboardChangeButtons';
const {View} = React;


export default class KeyboardChangeButtonsTest extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      done: false,
      keyboardType: 'default'
    };
  }

  /**
   * キーボードタイプ描画: default
   */
  componentDidMount() {
    requestAnimationFrame(this.runTestKeyboardTypeLabel.bind(this));
  }

  /**
   * キーボードタイプ描画: label
   */
  runTestKeyboardTypeLabel() {
    this.setState({keyboardType: 'label'}, () => {
      requestAnimationFrame(this.runTestFinal.bind(this));
    });
  }

  /**
   * テスト終了
   */
  runTestFinal() {
    this.setState({done: true}, () => RCTTestModule.markTestCompleted());
  }

  render() {
    return (
      <View>
        <KeyboardChangeButtons keyboardType={this.state.keyboardType} />
      </View>
    );
  }
}

KeyboardChangeButtonsTest.displayName = 'KeyboardChangeButtonsTest';
