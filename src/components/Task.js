import React, {Component} from 'react';
import {Text, Pressable, View, Button, TouchableOpacity} from 'react-native';
import EditTaskModal from './EditTaskModal';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LogBoxButton from 'react-native/Libraries/LogBox/UI/LogBoxButton';

const formatHoursMinutes = require('../../helper_funcs/func')
  .formatHoursMinutes;

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

  determineColor(value) {
    let iconColor;
    iconColor = value ? 'green' : 'red';
    return iconColor;
  }

  render() {
    if (this.props.taskData == undefined) {
      <View>
        <Text>Time based task data is undefined</Text>
      </View>;
    } else {
    }
    return (
      <TouchableOpacity
        style={{
          borderColor: '#6fa1e2',
          borderTopWidth: 2,
          height: 60,
          justifyContent: 'center',
        }}
        onLongPress={this.toggleModal}>
        <Pressable
          style={{
            zIndex: 1,
            position: 'absolute',
            backgroundColor: '#e7e7de',
            width: 50,
            justifyContent: 'center',
            alignItems: 'center',
            height: 50,
            right: 5,
            borderRadius: 100,
            elevation: 2,
          }}
          title="Finish"
          onPress={() => {
            console.log(this.determineColor());
            this.props.setDoneTask(
              this.props.taskData.id,
              !this.props.taskData.isDone,
            );
          }}>
          <Ionicons
            name={'checkmark-done-sharp'}
            color={this.determineColor(this.props.taskData.isDone)}
            size={40}
          />
        </Pressable>
        <Text
          style={{
            paddingTop: 7,
            height: 30,
            fontSize: 20,
            fontWeight: 'bold',
            color: '#72bbf8',
            paddingLeft: 10,
          }}>
          {this.props.taskData.taskName}
        </Text>
        {/* Inline If with Logical && Operator below */}
        {this.props.taskData.description != null && (
          <Text>Description: {this.props.taskData.description}</Text>
        )}
        {this.props.taskData.start != undefined && (
          <Text
            style={{
              fontSize: 30,
              fontWeight: 'bold',
              paddingLeft: 10,
              color: '#8194a4',
              paddingBottom: 10,
            }}>
            {formatHoursMinutes(this.props.taskData.start)} -{' '}
            {formatHoursMinutes(this.props.taskData.end)}
          </Text>
        )}
        {/*{this.props.taskData.end != undefined && (
          <Text style={{fontSize:15, fontWeight: 'bold'}}>{formatHoursMinutes(this.props.taskData.end)}</Text>
        )}*/}
        {/*<Text>isDone: {this.props.taskData.isDone ? 'yes' : 'no'}</Text>
        <Text>isDeleted: {this.props.taskData.isDeleted ? 'yes' : 'no'}</Text>*/}
        <EditTaskModal
          isVisible={this.state.isModalVisible}
          toggleModal={this.toggleModal}
          data={this.props.taskData}
          setData={this.props.editTask}
        />
        <Pressable
          title="Delete"
          style={{
            zIndex: 1,
            position: 'absolute',
            backgroundColor: '#eed4d4',
            justifyContent: 'center',
            alignItems: 'center',
            width: 50,
            height: 50,
            right: 60,
            borderRadius: 100,
            elevation: 2,
          }}
          onPress={() => {
            this.props.setDeleteTask(
              this.props.taskData.id,
              !this.props.taskData.isDeleted,
            );
          }}>
          <Ionicons
            name={'trash'}
            color={this.determineColor(this.props.taskData.isDeleted)}
            size={30}
          />
        </Pressable>
      </TouchableOpacity>
    );
  }
}
