import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import DayScreen from './src/containers/DayScreen';
import MonthScreen from './src/containers/MonthScreen';
import StatsScreen from './src/containers/StatsScreen';
import {View} from 'react-native';

const test = false;

const Tab = createBottomTabNavigator();
export default function App() {
  if (test) {
    return (
      <View>
        <Text>Test View</Text>
      </View>
    ); //TODO: Remove in prod
  } else {
    return (
      <NavigationContainer style={{flex: 1}}>
        <Tab.Navigator
          tabBarPosition={'bottom'}
          screenOptions={({route}) => ({
            tabBarIcon: ({focused, color, size}) => {
              let iconName;

              if (route.name === 'Day') {
                iconName = focused ? 'briefcase' : 'briefcase-outline';
              } else if (route.name === 'Stats') {
                iconName = focused ? 'stats-chart' : 'stats-chart-outline';
              } else if (route.name === 'Month') {
                iconName = focused ? 'calendar' : 'calendar-outline';
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: '#007AFF',
            inactiveTintColor: 'gray',
            keyboardHidesTabBar: true,
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
