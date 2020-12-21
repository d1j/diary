const TimeBasedTaskSchema = {
  name: 'TimeBasedTask',
  properties: {
    start: {type: 'date'},
    end: {type: 'date'},
    taskName: {type: 'string'},
    description: {type: 'string'},
    isDone: {type: 'bool'},
    isDeleted: {type: 'bool'},
  },
};

const MiscTaskSchema = {
  name: 'MiscTask',
  properties: {
    taskName: {type: 'string'},
    description: {type: 'string', optional: true},
    isDone: {type: 'bool'},
    isDeleted: {type: 'bool'},
  },
};

const DaySchema = {
  name: 'Day',
  properties: {
    day: {type: 'int'},
    month: {type: 'int'},
    year: {type: 'int'},
    timeBasedTasks: {type: 'TimeBasedTask[]'},
    miscTasks: {type: 'MiscTask[]'},
    basicNotes: {type: 'string'},
    stats: {
      mood: {type: 'float', min: 1, max: 5},
      energy: {type: 'float', min: 1, max: 5},
      motivation: {type: 'float', min: 1, max: 5},
      wentToSleep: {type: 'date'},
      wokeUp: {type: 'date'},
      sleepTime: {type: 'int'},
    },
    isFinished: {type: 'bool'},
  },
};

const DayStatsSchema = {
  name: 'DayStats',
  embedded: true,
  properties: {
    dayOfTheMonth: {type: 'int'},
    averageMem: {type: 'float'},
  },
};

const MonthSchema = {
  name: 'Month',
  properties: {
    year: {type: 'int'},
    month: {type: 'int', min: 1, max: 12},
    days: {type: 'Day[]'},
    stats: {
      days: {type: 'list', objectType: 'DayStats'},
      averageSleepTime: {type: 'int'},
      averageMood: {type: 'float', min: 1, max: 5},
      averageMenergy: {type: 'float', min: 1, max: 5},
      averageMmotivation: {type: 'float', min: 1, max: 5},
    },
  },
};

module.exports = [
  TimeBasedTaskSchema,
  MiscTaskSchema,
  DaySchema,
  DayStatsSchema,
  MonthSchema,
];
