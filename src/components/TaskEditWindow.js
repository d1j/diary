import React, {Component} from 'react';
import {View, Button, TextInput} from 'react-native';
import {Text} from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import {ScrollView} from 'react-native-gesture-handler';

const formatHoursMinutes = (date) => {
  if (date == null) return '--:--';
  return `${
    date.getHours() / 10 < 1 ? '0' + date.getHours() : date.getHours()
  }:${
    date.getMinutes() / 10 < 1 ? '0' + date.getMinutes() : date.getMinutes()
  }`;
};

const formatDate = (date) => {
  if (date == null) return 'YYYY-MM-DD';
  return `${date.getFullYear()}-${
    (date.getMonth() + 1) / 10 < 1
      ? '0' + (date.getMonth() + 1)
      : date.getMonth() + 1
  }-${date.getDate() / 10 < 1 ? '0' + date.getDate() : date.getDate()}`;
};

/** If you are using this component to update task, provide the following prop:
 * prop.data = {
 *  id: taskId,
 *  start: taskStartTime,
 *  end: taskEndTime,
 *  taskName: taskName,
 *  taskIsTimeBased: true/false
 *  date: task Date()
 * }
 *
 * submitData() sets the following
 * {
 *  id: if props.data.id is defined
 *  taskIsTimeBased: true/false,
 *  start: taskStartTime,
 *  end: taskEndTime,
 *  taskName: taskName,
 *  description: taskDescription
 *  date: taskDate
 * }
 *
 *
 */
export default class TaskEditWindow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showStartTimePicker: false,
      showEndTimePicker: false,
      showDatePicker: false,

      taskIsTimeBased: true,
      taskStartTime: null,
      taskEndTime: null,
      taskName: '',
      taskDate: this.props.currentDate || null,
      taskDescription: null,
      // taskStartTime: new Date(2021, 0, 2, 12, 0, 0, 0),
      // taskEndTime: new Date(2021, 0, 2, 14, 0, 0, 0),
      // taskName: 'asd',
      // taskDate: new Date(2021, 0, 2, 0, 0, 0, 0),
    };
    //in case we are editing existing task:
    if (this.props.data) {
      this.state.id = this.props.data.id;
      this.state.taskDate = this.props.data.date;
      this.state.taskStartTime = this.props.data.start;
      this.state.taskEndTime = this.props.data.end;
      this.state.taskName = this.props.data.taskName;
      this.state.taskDescription = this.props.data.taskDescription;
      this.state.taskIsTimeBased =
        this.props.data.taskIsTimeBased || this.props.data.start ? true : false;
      this.state.initialTaskIsTimeBased = this.state.taskIsTimeBased;
    }
    this.toggleStartTimePicker = this.toggleStartTimePicker.bind(this);
    this.toggleEndTimePicker = this.toggleEndTimePicker.bind(this);
    this.submitData = this.submitData.bind(this);
    this.toggleDatePicker = this.toggleDatePicker.bind(this);
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

  toggleDatePicker() {
    this.setState({
      showDatePicker: !this.state.showDatePicker,
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

  changeDate(event, date) {
    this.setState({showDatePicker: false});
    if (event.type === 'set') this.setState({taskDate: date});
    else if (event.type === 'dismissed') this.setState({taskDate: null});
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

      //validate task date
      if (this.state.taskDate === null) throw 3;
      returnObject.date = this.state.taskDate;

      //validate and set task name
      if (this.state.taskName === '' || this.state.taskName === null) throw 4;
      returnObject.taskName = this.state.taskName;

      //set task desription
      returnObject.description =
        this.state.taskDescription === '' ? null : this.state.taskDescription;

      //set id
      if (this.props.data) {
        returnObject.id = this.state.id;
        returnObject.initialTaskIsTimeBased = this.state.initialTaskIsTimeBased;
      }

      this.props.setData(returnObject);
      this.props.toggleModal();
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
          console.log('Invalid date');
          break;
        case 4:
          console.log('Task name not specified');
          break;
        default:
          console.log(err);
      }
    }
  }

  render() {
    return (
      <ScrollView
        style={{
          backgroundColor: 'white',
          flex: 1,
          padding:10,
          borderTopLeftRadius:30,
          borderTopRightRadius:30
        }}>
        <Text h3>{this.props.data ? 'Edit task' : 'Add new task'}</Text>
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
                value={new Date()}
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
                value={new Date()}
                is24Hour={true}
                mode="time"
                display="default"
                onChange={this.changeEndTime.bind(this)}
              />
            )}
          </View>
        )}
        <Text>Task date</Text>
        <Button
          title={formatDate(this.state.taskDate)}
          onPress={this.toggleDatePicker}></Button>
        {this.state.showDatePicker && (
          <DateTimePicker
            value={this.state.taskDate || new Date()}
            mode="date"
            display="default"
            onChange={this.changeDate.bind(this)}
          />
        )}
        <Text>Task name</Text>
        <TextInput
    onChangeText={(text) => {
      this.setState({taskName: text});
    }}
    placeholder="Enter task name..."
    value={this.state.taskName}/>
        <Text>Task description</Text>
        <TextInput
    placeholder="Enter task description..."
    onChangeText={(text) => {
      this.setState({taskDescription: text});
    }}
    value={this.state.taskDescription}/>
        <Button
    title={this.props.data ? 'Edit task' : 'Add new task'}
    onPress={this.submitData}/>
        <Button title="Cancel" onPress={this.props.toggleModal}></Button>
      </ScrollView>
    );
  }
}
