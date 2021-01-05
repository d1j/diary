import React from 'react';
import {View} from 'react-native';
import Modal from 'react-native-modal';

import TaskEditWindow from './TaskEditWindow';

export default function EditTaskModal(props) {
  return (
    <Modal
      style={{
        backgroundColor: 'white',
        flex: 1,
        margin: 0,
        marginTop: 120,
        paddingTop: 0,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
      }}
      isVisible={props.isVisible}
      avoidKeyboard={false}
      swipeDirection="down"
      onSwipeComplete={props.toggleModal}
      onBackButtonPress={props.toggleModal}
      onBackdropPress={props.toggleModal}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      backdropTransitionInTiming={1000}>
      <TaskEditWindow
        setData={props.setData}
        data={props.data}
        toggleModal={props.toggleModal}
      />
    </Modal>
  );
}
