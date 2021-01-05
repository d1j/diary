import React, {Component} from 'react';
import Modal from 'react-native-modal';
import {TouchableOpacity, Text} from 'react-native';

import EditStatsModal from './EditStatsModal';

const formatHoursMinutes = require('../../helper_funcs/func')
  .formatHoursMinutes;

/**{
    "id": 2,
    "date": "2021-01-01T00:00:00.000Z",
    "mood": null,
    "energy": null,
    "motivation": null,
    "wokeUp": null,
    "wentToSleep": null,
    "sleepTime": null
  }
 */

export default class StatsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {isModalVisible: false};
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal() {
    this.setState({isModalVisible: !this.state.isModalVisible});
  }

  render() {
    return (
      <TouchableOpacity onLongPress={this.toggleModal}>
        <Modal
          isVisible={this.state.isModalVisible}
          onBackdropPress={this.toggleModal}
          onBackButtonPress={this.toggleModal}
          animationIn="slideInDown"
          animationOut="slideOutUp">
          <EditStatsModal
            currentDate={this.props.currentDate}
            toggleModal={this.toggleModal}
            stats={this.props.stats}
            setStats={this.props.setStats}
          />
        </Modal>
        <Text>Mood: {this.props.stats.mood}</Text>
        <Text>Energy: {this.props.stats.energy}</Text>
        <Text>Motivation: {this.props.stats.motivation}</Text>
        <Text>Woke up: {formatHoursMinutes(this.props.stats.wokeUp)}</Text>
        <Text>
          Went to sleep: {formatHoursMinutes(this.props.stats.wentToSleep)}
        </Text>
        <Text>
          Sleep time: {this.props.stats.sleepTime || 'to be calculated'}
        </Text>
      </TouchableOpacity>
    );
  }
}
