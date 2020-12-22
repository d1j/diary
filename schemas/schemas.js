const TimeBasedTaskSchema = {
  name: 'TimeBasedTask',
  embedded: true,
  properties: {
    start: {type: 'date'},
    end: {type: 'date'},
    taskName: {type: 'string'},
    description: {type: 'string', optional: true},
    isDone: {type: 'bool', default: false},
    isDeleted: {type: 'bool', default: false},
  },
};

const MiscTaskSchema = {
  name: 'MiscTask',
  embedded: true,
  properties: {
    taskName: {type: 'string'},
    description: {type: 'string', optional: true},
    isDone: {type: 'bool', default: false},
    isDeleted: {type: 'bool', default: false},
  },
};

const DayStatsSchema = {
  name: 'DayStats',
  embedded: true,
  properties: {
    mood: {type: 'float', min: 1, max: 5, optional: true},
    energy: {type: 'float', min: 1, max: 5, optional: true},
    motivation: {type: 'float', min: 1, max: 5, optional: true},
    wokeUp: {type: 'date', optional: true},
    wentToSleep: {type: 'date', optional: true},
    sleepTime: {type: 'int', optional: true},
  },
};

const DaySchema = {
  name: 'Day',
  properties: {
    day: {type: 'int'},
    month: {type: 'int'},
    year: {type: 'int'},
    timeBasedTasks: {type: 'list', objectType: 'TimeBasedTask'},
    miscTasks: {type: 'list', objectType: 'MiscTask'},
    basicNotes: {type: 'string', optional: true},
    stats: {type: 'DayStats'},
    isFinished: {type: 'bool', default: false},
  },
};

const MonthDayStatsSchema = {
  name: 'MonthDayStats',
  embedded: true,
  properties: {
    dayOfTheMonth: {type: 'int'},
    averageMem: {type: 'float'},
  },
};

const MonthStatsSchema = {
  name: 'MonthStats',
  embedded: true,
  properties: {
    days: {type: 'list', objectType: 'MonthDayStats'},
    averageSleepTime: {type: 'int'},
    averageMood: {type: 'float', min: 1, max: 5},
    averageMenergy: {type: 'float', min: 1, max: 5},
    averageMmotivation: {type: 'float', min: 1, max: 5},
  },
};

const MonthSchema = {
  name: 'Month',
  properties: {
    year: {type: 'int'},
    month: {type: 'int', min: 0, max: 11}, //!!!
    days: {type: 'list', objectType: 'Day'},
    stats: {type: 'MonthStats'},
  },
};

module.exports = [
  TimeBasedTaskSchema,
  MiscTaskSchema,
  DaySchema,
  DayStatsSchema,
  MonthDayStatsSchema,
  MonthStatsSchema,
  MonthSchema,
];
