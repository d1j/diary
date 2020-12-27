import React, {Component} from 'react';
import {TextInput, View} from 'react-native';

export default class NotesSection extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <View>
        <TextInput
          onSubmitEditing={(e) => {
            this.props.saveNewNotes(e.nativeEvent.text);
          }}
          multiline={true}></TextInput>
      </View>
    );
  }
}
