import * as React from 'react';
import {useState} from 'react';
import {Text, View, Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {CalendarList} from 'react-native-calendars';
import Modal from 'react-native-modal';

function DayScreen() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={{flex: 1}}>
      <Button title={currentDate.toDateString()} onPress={toggleModal} />
      <Modal
        style={{margin: 0}}
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
        onBackButtonPress={() => setModalVisible(false)}
        animationIn="slideInDown"
        animationOut="slideOutUp">
        <CalendarList
          style={{
            borderWidth: 1,
            borderColor: 'gray',
          }}
          horizontal={true}
          pagingEnabled={true}
          onDayPress={(day) => {
            console.log('selected day', day);
          }}></CalendarList>
      </Modal>
    </View>
  );
}

function StatsScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Stats!</Text>
    </View>
  );
}

function MonthScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Month!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
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
