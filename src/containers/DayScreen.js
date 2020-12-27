import React, {Component} from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-elements';
import Collapsible from 'react-native-collapsible';

import CalendarButtonDropDown from '../components/CalendarButtonDropDown';
import TaskSection from '../components/TaskSection';

import _DebugWindow from './_DebugWindow';
import db from '../../schemas/manageRealm';

export default class DayScreen extends Component {
  constructor(props) {
    super(props);

    // Gather data to store in state
    let _currentDay = new Date();
    let _currentDayData = db.findDayByDate(_currentDay);

    // If current day entry does not exist in DB, create new empty entry
    if (_currentDayData === undefined) {
      _currentDayData = db.addNewEmptyDayEntry(_currentDay);
    }

    this.state = {
      currentDate: _currentDay,
      currentDayData: _currentDayData,
      isTBTSectionCollapsed: false,
      isMTSectionCollapsed: false,
    };

    this.setCurrentDate = this.setCurrentDate.bind(this);
  }

  setCurrentDate(newDate) {
    // Find new newDate data
    let newCurrentDayData = db.findDayByDate(newDate);

    // If newDay entry does not exist in DB, create new empty entry
    if (newCurrentDayData === undefined) {
      newCurrentDayData = db.addNewEmptyDayEntry(newDate);
    }
    this.setState({currentDate: newDate, currentDayData: newCurrentDayData});
  }

  componentDidMount() {}

  render() {
    return (
      <View style={{flex: 1}}>
        <CalendarButtonDropDown
          currentDate={this.state.currentDate}
          setCurrentDate={this.setCurrentDate}
        />
        <Text h3>Time based tasks</Text>
        <Collapsible collapsed={this.state.isTBTSectionCollapsed}>
          <TaskSection taskList={this.state.currentDayData.timeBasedTasks} />
        </Collapsible>

        <Text h3>Miscellaneous tasks</Text>
        <Collapsible collapsed={this.state.isMTSectionCollapsed}>
          <TaskSection taskList={this.state.currentDayData.miscTasks} />
        </Collapsible>

        <Text h3></Text>

        <_DebugWindow />
      </View>
    );
  }
}
