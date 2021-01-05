import React, {Component} from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-elements';

import Task from './Task';

/**Props:
 * taskList [Task]
 */

export default class TimeBasedTaskSection extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    if (this.props.taskList.length < 1) {
      return (
        <View style={{paddingLeft:10, paddingRight:10}}>
          <Text>Task list is empty</Text>
        </View>
      );
    } else {
      return (
        <View style={{paddingLeft:10, paddingRight:10}}>
          {this.props.taskList.map((task, idx) => {
            if(!task.isDeleted)
            {
                return (
                <Task
                key={idx}
                taskData={task}
                editTask={this.props.editTask}
                setDoneTask={this.props.setDoneTask}
                setDeleteTask={this.props.setDeleteTask}></Task>
            );
            }

          })}
        </View>
      );
    }
  }
}
