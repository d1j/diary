// new Date(year, month, day, hours, minutes, seconds, milliseconds);
const timeBasedTasks = [
  {
    id: 1,
    start: new Date(2020, 11, 22, 12, 30, 0, 0),
    end: new Date(2020, 11, 22, 13, 30, 0, 0),
    taskName: 'Write down some test data',
    description: 'test descrition',
    isDone: false,
    isDeleted: false,
  },
  {
    id: 2,
    start: new Date(2020, 11, 22, 14, 30, 0, 0),
    end: new Date(2020, 11, 22, 16, 30, 0, 0),
    description: undefined,
    taskName: 'Read a book',
    isDone: false,
    isDeleted: false,
  },
  {
    id: 3,
    start: new Date(2020, 11, 23, 14, 30, 0, 0),
    end: new Date(2020, 11, 23, 16, 30, 0, 0),
    description: undefined,
    taskName: 'Read a book',
    isDone: false,
    isDeleted: false,
  },
];
const miscTasks = [
  {
    id: 1,
    taskName: 'Clean up',
    description: 'test description',
    isDone: true,
    isDeleted: false,
  },
  {
    id: 2,
    taskName: 'Brush your teeth',
    description: undefined,
    isDone: false,
    isDeleted: false,
  },
];

const days = [
  {
    id: 20,
    day: 22,
    month: 11,
    year: 2020,
    timeBasedTasks: [],
    miscTasks: [],
    basicNotes: 'today was a good day',
    stats: {
      mood: 5,
      energy: 5,
      motivation: 5,
      wokeUp: new Date(2020, 11, 22, 8, 0, 0, 0),
      wentToSleep: new Date(2020, 11, 22, 23, 0, 0, 0),
      sleepTime: 32400000,
    },
    isFinished: true,
  },
  {
    id: 21,
    day: 23,
    month: 11,
    year: 2020,
    timeBasedTasks: [],
    miscTasks: [],
    basicNotes: 'today was a normal day',
    stats: {
      mood: 3,
      energy: 2,
      motivation: 3,
      wokeUp: new Date(2020, 11, 23, 8, 0, 0, 0),
      wentToSleep: new Date(2020, 11, 23, 22, 0, 0, 0),
      sleepTime: 32400000,
    },
    isFinished: false,
  },
];

const months = [];

module.exports = {timeBasedTasks, miscTasks, days, months};
