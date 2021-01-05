import React, {Component} from 'react';
import {Text, AirbnbRating} from 'react-native-elements';
import {View, Button} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const formatHoursMinutes = require('../../helper_funcs/func')
  .formatHoursMinutes;
const formatDate = require('../../helper_funcs/func').formatDateWithDashes;

const RatingSection = (props) => {
  return (
    <View>
      <Text>{props.sectionName}</Text>
      <AirbnbRating
        defaultRating={props.defaultRating}
        count={5}
        showRating={false}
        onFinishRating={props.onFinishRating}
      />
    </View>
  );
};

class SelectDayAndTime extends Component {
  constructor(props) {
    super(props);

    this.state = {
      time: this.props.time,
      showTimePicker: false,
      timePickerMode: 'date',
    };
  }

  changeWokeTime(event, date) {
    if (event.type === 'set') {
      if (this.state.timePickerMode === 'date') {
        let newDate = this.state.time
          ? new Date(this.state.time.getTime())
          : new Date();
        newDate.setFullYear(date.getFullYear());
        newDate.setMonth(date.getMonth());
        newDate.setDate(date.getDate());
        this.setState({time: newDate, timePickerMode: 'time'});
      } else if (this.state.timePickerMode === 'time') {
        let newDate = new Date(this.state.time.getTime());
        newDate.setHours(date.getHours());
        newDate.setMinutes(date.getMinutes());
        this.setState({
          time: newDate,
          showTimePicker: false,
          timePickerMode: 'date',
        });
        this.props.submitData(this.state.time);
      }
    } else {
      this.setState({showTimePicker: false, timePickerMode: 'date'});
    }
  }

  render() {
    return (
      <View>
        <Text>{this.props.title}</Text>
        <Button
          title={`${formatDate(this.state.time)}      ${formatHoursMinutes(
            this.state.time,
          )}`}
          onPress={() => {
            this.setState({showTimePicker: true});
          }}
        />
        {this.state.showTimePicker && (
          <DateTimePicker
            value={this.state.time || new Date()}
            is24Hour={true}
            mode={this.state.timePickerMode}
            display="default"
            onChange={this.changeWokeTime.bind(this)}
          />
        )}
      </View>
    );
  }
}

export default class EditStatsModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.stats.id,
      date: this.props.stats.date,
      mood: this.props.stats.mood,
      energy: this.props.stats.energy,
      motivation: this.props.stats.motivation,
      wokeUp: this.props.stats.wokeUp,
      wentToSleep: this.props.stats.wentToSleep,
      sleepTime: this.props.stats.sleepTime,
      currentDate: this.props.currentDate,
      showWentToTimePicker: false,
      wentToTimePickerMode: 'date',
    };
    this.submitData = this.submitData.bind(this);
  }

  submitData() {
    try {
      let returnObject = {
        id: this.props.stats.id,
        date: this.props.stats.date,
        mood: this.state.mood,
        energy: this.state.energy,
        motivation: this.state.motivation,
        wokeUp: this.state.wokeUp,
        wentToSleep: this.state.wentToSleep,
        sleepTime: this.state.sleepTime,
      };
      if (this.state.wokeUp && this.state.wentToSleep) {
        if (this.state.wokeUp.getTime() > this.state.wentToSleep.getTime()) {
          throw 1;
        }
      }
      this.props.setStats(returnObject);
      this.props.toggleModal();
    } catch (err) {
      switch (err) {
        case 1:
          console.log('Invalid logic wokeUp/wentToSleep interval logic.');
          break;
        default:
          console.log(err);
      }
    }
  }

  render() {
    return (
      <View style={{backgroundColor: 'white'}}>
        <Text h3>Edit stats for {`${formatDate(this.state.currentDate)}`}</Text>

        <RatingSection
          sectionName="Mood:"
          defaultRating={this.props.stats.mood}
          onFinishRating={(rating) => {
            this.setState({mood: rating});
          }}
        />
        <RatingSection
          sectionName="Energy:"
          defaultRating={this.props.stats.energy}
          onFinishRating={(rating) => {
            this.setState({energy: rating});
          }}
        />
        <RatingSection
          sectionName="Motivation:"
          defaultRating={this.props.stats.motivation}
          onFinishRating={(rating) => {
            this.setState({motivation: rating});
          }}
        />

        <SelectDayAndTime
          time={this.state.wokeUp}
          title="Woke up:"
          submitData={(data) => {
            this.setState({wokeUp: data});
          }}
        />

        <SelectDayAndTime
          time={this.state.wentToSleep}
          title="Went to sleep:"
          submitData={(data) => {
            this.setState({wentToSleep: data});
          }}
        />

        <Text>Sleep time: {this.state.sleepTime || 'to be calculated'}</Text>

        <Button title="Edit Task" onPress={this.submitData} />
        <Button title="Cancel" onPress={this.props.toggleModal} />
      </View>
    );
  }
}
