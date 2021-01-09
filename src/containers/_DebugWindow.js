import React, {Component} from 'react';
import {Button, View, Text} from 'react-native';

import realm from '../../schemas/realm';

const _data = require('../../schemas/data');

export default class _DebugWindow extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this._generateData = this._generateData.bind(this);
    this._displayData = this._displayData.bind(this);
    this._deleteData = this._deleteData.bind(this);
  }

  /**Function will add Day, TimeBasedTask and MiscTask entries to the Realm database.
   * Those entries can be located at the current date screen `new Date()` and a day before.
   */
  _generateData() {
    try {
      realm.write(() => {
        //Generate days
        _data.days.forEach((day) => {
          realm.create('Day', day);
        });
        console.log('Dev: Day data generated');

        //Generate time based tasks
        _data.timeBasedTasks.forEach((task) => {
          realm.create('TimeBasedTask', task);
        });
        console.log('Dev: Time-based task data generated.');

        //Generate misc tasks
        _data.miscTasks.forEach((task) => {
          realm.create('MiscTask', task);
        });
        console.log('Dev: Misc task data generated');
      });
    } catch (err) {
      console.log(err);
      realm.close();
    }
  }

  _displayData() {
    console.log('Dev: Displaying data');

    let days = realm.objects('Day');
    console.log('Dev: Days:');
    console.log(JSON.stringify(days, null, 2));

    let stats = realm.objects('DayStats');
    console.log('Dev: DayStats:');
    console.log(JSON.stringify(stats, null, 2));

    let tbTasks = realm.objects('TimeBasedTask');
    console.log('Dev: TimeBasedTasks:');
    console.log(JSON.stringify(tbTasks, null, 2));

    let miscTasks = realm.objects('MiscTask');
    console.log('Dev: MiscTasks:');
    console.log(JSON.stringify(miscTasks, null, 2));
  }

  _deleteData() {
    console.log('Dev: Data deleted');
    Realm.deleteFile(realm);
  }
  render() {
    return (
      <View style={{borderWidth: 4, borderColor: 'red', marginTop: 20}}>
        <Text>Dev tools</Text>
        <Button
          onPress={() => {
            this._generateData();
          }}
          title="Generate data"></Button>
        <Button
          onPress={() => {
            this._displayData();
          }}
          title="Display data"></Button>
        <Button
          onPress={() => {
            this._deleteData();
          }}
          title="Delete data"></Button>
        <Text>(reload dev server after deleting data)</Text>
      </View>
    );
  }
}
