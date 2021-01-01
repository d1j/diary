import realm from './realm';
import _ from 'lodash';

const realmFilters = {
  dayMonthYear: (date) => {
    return `day = ${date.getDate()} AND month = ${date.getMonth()} AND year = ${date.getFullYear()}`;
  },
};

const getPrimaryKeyId = (model) => {
  if (realm.objects(model).max('id')) {
    return realm.objects(model).max('id') + 1;
  }
  return 1;
};
// -------------------------------------
const addNewEmptyDayEntry = (date) => {
  let newId = getPrimaryKeyId('Day');
  let newDayData = {
    id: newId,
    day: date.getDate(),
    month: date.getMonth(),
    year: date.getFullYear(),
    timeBasedTasks: [],
    miscTasks: [],
    basicNotes: '',
    stats: {
      mood: null,
      energy: null,
      motivation: null,
      wokeUp: null,
      wentToSleep: null,
      sleepTime: null,
    },
  };
  realm.write(() => {
    realm.create('Day', newDayData);
  });
  return newDayData;
};

const findDayByDate = (date) => {
  return realm.objects('Day').filtered(realmFilters.dayMonthYear(date))[0];
};

const saveBasicNotes = (id, text) => {
  realm.write(() => {
    realm.create('Day', {id, basicNotes: text}, true);
  });
};

const finishDay = (id) => {
  realm.write(() => {
    realm.create('Day', {id, isFinished: true}, true);
  });
};

const getNextTaskId = (arr) => {
  if (arr.length > 0) {
    let maxId = -1;
    arr.forEach((obj) => {
      if (obj.id > maxId) {
        maxId = obj.id;
      }
    });
    return maxId + 1;
  } else {
    return 1;
  }
};

const addNewTbTask = (date, data) => {
  //Check if db entry at the given date exists
  let day = realm.objects('Day').filtered(realmFilters.dayMonthYear(date))[0];
  if (day === undefined) {
    addNewEmptyDayEntry(date);
  }
  realm.write(() => {
    let day = realm.objects('Day').filtered(realmFilters.dayMonthYear(date))[0];
    let nextId = getNextTaskId(day.timeBasedTasks);
    data.id = nextId;
    day.timeBasedTasks.push(data);
  });
};

const addNewMiscTask = (date, data) => {
  //Check if db entry at the given date exists
  let day = realm.objects('Day').filtered(realmFilters.dayMonthYear(date))[0];
  if (day === undefined) {
    addNewEmptyDayEntry(date);
  }
  realm.write(() => {
    let day = realm.objects('Day').filtered(realmFilters.dayMonthYear(date))[0];
    let nextId = getNextTaskId(day.miscTasks);
    data.id = nextId;
    day.miscTasks.push(data);
  });
};

const getLastTbTaskId = (date) => {
  let day = realm.objects('Day').filtered(realmFilters.dayMonthYear(date))[0];
  return getNextTaskId(day.timeBasedTasks) - 1;
};

const getLastMiscTaskId = (date) => {
  let day = realm.objects('Day').filtered(realmFilters.dayMonthYear(date))[0];
  return getNextTaskId(day.miscTasks) - 1;
};

const removeTbTask = (date, taskId) => {
  realm.write(() => {
    let day = realm.objects('Day').filtered(realmFilters.dayMonthYear(date))[0];
    let taskToremove = day.timeBasedTasks.filtered(`id = ${taskId}`);
    realm.delete(taskToremove);
  });
};

const removeMiscTask = (date, taskId) => {
  realm.write(() => {
    let day = realm.objects('Day').filtered(realmFilters.dayMonthYear(date))[0];
    let taskToremove = day.miscTasks.filtered(`id = ${taskId}`);
    realm.delete(taskToremove);
  });
};

export default {
  addNewEmptyDayEntry,
  findDayByDate,
  saveBasicNotes,
  finishDay,
  addNewTbTask,
  addNewMiscTask,
  getLastTbTaskId,
  getLastMiscTaskId,
  removeTbTask,
  removeMiscTask,
};
