import React, {Component} from 'react';
import {TextInput, TouchableOpacity, Button, View} from 'react-native';

export default class NotesSection extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <View>
        <TextInput
          onChange={(e) => {
            this.props.saveNewNotes(e.nativeEvent.text);
          }}
          onEndEditing={() => {
            this.props.saveNotesToDb();
          }}
          multiline={true}
          placeholder="Text before input"
          style={{paddingLeft:10, paddingRight:10}}
          value={this.props.notesData}></TextInput>
      </View>
    );
  }
}
