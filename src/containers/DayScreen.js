import React, {Component} from 'react';
import {ScrollView, Button} from 'react-native';
import {Text} from 'react-native-elements';
import Collapsible from 'react-native-collapsible';

import CalendarButtonModal from '../components/CalendarButtonModal';
import TaskSection from '../components/TaskSection';
import NotesSection from '../components/NotesSection';
import StatsSection from '../components/StatsSection';
import AddNewTaskButtonModal from '../components/AddNewTaskButtonModal';

import _DebugWindow from './_DebugWindow';

import db from '../../schemas/manageRealm';

const isDateInFuture = (date) => {
  let currentDate = new Date();
  //Setting both Date hours to zero to eliminate possible bugs due to race conditions
  currentDate.setHours(0, 0, 0, 0);
  date.setHours(0, 0, 0, 0);
  if (currentDate.getTime() < date.getTime()) {
    return true;
  }
  return false;
};

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
      // _testTaskData: {
      //   id: 1,
      //   start: new Date(2020, 11, 22, 12, 30, 0, 0),
      //   end: new Date(2020, 11, 22, 13, 30, 0, 0),
      //   taskName: 'Write down some test data',
      //   taskDescription: 'yeet',
      //   taskIsTimeBased: true,
      // },
      currentDate: _currentDay,
      id: _currentDayData.id,
      timeBasedTasks: _currentDayData.timeBasedTasks, //TODO: keep timeBasedTasks sorted by start time
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
    this.finishCurrentDay = this.finishCurrentDay.bind(this);
    this.addNewTask = this.addNewTask.bind(this);
  }

  //Calendar
  //-----------------------------------------------------
  setCurrentDate(newDate) {
    // Find new newDate data
    let newCurrentDayData = db.findDayByDate(newDate);

    // If newDay entry does not exist in DB, create new empty entry
    if (newCurrentDayData == undefined) {
      newCurrentDayData = db.addNewEmptyDayEntry(newDate);
    }
    this.setState({
      currentDate: newDate,
      id: newCurrentDayData.id,
      timeBasedTasks: newCurrentDayData.timeBasedTasks,
      miscTasks: newCurrentDayData.miscTasks,
      basicNotes: newCurrentDayData.basicNotes,
      stats: newCurrentDayData.stats,
      isFinished: newCurrentDayData.isFinished,
    });
  }
  //-----------------------------------------------------

  //Basic Notes
  //-----------------------------------------------------
  saveNewNotes(newText) {
    this.setState({basicNotes: newText});
  }
  saveNotesToDb() {
    db.saveBasicNotes(this.state.id, this.state.basicNotes);
  }
  //-----------------------------------------------------

  //Finish day
  //-----------------------------------------------------
  finishCurrentDay() {
    db.finishDay(this.state.id);
    this.setState({isFinished: true});
    //TODO: promptint useri supildyt dienos statistika?
    //Arba StatsSection komponenete tikrint,
    //ar yra duomenu ir displayint, kad "seni, nera jokiu duomenu, spausk cia, kad supildyt juos", po ko butu atidarytas FillDayStats forma
  }
  //-----------------------------------------------------

  //Add new task
  //-----------------------------------------------------
  addNewTask() {}
  //-----------------------------------------------------

  render() {
    return (
      <ScrollView style={{flex: 1}}>
        <CalendarButtonModal
          currentDate={this.state.currentDate}
          setCurrentDate={this.setCurrentDate}
        />

        {/* This could be a button that collapses/expands the section */}
        <Text h3>Time based tasks</Text>
        <Collapsible collapsed={this.state.isTBTSectionCollapsed}>
          <TaskSection taskList={this.state.timeBasedTasks} />
        </Collapsible>

        {/* This could be a button that collapses/expands the section */}
        <Text h3>Miscellaneous tasks</Text>
        <Collapsible collapsed={this.state.isMTSectionCollapsed}>
          <TaskSection taskList={this.state.miscTasks} />
        </Collapsible>

        {/* This could be a button that collapses/expands the section */}
        <Text h3>Notes</Text>
        <Collapsible collapsed={this.state.isNotesSectionCollapsed}>
          <NotesSection
            saveNewNotes={this.saveNewNotes.bind(this)}
            saveNotesToDb={this.saveNotesToDb.bind(this)}
            notesData={this.state.basicNotes}
          />
        </Collapsible>

        {this.state.isFinished && <Text h3>Stats</Text>}
        {this.state.isFinished && (
          <Collapsible collapsed={this.state.isStatusSectionCollapsed}>
            <StatsSection stats={this.state.stats} />
          </Collapsible>
        )}

        {!this.state.isFinished && <AddNewTaskButtonModal />}

        {!this.state.isFinished && !isDateInFuture(this.state.currentDate) && (
          <Button title="Finish day" onPress={this.finishCurrentDay} />
        )}

        <_DebugWindow />
      </ScrollView>
    );
  }
}
