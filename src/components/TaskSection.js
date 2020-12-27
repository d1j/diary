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
        <View>
          <Text>Task list is empty</Text>
        </View>
      );
    } else {
      return (
        <View>
          <Task taskData={this.props.taskList}></Task>
        </View>
      );
    }
  }
}
