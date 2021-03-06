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

const isDateInFuture = require('../helper_funcs/func').isDateInFuture;

export default class DayScreen extends Component {
  constructor(props) {
    super(props);

    // Gather data to be stored in state
    let _currentDay = new Date();
    _currentDay.setHours(0, 0, 0, 0);
    let _currentDayData = db.findDay(_currentDay);

    this.state = {
      _testTaskData: {
        id: 1,
        date: new Date(2021, 0, 2, 0, 0, 0, 0),
        start: new Date(2021, 0, 2, 12, 30, 0, 0),
        end: new Date(2021, 0, 2, 13, 30, 0, 0),
        taskName: 'Write down some test data',
        taskDescription: 'yeet',
        taskIsTimeBased: true,
      },
      id: _currentDayData.id,
      currentDate: _currentDay, //specifies which day we are viewing on DayScreen
      basicNotes: _currentDayData.basicNotes,
      isFinished: _currentDayData.isFinished,
      timeBasedTasks: db.findTBDayTasks(_currentDay),
      miscTasks: db.findMiscDayTasks(_currentDay),
      stats: db.findDayStats(_currentDay),

      isTBTSectionCollapsed: false,
      isMTSectionCollapsed: false,
      isStatsSectionCollapsed: false,
      isNotesSectionCollapsed: false,
    };

    this.setCurrentDate = this.setCurrentDate.bind(this);
    this.finishCurrentDay = this.finishCurrentDay.bind(this);
    this.addNewTask = this.addNewTask.bind(this);
    this.editTask = this.editTask.bind(this);
    this.setStats = this.setStats.bind(this);
  }

  //Calendar
  //-----------------------------------------------------
  setCurrentDate(newDate) {
    // Find data of a new day
    let newCurrentDayData = db.findDay(newDate);

    // Update data
    this.setState({
      currentDate: newDate,
      id: newCurrentDayData.id,
      isFinished: newCurrentDayData.isFinished,
      basicNotes: newCurrentDayData.basicNotes,
      timeBasedTasks: db.findTBDayTasks(newDate),
      miscTasks: db.findMiscDayTasks(newDate),
      stats: db.findDayStats(newDate),
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

  //Add new task (used to add both Misc and Time-based tasks)
  /**example input:
   *
   * data = {
   *  taskIsTimeBased: true/false,
   *  start: taskStartTime,
   *  end: taskEndTime,
   *  taskName: taskName,
   *  description: taskDescription
   *  date: taskDate
   * } */
  //-----------------------------------------------------
  addNewTask(data) {
    //Add new task to DB
    let newTask = {isDone: false, isFinished: false};
    if (data.taskIsTimeBased) {
      //TBTask
      newTask = {
        ...newTask,
        date: data.date,
        start: data.start,
        end: data.end,
        taskName: data.taskName,
        description: data.description,
      };
      newTask.id = db.addNewTbTask(newTask);
    } else {
      //MiscTask
      newTask = {
        ...newTask,
        date: data.date,
        taskName: data.taskName,
        description: data.description,
      };
      newTask.id = db.addNewMiscTask(newTask);
    }
    //Check if added task should be added to the current day window
    let currentDate = new Date(this.state.currentDate.getTime());
    let taskDate = new Date(data.date);
    currentDate.setHours(0, 0, 0, 0);
    taskDate.setHours(0, 0, 0, 0);

    if (taskDate.getTime() === currentDate.getTime()) {
      if (data.taskIsTimeBased) {
        this.setState({
          timeBasedTasks: db.findTBDayTasks(this.state.currentDate),
        });
      } else {
        this.setState({
          miscTasks: db.findMiscDayTasks(this.state.currentDate),
        });
      }
    }
  }
  //-----------------------------------------------------

  //Edit task (used to edit both misc and TB tasks)
  /**example input:
   *
   * data = {
   *  id: taskId,
   *  taskIsTimeBased: true/false,
   *  start: taskStartTime,
   *  end: taskEndTime,
   *  taskName: taskName,
   *  description: taskDescription
   *  date: taskDate
   * } */
  //-----------------------------------------------------
  editTask(data) {
    if (data.taskIsTimeBased) {
      //Change to time-based task
      if (data.initialTaskIsTimeBased) {
        //Initial task is time-based
        db.editTbTask(data);
        this.setState({
          timeBasedTasks: db.findTBDayTasks(this.state.currentDate),
        });
      } else {
        //Initial task is miscellaneous
        db.removeMiscTask(data.id);
        db.addNewTbTask(data);
        this.setState({
          timeBasedTasks: db.findTBDayTasks(this.state.currentDate),
          miscTasks: db.findMiscDayTasks(this.state.currentDate),
        });
      }
    } else {
      //Change to misc task
      if (data.initialTaskIsTimeBased) {
        //Initial task is time-based
        db.removeTbTask(data.id);
        db.addNewMiscTask(data);
        this.setState({
          timeBasedTasks: db.findTBDayTasks(this.state.currentDate),
          miscTasks: db.findMiscDayTasks(this.state.currentDate),
        });
      } else {
        //Initial taks is misc
        db.editMiscTask(data);
        this.setState({
          miscTasks: db.findMiscDayTasks(this.state.currentDate),
        });
      }
    }
  }
  //-----------------------------------------------------

  //Task.isDone/Task.isDeleted setters
  //-----------------------------------------------------
  setDoneTbTask(taskId, value) {
    db.editTbTask({isDone: value, id: taskId});
    this.setState({
      timeBasedTasks: db.findTBDayTasks(this.state.currentDate),
    });
  }

  setDoneMiscTask(taskId, value) {
    db.editMiscTask({isDone: value, id: taskId});
    this.setState({
      miscTasks: db.findMiscDayTasks(this.state.currentDate),
    });
  }
  setDeleteTbTask(taskId, value) {
    db.editTbTask({isDeleted: value, id: taskId});
    this.setState({
      timeBasedTasks: db.findTBDayTasks(this.state.currentDate),
    });
  }
  setDeleteMiscTask(taskId, value) {
    db.editMiscTask({isDeleted: value, id: taskId});
    this.setState({
      miscTasks: db.findMiscDayTasks(this.state.currentDate),
    });
  }
  //-----------------------------------------------------

  //Set day statistics
  //-----------------------------------------------------
  setStats(data) {
    db.editStats(data);
    this.setState({
      stats: db.findDayStats(this.state.currentDate),
    });
  }
  //-----------------------------------------------------

  render() {
    return (
      <ScrollView style={{flex: 1}}>
        <CalendarButtonModal
          currentDate={this.state.currentDate}
          setCurrentDate={this.setCurrentDate}
        />

        {/* Time-based task section */}
        <Text
          h3
          onPress={() => {
            this.setState({
              isTBTSectionCollapsed: !this.state.isTBTSectionCollapsed,
            });
          }}>
          Time based tasks ({this.state.timeBasedTasks.length})
        </Text>
        <Collapsible collapsed={this.state.isTBTSectionCollapsed}>
          <TaskSection
            taskList={this.state.timeBasedTasks}
            setDoneTask={this.setDoneTbTask.bind(this)}
            setDeleteTask={this.setDeleteTbTask.bind(this)}
            editTask={this.editTask}
          />
        </Collapsible>

        {/* Miscellaneous task section */}
        <Text
          h3
          onPress={() => {
            this.setState({
              isMTSectionCollapsed: !this.state.isMTSectionCollapsed,
            });
          }}>
          Miscellaneous tasks ({this.state.miscTasks.length})
        </Text>
        <Collapsible collapsed={this.state.isMTSectionCollapsed}>
          <TaskSection
            taskList={this.state.miscTasks}
            setDoneTask={this.setDoneMiscTask.bind(this)}
            setDeleteTask={this.setDeleteMiscTask.bind(this)}
            editTask={this.editTask}
          />
        </Collapsible>

        {/* Notes section */}
        <Text
          h3
          onPress={() => {
            this.setState({
              isNotesSectionCollapsed: !this.state.isNotesSectionCollapsed,
            });
          }}>
          Notes
        </Text>
        <Collapsible collapsed={this.state.isNotesSectionCollapsed}>
          <NotesSection
            saveNewNotes={this.saveNewNotes.bind(this)}
            saveNotesToDb={this.saveNotesToDb.bind(this)}
            notesData={this.state.basicNotes}
          />
        </Collapsible>

        {/* Stats section */}
        {this.state.isFinished && (
          <Text
            h3
            onPress={() => {
              this.setState({
                isStatsSectionCollapsed: !this.state.isStatsSectionCollapsed,
              });
            }}>
            Stats
          </Text>
        )}
        {this.state.isFinished && (
          <Collapsible collapsed={this.state.isStatsSectionCollapsed}>
            <StatsSection
              stats={this.state.stats}
              currentDate={this.state.currentDate}
              setStats={this.setStats}
            />
          </Collapsible>
        )}

        {!this.state.isFinished && (
          <AddNewTaskButtonModal
            currentDate={this.state.currentDate}
            setData={this.addNewTask}
          />
        )}
        {!this.state.isFinished && !isDateInFuture(this.state.currentDate) && (
          <Button title="Finish day" onPress={this.finishCurrentDay} />
        )}

        <_DebugWindow />
      </ScrollView>
    );
  }
}
