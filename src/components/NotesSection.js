import React from 'react';
import {TextInput, View} from 'react-native';

export default function NotesSection(props) {
  return (
    <View>
      <TextInput
        onChange={(e) => {
          props.saveNewNotes(e.nativeEvent.text);
        }}
        onEndEditing={() => {
          props.saveNotesToDb();
        }}
        multiline={true}
        placeholder="Text before input"
        value={props.notesData}></TextInput>
    </View>
  );
}
