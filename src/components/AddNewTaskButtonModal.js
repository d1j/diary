import React, {useState} from 'react';
import {View, Text, Button, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';

import TaskEditWindow from './TaskEditWindow';

export default function AddNewTaskButtonModal(props) {
  const [isModalVisible, setisModalVisible] = useState(false);
  const toggleModal = () => {
    setisModalVisible(!isModalVisible);
  };
  return (
    <View>
    <TouchableOpacity onPress={toggleModal} style={{position:'absolute',
      zIndex:11,
      right:20,
      bottom:40,
      backgroundColor:'#E91E63',
      width:90,
      height:90,
      borderRadius:50,
      alignItems:'center',
      justifyContent:'center',
      elevation: 2,
    }}><Text>Hello</Text>
      <Modal
        style={{
          backgroundColor: 'yellow',
          flex: 1, margin: 0,marginTop:180, paddingTop:0, borderTopRightRadius:30, borderTopLeftRadius:30,
        }}
        isVisible={isModalVisible}
        swipeDirection="down"
        onSwipeComplete={toggleModal}
        onBackdropPress={() => setisModalVisible(false)}
        onBackButtonPress={() => setisModalVisible(false)}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        backdropTransitionInTiming={1000}>
        <TaskEditWindow
          currentDate={props.currentDate}
          setData={props.setData}
          toggleModal={toggleModal}
        />
      </Modal>
    </TouchableOpacity>
    </View>
  );
}
