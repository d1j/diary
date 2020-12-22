import React, {Component} from 'react';
import {View, Button} from 'react-native';
import Collapsible from 'react-native-collapsible';
import Realm from 'realm';
let realm;

import CalendarButtonDropDown from '../components/CalendarButtonDropDown';
import TimeBasedTaskSection from '../components/TimeBasedTaskSection';

const RealmSchemas = require('../../schemas/schemas');
const _data = require('../../schemas/data');

export default class DayScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {currentDate: new Date()};

    this.setCurrentDate = this.setCurrentDate.bind(this);
    this._generateData = this._generateData.bind(this);
    this._showData = this._showData.bind(this);
    this._deleteData = this._deleteData.bind(this);
  }

  setCurrentDate(newDate) {
    this.setState({currentDate: newDate});
  }

  componentDidMount() {}

  _generateData() {
    Realm.open({schema: RealmSchemas})
      .then((realm) => {
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
      })
      .catch((error) => {
        console.log(error);
      });
  }

  _showData() {
    Realm.open({schema: RealmSchemas}).then((realm) => {
      let days = realm.objects('Day');
      console.log(JSON.stringify(days, null, 2));
    });
  }

  _deleteData() {
    Realm.deleteFile({schema: RealmSchemas});
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <CalendarButtonDropDown
          currentDate={this.state.currentDate}
          setCurrentDate={this.setCurrentDate}
        />
        <Collapsible>
          <TimeBasedTaskSection />
        </Collapsible>
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
