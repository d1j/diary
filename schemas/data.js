// new Date(year, month, day, hours, minutes, seconds, milliseconds);
const timeBasedTasks = [
  {
    id: 1,
    date: new Date(2021, 0, 1, 0, 0, 0, 0),
    start: new Date(2021, 0, 1, 12, 30, 0, 0),
    end: new Date(2021, 0, 1, 13, 30, 0, 0),
    taskName: 'Write down some test data',
    description: 'test descrition',
    isDone: false,
    isDeleted: false,
  },
  {
    id: 2,
    date: new Date(2021, 0, 1, 0, 0, 0, 0),
    start: new Date(2021, 0, 1, 14, 30, 0, 0),
    end: new Date(2021, 0, 1, 16, 30, 0, 0),
    description: null,
    taskName: 'Read a book',
    isDone: false,
    isDeleted: false,
  },
  {
    id: 3,
    date: new Date(2021, 0, 3, 0, 0, 0, 0),
    start: new Date(2021, 0, 3, 14, 30, 0, 0),
    end: new Date(2021, 0, 3, 16, 30, 0, 0),
    description: null,
    taskName: 'Read a book',
    isDone: false,
    isDeleted: false,
  },
];
const miscTasks = [
  {
    id: 1,
    date: new Date(2021, 0, 1, 0, 0, 0, 0),
    taskName: 'Clean up',
    description: 'test description',
    isDone: true,
    isDeleted: false,
  },
  {
    id: 2,
    date: new Date(2021, 0, 3, 0, 0, 0, 0),
    taskName: 'Brush your teeth',
    description: null,
    isDone: false,
    isDeleted: false,
  },
];

const days = [
  {
    id: 20,
    date: new Date(2021, 0, 1, 0, 0, 0, 0),
    basicNotes: 'today was a good day',
    isFinished: true,
  },
  {
    id: 21,
    date: new Date(2021, 0, 3, 0, 0, 0, 0),
    basicNotes: 'today was a normal day',
    isFinished: false,
  },
];

const monthStats = [
  {
    id: 1,
    year: 2020,
    month: 11,
    days: [],
    averageSleepTime: null,
    averageMood: null,
    averageMenergy: null,
    averageMmotivation: null,
  },
];

const monthDayStats = [];

module.exports = {timeBasedTasks, miscTasks, days, monthStats};
