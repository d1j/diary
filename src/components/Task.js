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
      <View>
        {this.props.taskData.map((task, idx) => {
          return (
            <View key={idx} style={{borderWidth: 2}}>
              <Text>Task name: {task.taskName}</Text>
              {/* Inline If with Logical && Operator below */}
              {task.description != null && (
                <Text>Description: {task.description}</Text>
              )}
              {task.start != undefined && (
                <Text>
                  Start time:{' '}
                  {`${task.start.getHours()}:${task.start.getMinutes()}`}
                </Text>
              )}
              {task.end != undefined && (
                <Text>
                  End time: {`${task.end.getHours()}:${task.end.getMinutes()}`}
                </Text>
              )}

              <Text>isDone: {task.isDone ? 'yes' : 'no'}</Text>
              <Text>isDeleted: {task.isDone ? 'yes' : 'no'}</Text>
            </View>
          );
        })}
      </View>
    );
  }
}
