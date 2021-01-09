import React, {useState} from 'react';
import {View} from 'react-native';
import {Button} from 'react-native-elements';
import {CalendarList} from 'react-native-calendars';
import Modal from 'react-native-modal';

const formatDate = require('../helper_funcs/func').formatDateWithDashes;

//TODO: display marked dates

/**Required props:
 * currentDate (new Date())
 * setCurrentDate (function)
 */
export default function CalendarButtonModal(props) {
  const [isModalVisible, setModalVisible] = useState(false);
  const [markedDates, setMarkedDate] = useState({
    //['2020-11-04']: {
    [formatDate(new Date())]: {
      marked: true,
    },
  });

  const changeMarkedDate = (newDate) => {
    setMarkedDate({
      [formatDate(newDate)]: {
        marked: true,
      },
    });
  };

  const addMarkedDate = (newDate) => {
    setMarkedDate({
      ...markedDates,
      [formatDate(newDate)]: {
        marked: true,
      },
    });
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  return (
    <View>
      <Button
        titleStyle={{fontSize: 24}}
        title={props.currentDate.toDateString()}
        onPress={toggleModal}
      />
      <Modal
        style={{margin: 0, position: 'absolute'}}
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
        onBackButtonPress={() => setModalVisible(false)}
        animationIn="slideInDown"
        animationOut="slideOutUp">
        <CalendarList
          style={{
            borderWidth: 1,
            borderColor: 'gray',
          }}
          current={props.currentDate}
          horizontal={true}
          pagingEnabled={true}
          markedDates={markedDates}
          onDayPress={(day) => {
            props.setCurrentDate(new Date(day.timestamp));
            changeMarkedDate(new Date(day.timestamp));
            toggleModal();
          }}></CalendarList>
      </Modal>
    </View>
  );
}
