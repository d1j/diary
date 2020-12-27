# Ka mes naudojom

* Overlap langas: https://github.com/react-native-modal/react-native-modal
* Kalendorius: https://github.com/wix/react-native-calendars
* Tab based navigation: https://reactnavigation.org/docs/tab-based-navigation/
* Ikonos: https://github.com/oblador/react-native-vector-icons (https://ionicons.com/)
  * Ikonu lib'a reikejo sulink'int https://reactnative.dev/docs/linking-libraries-ios
* Collapse: https://github.com/oblador/react-native-collapsible

# Components

* `CallendarButtonDropDown` (works as a button; expands to a calendar Window)
  * Overlapping window where you can specify which day/month/year to go to.
* `TaskSection` Time based task section
  * List of `Task`s
  * **(Depends on a design)** Single task should function as a button. Whenever it is long-pressed, the Edit task component opens and you can edit the name, delete or mark the task as done. There is a “complete the task” bubble. Once you click on it, the task is greyed out and you can delete it by clicking on the “X” button.
* `TaskSection` Misc task section.
* `NotesSection` Basic notes
* `StatsSection` Stats Window (after day is finished) contains the following: 
  * Time I WentToSleep;
  * Time I woke up;
  * Mood scale
  * Energy level scale
  * Motivation level scale
* Finish day button
* Add new task button
* Edit Task component
* Edit Stats component



# Realm

*.realm files are located at
`/data/data/com.projektelis/files/default.realm`

# adb

Cheatsheet: https://www.automatetheplanet.com/adb-cheat-sheet/
`adb root` `adb unroot`

`adb pull /data/data/com.projektelis/files/default.realm ./realmdata`

`cd /data/data/com.projektelis/files`

# react native snippets

`rconst` - constructor with state
`rnc` - react native class

# pakalbeti apie:

# random

