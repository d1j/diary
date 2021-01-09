# Day task tracker
---
An application built to improve daily task organization and track personal statistics. 

## External components and resources

* `Modal`: https://github.com/react-native-modal/react-native-modal
* `CalendarList`: https://github.com/wix/react-native-calendars
* Tab based navigation: https://reactnavigation.org/docs/tab-based-navigation/
* Icons: https://github.com/oblador/react-native-vector-icons (https://ionicons.com/)
  * I had to link the lib: https://reactnative.dev/docs/linking-libraries-ios
* `Collapsible`: https://github.com/oblador/react-native-collapsible
* `DateTimePicker`: https://www.npmjs.com/package/@react-native-community/
* `AirBnbRating`: https://github.com/Monte9/react-native-ratings
  * We have encountered this issue with AirBnbRating: https://github.com/Monte9/react-native-ratings/issues/131

## Main application views

* `DayScreen`
  * Is used to view and organize daily tasks and statistics.
  * Can be used to write down some basic notes.
  * Can be used to check and edit information from the past and organize tasks for the upcoming days.
  * Has 4 main sections:
    * Time-based task section;
    * Miscellaneous (time-independent) task section.
    * Basic notes section.
    * Day stats section (is displayed after the day is finished)
* `MonthScreen` - TODO (monthly goals)
* `StatsScreen` - TODO (monthly statistics)

## Components

### DayScreen
---
* `CallendarButtonModal` 
  * Displays currently selected date.
  * Works as a button and toggles the` CalendarList` window when clicked.
  * `CalendarList` is used to switch between days in DayScreen view.
* `TaskSection`
  * Displays a list of `Task` components.
* `Task`
  * Displays information about a task.
  * Has Finish button which toggles `isDone` task status. 
  * Has Delete button which toggles `isDeleted` task status. 
  * Can be long-pressed to enter `TaskEditWindow`
* `TaskEditWindow`
  * Can be used to change and update task information.
  * Can be used to add a new task.
* `NotesSection` 
  * Can be used to write down some notes. Upon each edit, changes are written to the local DB.
* `StatsSection` 
  * Appears after the day is finished.
  * Contains the following information: 
    * Time I went to sleep;
    * Time I woke up;
    * Sleep time;
    * Mood scale;
    * Energy level scale;
    * Motivation level scale;
  * Can be long-pressed to enter `EditStatsWindow`.
* `EditStatsWindow`
  * Can be used to enter/update day statistics.
* Finish day button
  * Changes Day state from `isFinished: false` to `isFinished: true` 
* `AddNewTaskButtonModal`
  * Toggles `TaskEditWindow` and a new task can be added.
---

# Realm

A local NoSQL database is used to store user data. Realm can also be used to store and sync data in the cloud later on.

Realm data schemas are described in `./schemas/realm.js`.

**Useful dev info:** 
*.realm files are located at
`/data/data/com.projektelis/files/default.realm`

# adb

**Useful dev info:** 
Cheatsheet: https://www.automatetheplanet.com/adb-cheat-sheet/
`adb root` `adb unroot`

`adb pull /data/data/com.projektelis/files/default.realm ./realmdata`

`cd /data/data/com.projektelis/files`

# react native VSCODE snippets
https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets

`rconst` - constructor with state
`rnc` - react native class component
`rnf` - react native function component
`bnd` - method bind
`state` - this.state.
`sst` - this.setState({})