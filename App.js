import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import DayScreen from './src/containers/DayScreen';
import MonthScreen from './src/containers/MonthScreen';
import StatsScreen from './src/containers/StatsScreen';
import {View} from 'react-native';
import {Button} from 'react-native';

import realm from './schemas/realm';

const test = false;
const yeetDb = () => {
  console.log('Dev: Data deleted');
  Realm.deleteFile(realm);
};

const Tab = createBottomTabNavigator();
export default function App() {
  if (test) {
    return (
      <View>
        <Button title="yeet DB" onPress={yeetDb}></Button>
      </View>
    );
  } else {
    return (
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({route}) => ({
            tabBarIcon: ({focused, color, size}) => {
              let iconName;

              if (route.name === 'Day') {
                iconName = focused ? 'briefcase' : 'briefcase-outline';
              } else if (route.name === 'Stats') {
                iconName = focused ? 'stats-chart' : 'stats-chart-outline';
              } else if (route.name === 'Month') {
                iconName = focused ? 'bar-chart' : 'bar-chart-outline';
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
            //showLabel: false,
          }}>
          <Tab.Screen name="Day" component={DayScreen} />
          <Tab.Screen name="Month" component={MonthScreen} />
          <Tab.Screen name="Stats" component={StatsScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}
