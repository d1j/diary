import React from 'react';
import {View, Text} from 'react-native';

import Task from './Task';

/**Props:
 * taskList [Task]
 */

export default function TaskSection(props) {
  if (props.taskList.length < 1) {
    return (
      <View>
        <Text>Task list is empty</Text>
      </View>
    );
  } else {
    return (
      <View>
        {props.taskList.map((task, idx) => {
          return (
            <Task
              key={idx}
              taskData={task}
              editTask={props.editTask}
              setDoneTask={props.setDoneTask}
              setDeleteTask={props.setDeleteTask}></Task>
          );
        })}
        <Text>{'\n'}^Long-press task to edit^</Text>
      </View>
    );
  }
}
