import React from 'react-native';
import yugo from 'yugo';
import zn from '../styles/zn';
import styles from '../styles/components/keyboardChangeButtons';

const {
  Text,
  TouchableHighlight,
  View
} = React;


export default class KeyboardChangeButtons extends React.Component {

  static propTypes = {
    keyboardType: React.PropTypes.string.isRequired,
    onPressButton: React.PropTypes.func.isRequired
  }

  /**
   * ボタンが押下された際 ref を含めて実行する
   *
   * @param {string} ref ref
   */
  onPressButton(ref) {
    this.props.onPressButton(ref);
  }

  /**
   * ラベルのスタイルを返す
   *
   * @param {string} ref ref
   * @return {Object} style
   */
  getLabelStyle(ref) {
    return yugo(
      styles.buttonLabel,
      [styles.buttonIsActive, this.props.keyboardType === ref]
    );
  }

  /**
   * レンダリング
   *
   * @return {ReactElement}
   */
  render() {
    return (
      <View style={styles.buttonGroup}>
        <TouchableHighlight
          onPress={this.onPressButton.bind(this, 'label')}
          style={styles.button}
          underlayColor={zn.color.gray100}
        >
          <Text style={this.getLabelStyle('label')}>ラベル</Text>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={this.onPressButton.bind(this, 'project')}
          style={styles.button}
          underlayColor={zn.color.gray100}
        >
          <Text style={this.getLabelStyle('project')}>プロジェクト</Text>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={this.onPressButton.bind(this, 'tag')}
          style={styles.button}
          underlayColor={zn.color.gray100}
        >
          <Text style={this.getLabelStyle('tag')}>タグ</Text>
        </TouchableHighlight>
      </View>
    );
  }
}
