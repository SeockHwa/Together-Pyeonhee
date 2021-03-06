import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import SegmentedControlTab from 'react-native-segmented-control-tab';

import Daily from './HomeTabs/dailyScreen';
import Calendar from './HomeTabs/CalendarScreen';
import Transact from './HomeTabs/TransactionalInfoScreen';

const HomeScreen = ({navigation}) => {
  const [userID, setUserID] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(()=>{
    console.log('편히 렌더링');
    AsyncStorage.getItem('userID', (err, result) => {
      const tempID = result;
      if(tempID!= null){
        setUserID(tempID);
      }
    });
  })

  const handleSingleIndexSelect = (index) => {
    setSelectedIndex(index);
  };

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.smallcontainer}>

            {selectedIndex === 0 && <Daily cState={selectedIndex} navigation={navigation}/>}
            {selectedIndex === 1 && <Calendar cState={selectedIndex} navigation={navigation}/>}
            {selectedIndex === 2 && <Transact cState={selectedIndex} navigation={navigation}/>}
        
            <View style={styles.tapContainer}>
                <SegmentedControlTab
                    values={['데일리', '달력', '거래내역']}
                    selectedIndex={selectedIndex}
                    onTabPress={handleSingleIndexSelect}
                    tabStyle={styles.tabStyle}
                    tabTextStyle={{color: '#595959', }}
                    activeTabStyle={styles.activeTabStyle}
                    borderRadius={20}
                />
            </View>

        </View>
      </SafeAreaView>
  )
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  //   justifyContent: 'center',
  //   alignItems:'center',
  backgroundColor: '#F0F4FA',

    padding: 5,
  },
  smallcontainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  tapContainer: {
      alignItems:'flex-end',
      borderRadius: 20,
      backgroundColor: 'white',
      padding: 3,
  },
  headerText: {
    flex: 1,
    padding: 8,
    fontSize: 14,
    color: '#444444',
    textAlign: 'center',
    backgroundColor: 'white',
  },
  tabStyle: {
    borderColor: 'white',
    backgroundColor: 'white',
  },
  activeTabStyle: {
    backgroundColor: '#8EB3EE',
    borderRadius: 20,
  },
});