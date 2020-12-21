// import React, {Component} from 'react';
// import {View} from 'react-native';
// import Collapsible from 'react-native-collapsible';
// import Realm from 'realm';
// let realm;

// import CalendarButtonDropDown from '../components/CalendarButtonDropDown';
// import TimeBasedTaskSection from '../components/TimeBasedTaskSection';

// class DayScreen extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {currentDate: new Date()};

//     this.setCurrentDate = this.setCurrentDate.bind(this);
//   }

//   setCurrentDate(newDate) {
//     this.setState({currentDate: newDate});
//   }

//   render() {
//     return (
//       <View style={{flex: 1}}>
//         <CalendarButtonDropDown
//           currentDate={this.state.currentDate}
//           setCurrentDate={this.setCurrentDate}
//         />
//         <Collapsible>
//           <TimeBasedTaskSection />
//         </Collapsible>
//       </View>
//     );
//   }
// }

// export default DayScreen;

import React, {useState} from 'react';
import {View} from 'react-native';
import Collapsible from 'react-native-collapsible';

import CalendarButtonDropDown from '../components/CalendarButtonDropDown';
import TimeBasedTaskSection from '../components/TimeBasedTaskSection';

const DayScreen = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  return (
    <View style={{flex: 1}}>
      <CalendarButtonDropDown
        currentDate={currentDate}
        setCurrentDate={setCurrentDate}
      />
      <Collapsible>
        <TimeBasedTaskSection />
      </Collapsible>
    </View>
  );
};

export default DayScreen;
