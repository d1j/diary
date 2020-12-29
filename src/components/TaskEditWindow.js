import React, {Component} from 'react';
import {View, Button} from 'react-native';
import {Text} from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import Modal from 'react-native-modal';
import {TextInput} from 'react-native';

const formatHoursMinutes = (date) => {
  if (date == null) return '--:--';
  return `${
    date.getHours() / 10 < 1 ? '0' + date.getHours() : date.getHours()
  }:${
    date.getMinutes() / 10 < 1 ? '0' + date.getMinutes() : date.getMinutes()
  }`;
};

/** If you are using this component to update task, please provide the following prop:
 * prop.data = {
 *  id: taskId,
 *  start: taskStartTime,
 *  end: taskEndTime,
 *  taskName: taskName,
 *  taskIsTimeBased: true/false
 * }
 */
export default class TaskEditWindow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentDate: null,
      showStartTimePicker: false,
      showEndTimePicker: false,
      taskIsTimeBased: true,
      taskStartTime: null,
      taskEndTime: null,
      taskName: '',
      taskDescription: null,
    };
    //in case we are editing existing task:
    if (this.props.data) {
      this.state.id = this.props.data.id;
      this.state.taskStartTime = this.props.data.start;
      this.state.taskEndTime = this.props.data.end;
      this.state.taskName = this.props.data.taskName;
      this.state.taskDescription = this.props.data.taskDescription;
      this.state.taskIsTimeBased = this.props.data.taskIsTimeBased;
    }
    this.toggleStartTimePicker = this.toggleStartTimePicker.bind(this);
    this.toggleEndTimePicker = this.toggleEndTimePicker.bind(this);
    this.submitData = this.submitData.bind(this);
  }

  toggleStartTimePicker() {
    this.setState({
      showStartTimePicker: !this.state.showStartTimePicker,
    });
  }
  toggleEndTimePicker() {
    this.setState({
      showEndTimePicker: !this.state.showEndTimePicker,
    });
  }

  //TODO: check if valid start/end times are set
  changeStartTime(event, date) {
    //event types: set/dismissed
    this.setState({showStartTimePicker: false});
    if (event.type === 'set') this.setState({taskStartTime: date});
    else if (event.type === 'dismissed') this.setState({taskStartTime: null});
  }

  changeEndTime(event, date) {
    this.setState({showEndTimePicker: false});
    if (event.type === 'set') this.setState({taskEndTime: date});
    else if (event.type === 'dismissed') this.setState({taskEndTime: null});
  }

  submitData() {
    try {
      //validate time interval
      let returnObject = {taskIsTimeBased: this.state.taskIsTimeBased};
      if (this.state.taskIsTimeBased) {
        if (this.state.taskStartTime === null && this.state.taskIsTimeBased)
          throw 0;
        if (this.state.taskEndTime === null && this.state.taskIsTimeBased)
          throw 1;
        if (
          this.state.taskStartTime.getTime() >= this.state.taskEndTime.getTime()
        )
          throw 2;

        //set time interval
        returnObject.start = this.state.taskStartTime;
        returnObject.end = this.state.taskEndTime;
      }

      //validate and set task name
      if (this.state.taskName === '' || this.state.taskName === null) throw 3;
      returnObject.taskName = this.state.taskName;

      //set task desription
      returnObject.taskDescription =
        this.state.taskDescription === '' ? null : this.state.taskDescription;

      //TODO: return new task data
      console.log(returnObject);
    } catch (err) {
      //TODO: prompt users with error msg
      switch (err) {
        case 0:
          console.log('Start time not specified');
          break;
        case 1:
          console.log('End time not specified');
          break;
        case 2:
          console.log('Invalid time interval');
          break;
        case 3:
          console.log('Task name not specified');
          break;
        default:
          console.log(err);
      }
    }
  }

  render() {
    return (
      <View>
        <Text h3>Add new task</Text>
        <Text>Task type</Text>
        <Button
          title={this.state.taskIsTimeBased ? 'Time-based' : 'Misc'}
          onPress={() =>
            this.setState({
              taskIsTimeBased: !this.state.taskIsTimeBased,
            })
          }></Button>
        {this.state.taskIsTimeBased && (
          <View>
            <Text>Task start time:</Text>
            <Button
              title={formatHoursMinutes(this.state.taskStartTime)}
              onPress={this.toggleStartTimePicker}></Button>
            {this.state.showStartTimePicker && (
              <DateTimePicker
                value={
                  this.state.currentDate ? this.state.currentDate : new Date()
                }
                is24Hour={true}
                mode="time"
                display="default"
                onChange={this.changeStartTime.bind(this)}
              />
            )}
            <Text>Task end time:</Text>
            <Button
              title={formatHoursMinutes(this.state.taskEndTime)}
              onPress={this.toggleEndTimePicker}></Button>
            {this.state.showEndTimePicker && (
              <DateTimePicker
                value={
                  this.state.currentDate ? this.state.currentDate : new Date()
                }
                is24Hour={true}
                mode="time"
                display="default"
                onChange={this.changeEndTime.bind(this)}
              />
            )}
          </View>
        )}
        <Text>Task name</Text>
        <TextInput
          onChangeText={(text) => {
            this.setState({taskName: text});
          }}
          value={this.state.taskName}></TextInput>
        <Text>Task description</Text>
        <TextInput
          onChangeText={(text) => {
            this.setState({taskDescription: text});
          }}
          value={this.state.taskDescription}></TextInput>
        <Button title="Add new task" onPress={this.submitData}></Button>
        <Button title="Cancel" onPress={this.props.toggleModal}></Button>
      </View>
    );
  }
}
