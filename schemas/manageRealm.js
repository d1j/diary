import realm from './realm';

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
  Math.max.apply(
    Math,
    arr.map(function (o) {
      return o.id;
    }),
  );
};

const addMiscTask = (id, miscTask) => {
  realm.write(() => {
    let day = realm.create('Day', {id}, true);
    let nextId = getNextTaskId(day.miscTasks);
    miscTask.id = nextId;
    day.miscTask.push(miscTask);
  });
};

const addTimeBasedTask = (id, tbTask) => {
  realm.write(() => {
    let day = realm.create('Day', {id}, true);
    let nextId = getNextTaskId(day.timeBasedTasks);
    tbTask.id = nextId;
    day.timeBasedTasks.push(tbTask);
  });
};

export default {
  addNewEmptyDayEntry,
  findDayByDate,
  saveBasicNotes,
  finishDay,
  addMiscTask,
  addTimeBasedTask,
};
