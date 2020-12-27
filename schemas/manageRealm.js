import realm from './realm';

const realmFilters = {
  dayMonthYear: (date) => {
    return `day = ${date.getDate()} AND month = ${date.getMonth()} AND year = ${date.getFullYear()}`;
  },
};

const addNewEmptyDayEntry = (date) => {
  let newDayData = {
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

export default {addNewEmptyDayEntry, findDayByDate};
