import React from 'react';
import {View} from 'react-native';
import Modal from 'react-native-modal';

import TaskEditWindow from './TaskEditWindow';

export default function TaskEditModal(props) {
  return (
    <Modal
      style={{backgroundColor: 'white', flex: 1}}
      isVisible={props.isVisible}
      onBackdropPress={props.toggleModal}
      onBackButtonPress={props.toggleModal}
      animationIn="slideInDown"
      animationOut="slideOutUp">
      <TaskEditWindow
        setData={props.setData}
        data={props.data}
        toggleModal={props.toggleModal}
      />
    </Modal>
  );
}
