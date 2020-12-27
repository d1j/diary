import React, {Component} from 'react';
import {ScrollView, Button} from 'react-native';
import {Text} from 'react-native-elements';
import Collapsible from 'react-native-collapsible';

import _ from 'lodash';

import CalendarButtonDropDown from '../components/CalendarButtonDropDown';
import TaskSection from '../components/TaskSection';
import NotesSection from '../components/NotesSection';
import StatsSection from '../components/StatsSection';

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
      timeBasedTasks: _currentDayData.timeBasedTasks,
      miscTasks: _currentDayData.miscTasks,
      basicNotes: _currentDayData.basicNotes,
      stats: _currentDayData.stats,
      isFinished: _currentDayData.isFinished,
      isTBTSectionCollapsed: false,
      isMTSectionCollapsed: false,
      isStatusSectionCollapsed: false,
      isNotesSectionCollapsed: false,
    };

    this.setCurrentDate = this.setCurrentDate.bind(this);
    this.saveNewNotes = this.saveNewNotes.bind(this);
    this.finishCurrentDay = this.finishCurrentDay.bind(this);
    this.addNewTask = this.addNewTask.bind(this);
  }

  setCurrentDate(newDate) {
    // Find new newDate data
    let newCurrentDayData = db.findDayByDate(newDate);

    // If newDay entry does not exist in DB, create new empty entry
    if (newCurrentDayData === undefined) {
      newCurrentDayData = db.addNewEmptyDayEntry(newDate);
      console.log(newCurrentDayData.stats);
    }
    this.setState({
      currentDate: newDate,
      timeBasedTasks: newCurrentDayData.timeBasedTasks,
      miscTasks: newCurrentDayData.miscTasks,
      basicNotes: newCurrentDayData.basicNotes,
      stats: newCurrentDayData.stats,
      isFinished: newCurrentDayData.isFinished,
    });
  }

  //TODO: add ids/primary keys for realm schemas so that we can update entries

  saveNewNotes(newText) {
    this.setState({basicNotes: newText});
  }

  finishCurrentDay() {
    this.setState({isFinished: true});
    //TODO: promptint useri supildyt dienos statistika?
    //Arba StatsSection komponenete tikrint,
    //ar yra duomenu ir displayint, kad "seni, nera jokiu duomenu, spausk cia, kad supildyt juos", po ko butu atidarytas FillDayStats forma
  }

  addNewTask() {
    console.log('Add/Edit task Modal pops up');
    //TODO: make that the EditTaskWindow would pop up as a modal
  }

  componentDidMount() {}

  render() {
    return (
      <ScrollView style={{flex: 1}}>
        <CalendarButtonDropDown
          currentDate={this.state.currentDate}
          setCurrentDate={this.setCurrentDate}
        />

        <Text h3>Time based tasks</Text>
        <Collapsible collapsed={this.state.isTBTSectionCollapsed}>
          <TaskSection taskList={this.state.timeBasedTasks} />
        </Collapsible>

        <Text h3>Miscellaneous tasks</Text>
        <Collapsible collapsed={this.state.isMTSectionCollapsed}>
          <TaskSection taskList={this.state.miscTasks} />
        </Collapsible>

        <Text h3>Notes</Text>
        <Collapsible collapsed={this.state.isNotesSectionCollapsed}>
          <NotesSection saveNewNotes={this.saveNewNotes} />
        </Collapsible>

        {this.state.isFinished && <Text h3>Stats</Text>}
        {this.state.isFinished && (
          <Collapsible collapsed={this.state.isStatusSectionCollapsed}>
            <StatsSection stats={this.state.stats} />
          </Collapsible>
        )}

        <Button title="Add new task" onPress={this.addNewTask} />
        <Button title="Finish day" onPress={this.finishCurrentDay} />

        <_DebugWindow />
      </ScrollView>
    );
  }
}
