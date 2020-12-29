import React, {useState} from 'react';
import {View, Button} from 'react-native';
import {CalendarList} from 'react-native-calendars';
import Modal from 'react-native-modal';

//Takes in Date object and returns the date in the following format `2022-12-29`;
function toHumanDateFormat(date) {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${
    date.getDate() / 10 < 1 ? '0' + date.getDate() : date.getDate()
  }`;
}

//TODO: marked dates

export default function CalendarButtonModal(props) {
  const [isModalVisible, setModalVisible] = useState(false);
  const [markedDates, setMarkedDate] = useState({
    //['2020-11-04']: {
    [toHumanDateFormat(new Date())]: {
      marked: true,
    },
  });

  const changeMarkedDate = (newDate) => {
    setMarkedDate({
      [toHumanDateFormat(newDate)]: {
        marked: true,
      },
    });
  };

  const addMarkedDate = (newDate) => {
    setMarkedDate({
      ...markedDates,
      [toHumanDateFormat(newDate)]: {
        marked: true,
      },
    });
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  return (
    <View>
      <Button title={props.currentDate.toDateString()} onPress={toggleModal} />
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
