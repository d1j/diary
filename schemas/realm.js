import Realm from 'realm';

class TimeBasedTask extends Realm.Object {}
TimeBasedTask.schema = {
  name: 'TimeBasedTask',
  embedded: true,
  properties: {
    id: {type: 'int'},
    start: {type: 'date'},
    end: {type: 'date'},
    taskName: {type: 'string'},
    description: {type: 'string', optional: true},
    isDone: {type: 'bool', default: false},
    isDeleted: {type: 'bool', default: false},
  },
};

class MiscTask extends Realm.Object {}
MiscTask.schema = {
  name: 'MiscTask',
  embedded: true,
  properties: {
    id: {type: 'int'},
    taskName: {type: 'string'},
    description: {type: 'string', optional: true},
    isDone: {type: 'bool', default: false},
    isDeleted: {type: 'bool', default: false},
  },
};

class DayStats extends Realm.Object {}
DayStats.schema = {
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

class Day extends Realm.Object {}
Day.schema = {
  name: 'Day',
  primaryKey: 'id',
  properties: {
    id: {type: 'int'},
    day: {type: 'int', min: 1, max: 31},
    month: {type: 'int', min: 0, max: 11}, //!!!
    year: {type: 'int'},
    timeBasedTasks: {type: 'list', objectType: 'TimeBasedTask'},
    miscTasks: {type: 'list', objectType: 'MiscTask'},
    basicNotes: {type: 'string', optional: true},
    stats: {type: 'DayStats'},
    isFinished: {type: 'bool', default: false},
  },
};

class MonthDayStats extends Realm.Object {}
MonthDayStats.schema = {
  name: 'MonthDayStats',
  embedded: true,
  properties: {
    dayOfTheMonth: {type: 'int'},
    averageMem: {type: 'float'},
  },
};

class MonthStats extends Realm.Object {}
MonthStats.schema = {
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

class Month extends Realm.Object {}
Month.schema = {
  name: 'Month',
  primaryKey: 'id',
  properties: {
    id: {type: 'int'},
    year: {type: 'int'},
    month: {type: 'int', min: 0, max: 11}, //!!!
    days: {type: 'list', objectType: 'Day'},
    stats: {type: 'MonthStats'},
  },
};

export default new Realm({
  schema: [
    TimeBasedTask,
    MiscTask,
    Day,
    DayStats,
    MonthDayStats,
    MonthStats,
    Month,
  ],
  deleteRealmIfMigrationNeeded: true,
});
