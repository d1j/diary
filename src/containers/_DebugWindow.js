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
        /**
         * https://realm.io/docs/javascript/latest/#writes
         * https://stackoverflow.com/questions/38214973/how-to-add-a-nested-list-of-objects-in-realm-error-js-value-must-be-of-type-o
         */
        //First Main document
        let day = realm.create('Day', _data.days[0]);
        //Embeded documents
        //Time based tasks
        day.timeBasedTasks.push(_data.timeBasedTasks[0]);
        day.timeBasedTasks.push(_data.timeBasedTasks[1]);
        //Misc tasks
        _data.miscTasks.forEach((obj) => {
          day.miscTasks.push(obj);
        });

        //Second document
        day = realm.create('Day', _data.days[1]);
        day.timeBasedTasks.push(_data.timeBasedTasks[2]);
        _data.miscTasks.forEach((obj) => {
          day.miscTasks.push(obj);
        });
      });
    } catch (err) {
      console.log(err);
      realm.close();
    }
  }

  _showData() {
    let days = realm.objects('Day');
    console.log(JSON.stringify(days, null, 2));
  }

  _deleteData() {
    Realm.deleteFile(realm);
  }
  render() {
    return (
      <View>
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
