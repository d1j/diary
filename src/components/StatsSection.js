import React, {Component} from 'react';
import {TouchableOpacity, Text} from 'react-native';
import Modal from 'react-native-modal';

import EditStatsModal from './EditStatsModal';

const formatHoursMinutes = require('../helper_funcs/func').formatHoursMinutes;
const formatDateWithDashes = require('../helper_funcs/func')
  .formatDateWithDashes;

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
        <Text>
          Woke up: {formatDateWithDashes(this.props.stats.wokeUp)}
          {'   '}
          {formatHoursMinutes(this.props.stats.wokeUp)}
        </Text>
        <Text>
          Went to sleep: {formatDateWithDashes(this.props.stats.wentToSleep)}
          {'   '} {formatHoursMinutes(this.props.stats.wentToSleep)}
        </Text>
        <Text>Sleep time: {'//TODO'}</Text>
        <Text>{'\n'}^Long-press to edit stats^</Text>
      </TouchableOpacity>
    );
  }
}
