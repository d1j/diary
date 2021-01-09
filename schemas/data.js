const currentDate = new Date();

const timeBasedTasks = [
  {
    id: 999,
    date: new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate(),
      0,
      0,
      0,
      0,
    ),
    start: new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate(),
      12,
      30,
      0,
      0,
    ),
    end: new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate(),
      13,
      30,
      0,
      0,
    ),
    taskName: 'Write down some test data',
    description: 'test descrition',
    isDone: false,
    isDeleted: false,
  },
  {
    id: 1000,
    date: new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate(),
      0,
      0,
      0,
      0,
    ),
    start: new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate(),
      14,
      30,
      0,
      0,
    ),
    end: new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate(),
      16,
      30,
      0,
      0,
    ),
    description: null,
    taskName: 'Read a book',
    isDone: false,
    isDeleted: false,
  },
  {
    id: 1001,
    date: new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() - 1,
      0,
      0,
      0,
      0,
    ),
    start: new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() - 1,
      14,
      30,
      0,
      0,
    ),
    end: new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() - 1,
      16,
      30,
      0,
      0,
    ),
    description: null,
    taskName: 'Read a book',
    isDone: false,
    isDeleted: false,
  },
];
const miscTasks = [
  {
    id: 999,
    date: new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate(),
      0,
      0,
      0,
      0,
    ),
    taskName: 'Clean up',
    description: 'test description',
    isDone: true,
    isDeleted: false,
  },
  {
    id: 1000,
    date: new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() - 1,
      0,
      0,
      0,
      0,
    ),
    taskName: 'Brush your teeth',
    description: null,
    isDone: false,
    isDeleted: false,
  },
];

const days = [
  {
    id: 999,
    date: new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate(),
      0,
      0,
      0,
      0,
    ),
    basicNotes: 'today was a good day',
    isFinished: true,
  },
  {
    id: 1000,
    date: new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() - 1,
      0,
      0,
      0,
      0,
    ),
    basicNotes: 'today was a normal day',
    isFinished: false,
  },
];

const monthStats = [
  /**TODO */
];

module.exports = {timeBasedTasks, miscTasks, days, monthStats};
