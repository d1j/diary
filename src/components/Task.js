import React, {Component} from 'react';
import {Text, View} from 'react-native';

/** TODO:
 * enter edit task window
 * finish task
 * delete task
 *  */

export default class Task extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    if (this.props.taskData == undefined) {
      <View>
        <Text>Time based task data is undefined</Text>
      </View>;
    } else {
    }
    return (
      <View style={{borderWidth: 2}}>
        <Text>Task name: {this.props.taskData.taskName}</Text>
        {/* Inline If with Logical && Operator below */}
        {this.props.taskData.description != null && (
          <Text>Description: {this.props.taskData.description}</Text>
        )}
        {this.props.taskData.start != undefined && (
          <Text>
            Start time:{' '}
            {`${this.props.taskData.start.getHours()}:${this.props.taskData.start.getMinutes()}`}
          </Text>
        )}
        {this.props.taskData.end != undefined && (
          <Text>
            End time:{' '}
            {`${this.props.taskData.end.getHours()}:${this.props.taskData.end.getMinutes()}`}
          </Text>
        )}

        <Text>isDone: {this.props.taskData.isDone ? 'yes' : 'no'}</Text>
        <Text>isDeleted: {this.props.taskData.isDone ? 'yes' : 'no'}</Text>
      </View>
    );
  }
}
