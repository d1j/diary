import Realm from 'realm';

class TimeBasedTask extends Realm.Object {}
TimeBasedTask.schema = {
  name: 'TimeBasedTask',
  primaryKey: 'id',
  properties: {
    id: {type: 'int'},
    date: {type: 'date'},
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
  primaryKey: 'id',
  properties: {
    id: {type: 'int'},
    date: {type: 'date'},
    taskName: {type: 'string'},
    description: {type: 'string', optional: true},
    isDone: {type: 'bool', default: false},
    isDeleted: {type: 'bool', default: false},
  },
};

class DayStats extends Realm.Object {}
DayStats.schema = {
  name: 'DayStats',
  primaryKey: 'id',
  properties: {
    id: {type: 'int'},
    date: {type: 'date'},
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
    date: {type: 'date'},
    basicNotes: {type: 'string', optional: true},
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
  primaryKey: 'id',
  properties: {
    id: {type: 'int'},
    year: {type: 'int'},
    month: {type: 'int', min: 0, max: 11},
    days: {type: 'list', objectType: 'MonthDayStats'},
    averageSleepTime: {type: 'int'},
    averageMood: {type: 'float', min: 1, max: 5},
    averageMenergy: {type: 'float', min: 1, max: 5},
    averageMmotivation: {type: 'float', min: 1, max: 5},
  },
};

export default new Realm({
  schema: [TimeBasedTask, MiscTask, Day, DayStats, MonthDayStats, MonthStats],
  deleteRealmIfMigrationNeeded: true, //TODO: remove in prod
});
