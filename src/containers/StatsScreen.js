import React, {Component} from 'react';
import {ScrollView, Text, Dimensions, View} from 'react-native';
import {LineChart, ProgressChart} from 'react-native-chart-kit';

import db from '../../schemas/manageRealm';

//const data = db._getDecemberStats();

// const data = {
//   labels: ['January', 'February', 'March', 'April', 'May', 'June'],
//   datasets: [
//     {
//       data: [20, 45, 28, 80, 99, 43],
//     },
//   ],
// };

// const data = {
//   datasets: {
//     data: [
//       10,
//       13,
//       11,
//       11,
//       11,
//       9,
//       10,
//       11,
//       12,
//       9,
//       10,
//       12,
//       12,
//       9,
//       10,
//       10,
//       10,
//       10,
//       11,
//       10,
//       11,
//       11,
//       10,
//       10,
//       11,
//       12,
//       13,
//       13,
//       12,
//       12,
//       13,
//     ],
//   },
//   labels: [
//     '2020-12-01',
//     '2020-12-02',
//     '2020-12-03',
//     '2020-12-04',
//     '2020-12-05',
//     '2020-12-06',
//     '2020-12-07',
//     '2020-12-08',
//     '2020-12-09',
//     '2020-12-10',
//     '2020-12-11',
//     '2020-12-12',
//     '2020-12-13',
//     '2020-12-14',
//     '2020-12-15',
//     '2020-12-16',
//     '2020-12-17',
//     '2020-12-18',
//     '2020-12-19',
//     '2020-12-20',
//     '2020-12-21',
//     '2020-12-22',
//     '2020-12-23',
//     '2020-12-24',
//     '2020-12-25',
//     '2020-12-26',
//     '2020-12-27',
//     '2020-12-28',
//     '2020-12-29',
//     '2020-12-30',
//     '2020-12-31',
//   ],
// };

export default class StatsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sleepData: db._getDecemberStats(),
      chartConfig: {
        backgroundGradientFrom: '#1E2923',
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: '#08130D',
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false, // optional
      },
    };
    console.log(this.state.sleepData);
  }

  render() {
    return (
      <View>
        <LineChart
          data={this.state.sleepData}
          width={Dimensions.get('window').width}
          height={220}
          chartConfig={this.state.chartConfig}
          bezier
        />
      </View>
    );
  }
}
