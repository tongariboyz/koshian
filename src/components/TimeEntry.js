/* @flow */
import React from 'react-native';
import moment from 'moment';
import 'moment-duration-format';
import yugo from 'yugo';
import styles from '../styles/components/timeEntry';

const {Text, View} = React;
const propTypes = {
  timeEntry: React.PropTypes.object.isRequired
};


export default class TimeEntry extends React.Component {

  /**
   * 説明スタイルを返す
   *
   * @return {Object} style
   */
  getDescriptionStyle(): Object {
    return yugo(
      styles.description,
      [styles.noDescription, !this.props.timeEntry.description]
    );
  }

  /**
   * 説明をレンダリング
   *
   * @return {string} description
   */
  renderDescription(): string {
    if (this.props.timeEntry.description) {
      return this.props.timeEntry.description;
    }
    return '(no description)';
  }

  /**
   * 経過時間をレンダリング
   *
   * @return {string} time
   */
  renderTime() {
    const minute = 60;
    const hour = 3600;
    const _moment = moment.duration(this.props.timeEntry.duration, 's');
    if (this.props.timeEntry.duration < minute) {
      return (
        <Text style={styles.time}>
          <Text>{_moment.format('h:mm:', {trim: false})}</Text>
          <Text style={styles.timeBold}>{_moment.format('ss', {trim: false})}</Text>
        </Text>
      );
    } else if (this.props.timeEntry.duration < hour) {
      return (
        <Text style={styles.time}>
          <Text>{_moment.format('h:', {trim: false})}</Text>
          <Text style={styles.timeBold}>{_moment.format('mm:ss', {trim: false})}</Text>
        </Text>
      );
    }
    return (
      <Text style={styles.time}>
        <Text style={styles.timeBold}>{_moment.format('h:mm:ss', {trim: false})}</Text>
      </Text>
    );
  }

  /**
   * レンダリング
   *
   * @return {ReactElement}
   */
  render() {
    return (
      <View style={styles.view}>
        <Text style={this.getDescriptionStyle()}>{this.renderDescription()}</Text>
        {this.renderTime()}
      </View>
    );
  }
}

TimeEntry.propTypes = propTypes;
