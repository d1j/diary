import React, {Component} from 'react';
import {Button, View} from 'react-native';
import realm from '../../schemas/realm';

const _data = require('../../schemas/data');

export default class _DebugWindow extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this._generateData = this._generateData.bind(this);
    this._showData = this._showData.bind(this);
    this._deleteData = this._deleteData.bind(this);
  }

  _generateData() {
    try {
      realm.write(() => {
        //Generate days
        _data.days.forEach((day) => {
          realm.create('Day', day);
        });

        //Generate time based tasks
        _data.timeBasedTasks.forEach((task) => {
          realm.create('TimeBasedTask', task);
        });

        //Generate misc tasks
        _data.miscTasks.forEach((task) => {
          realm.create('MiscTask', task);
        });

        console.log('Dev: Data generated');
      });
    } catch (err) {
      console.log(err);
      realm.close();
    }
  }

  _showData() {
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
        <Button
          onPress={() => {
            this._generateData();
          }}
          title="Generate data"></Button>
        <Button
          onPress={() => {
            this._showData();
          }}
          title="Show data"></Button>
        <Button
          onPress={() => {
            this._deleteData();
          }}
          title="Delete data"></Button>
      </View>
    );
  }
}
