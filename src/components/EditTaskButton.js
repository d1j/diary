import React, {useState} from 'react';
import {View, Button} from 'react-native';
import Modal from 'react-native-modal';
import DateTimePicker from '@react-native-community/datetimepicker';

const EditTaskButton = (props) => {
  const [isModalActive, setIsModalActive] = useState(false);
  const [currentDate, setCurrentDate] = useState(props.currentDate);

  const toggleModal = () => {
    setIsModalActive(!isModalActive);
  };

  return (
    <View style={{backgroundColor: 'white'}}>
      <Button title="Add new Task" onPress={toggleModal}></Button>
      <Modal
        style={{margin: 0}}
        isVisible={isModalActive}
        onBackdropPress={() => setIsModalActive(false)}
        onBackButtonPress={() => setIsModalActive(false)}
        animationIn="slideInDown"
        animationOut="slideOutUp">
        <View>
          <DateTimePicker
            value={currentDate}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={({date}) => {
              setCurrentDate(date);
            }}
          />
        </View>
      </Modal>
    </View>
  );
};

export default EditTaskButton;
