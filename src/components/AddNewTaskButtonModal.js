import React, {useState} from 'react';
import {View, Button} from 'react-native';
import Modal from 'react-native-modal';

import TaskEditWindow from './TaskEditWindow';

/**Required props:
 * currentDate (new Date())
 * setData (function)
 */
export default function AddNewTaskButtonModal(props) {
  const [isModalVisible, setisModalVisible] = useState(false);
  const toggleModal = () => {
    setisModalVisible(!isModalVisible);
  };
  return (
    <View>
      <Button title="Add new task" onPress={toggleModal} />
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setisModalVisible(false)}
        onBackButtonPress={() => setisModalVisible(false)}
        animationIn="slideInDown"
        animationOut="slideOutUp">
        <TaskEditWindow
          currentDate={props.currentDate}
          setData={props.setData}
          toggleModal={toggleModal}
        />
      </Modal>
    </View>
  );
}
