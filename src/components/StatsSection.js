import React, {Component} from 'react';
import {Text, View} from 'react-native';

export default class StatsSection extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <View>
        <Text>Day stats: {JSON.stringify(this.props.stats)}</Text>
      </View>
    );
  }
}
