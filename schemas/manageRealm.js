import realm from './realm';

// -------------------------------------
// Helpers
// -------------------------------------

const getDayDateInterval = (date) => {
  let start = new Date(date);
  start.setHours(0, 0, 0, 0);
  let end = new Date(start.getTime() + 86400000);
  return {start, end};
};

const getPrimaryKeyId = (model) => {
  if (realm.objects(model).max('id')) {
    return realm.objects(model).max('id') + 1;
  }
  return 1;
};

const realmFilters = {
  dayInterval: (date) => {
    let dayInterv = getDayDateInterval(date);
    return ['date >= $0 && date < $1', dayInterv.start, dayInterv.end];
  },
};

// -------------------------------------
// Exports
// -------------------------------------

// Day queries
const addNewEmptyDayEntry = (date) => {
  let newDayData = {
    id: getPrimaryKeyId('Day'),
    date: date,
    basicNotes: '',
    isFinished: false,
  };
  realm.write(() => {
    realm.create('Day', newDayData);
  });
  return newDayData;
};

const findDay = (date) => {
  //Check if db entry at the given date exists
  let day = realm.objects('Day').filtered(...realmFilters.dayInterval(date))[0];
  if (day === undefined) {
    //create new empty db entry
    day = addNewEmptyDayEntry(date);
  }
  return day;
};

const finishDay = (id) => {
  realm.write(() => {
    realm.create('Day', {id, isFinished: true}, true);
  });
};

// DayStats queries
const addEmptyStatsEntry = (date) => {
  let newDayStatsData = {
    id: getPrimaryKeyId('DayStats'),
    date: date,
    mood: null,
    energy: null,
    motivation: null,
    wokeUp: null,
    wentToSleep: null,
    sleepTime: null,
  };
  realm.write(() => {
    realm.create('DayStats', newDayStatsData);
  });
  return newDayStatsData;
};

const findDayStats = (date) => {
  let stats = realm
    .objects('DayStats')
    .filtered(...realmFilters.dayInterval(date))[0];
  if (stats === undefined) {
    stats = addEmptyStatsEntry(date);
  }
  return stats;
};

const editStats = (newData) => {
  //TODO: calculate sleepTime
  realm.write(() => {
    realm.create('DayStats', newData, true);
  });
};

// TimeBasedTask queries
const findTBDayTasks = (date) => {
  let tasks = realm
    .objects('TimeBasedTask')
    .filtered(...realmFilters.dayInterval(date))
    .sorted('start');
  return tasks;
};

const addNewTbTask = (data) => {
  data.id = getPrimaryKeyId('TimeBasedTask');
  realm.write(() => {
    realm.create('TimeBasedTask', data);
  });
  return data.id;
};

const removeTbTask = (taskId) => {
  realm.write(() => {
    let task = realm.objectForPrimaryKey('TimeBasedTask', taskId);
    if (task) realm.delete(task);
    else console.log(`Could not remove non-existing TBtask ${taskId}`);
  });
};

const editTbTask = (newData) => {
  realm.write(() => {
    realm.create('TimeBasedTask', newData, true);
  });
};

// MiscTask queries
const findMiscDayTasks = (date) => {
  let tasks = realm
    .objects('MiscTask')
    .filtered(...realmFilters.dayInterval(date));
  return tasks;
};

const addNewMiscTask = (data) => {
  data.id = getPrimaryKeyId('MiscTask');
  realm.write(() => {
    realm.create('MiscTask', data);
  });
  return data.id;
};

const removeMiscTask = (taskId) => {
  realm.write(() => {
    let task = realm.objectForPrimaryKey('MiscTask', taskId);
    if (task) realm.delete(task);
    else console.log(`Could not remove non-existing miscTask ${taskId}`);
  });
};

const editMiscTask = (newData) => {
  realm.write(() => {
    realm.create('MiscTask', newData, true);
  });
};

// BasicNotes queries
const saveBasicNotes = (id, text) => {
  realm.write(() => {
    realm.create('Day', {id, basicNotes: text}, true);
  });
};

export default {
  addNewEmptyDayEntry,
  findDay,
  findTBDayTasks,
  findMiscDayTasks,
  findDayStats,
  saveBasicNotes,
  finishDay,
  addNewTbTask,
  addNewMiscTask,
  removeTbTask,
  removeMiscTask,
  editTbTask,
  editMiscTask,
  editStats,
};
