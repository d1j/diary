import React, {useState} from 'react';
import {View, Button} from 'react-native';
import Modal from 'react-native-modal';

import TaskEditWindow from './TaskEditWindow';

export default function EditTaskButtonModal(props) {
  const [isModalVisible, setisModalVisible] = useState(false);
  const toggleModal = () => {
    setisModalVisible(!isModalVisible);
  };
  return (
    <View>
      <Button title="Edit a task" onPress={toggleModal} />
      <Modal
        style={{backgroundColor: 'white', flex: 1}}
        isVisible={isModalVisible}
        onBackdropPress={() => setisModalVisible(false)}
        onBackButtonPress={() => setisModalVisible(false)}
        animationIn="slideInDown"
        animationOut="slideOutUp">
        <TaskEditWindow
          setData={props.setData}
          data={props.data}
          toggleModal={toggleModal}
        />
      </Modal>
    </View>
  );
}
