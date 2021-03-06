import React, {Component} from 'react';
import {Text, View, Button, TouchableOpacity} from 'react-native';

import EditTaskModal from './EditTaskModal';

const formatHoursMinutes = require('../helper_funcs/func').formatHoursMinutes;

export default class Task extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalVisible: false,
    };

    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal() {
    this.setState({isModalVisible: !this.state.isModalVisible});
  }

  render() {
    if (this.props.taskData == undefined) {
      <View>
        <Text>Time based task data is undefined</Text>
      </View>;
    } else {
    }
    return (
      <TouchableOpacity style={{borderWidth: 2}} onLongPress={this.toggleModal}>
        <Button
          title="Finish"
          onPress={() => {
            this.props.setDoneTask(
              this.props.taskData.id,
              !this.props.taskData.isDone,
            );
          }}></Button>
        <Text>Task name: {this.props.taskData.taskName}</Text>
        {/* Inline If with Logical && Operator below */}
        {this.props.taskData.description != null && (
          <Text>Description: {this.props.taskData.description}</Text>
        )}
        {this.props.taskData.start != undefined && (
          <Text>
            Start time: {formatHoursMinutes(this.props.taskData.start)}
          </Text>
        )}
        {this.props.taskData.end != undefined && (
          <Text>End time: {formatHoursMinutes(this.props.taskData.end)}</Text>
        )}
        <Text>isDone: {this.props.taskData.isDone ? 'yes' : 'no'}</Text>
        <Text>isDeleted: {this.props.taskData.isDeleted ? 'yes' : 'no'}</Text>
        <EditTaskModal
          isVisible={this.state.isModalVisible}
          toggleModal={this.toggleModal}
          data={this.props.taskData}
          setData={this.props.editTask}
        />
        <Button
          title="Delete"
          onPress={() => {
            this.props.setDeleteTask(
              this.props.taskData.id,
              !this.props.taskData.isDeleted,
            );
          }}></Button>
      </TouchableOpacity>
    );
  }
}
