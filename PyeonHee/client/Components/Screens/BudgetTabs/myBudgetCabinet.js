import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Modal} from 'react-native';

import MyBudgetItem from './myBudgetCabinetItem';
import { MyBudgetPlanCabinet } from '../../api';
const myBudgetCabinet = (props) => {
    const [userID, setUserID] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [loaing, setLoading] = useState(false);

    const [myBudgetData, setmyBudgetData] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [isSelected, setIsSelected] = useState(false);

    useEffect(()=>{
        let tempID;
        AsyncStorage.getItem("userID")
        .then(
            (value) => {
                if (value !== null){
                    tempID=value
                    setUserID(tempID);
                }
            }
        )
        .then(()=>{
            console.log(tempID);
            MyBudgetPlanCabinet(tempID)
            .then((responseJson)=>{
                console.log('response data');
                console.log(responseJson);
                setmyBudgetData(responseJson);
            })
            .then(()=>{
                setLoading(true);
            })  
        })
    }, [])

    const handleChange = () => {
        props.setCallMyButget(true);
        props.setCallMyBudgetPlanID(selectedIndex);
        setIsSelected(false);
        setSelectedIndex(0);
        setModalVisible(!modalVisible);
    }

    const handleCancel = () => {
        setIsSelected(false);
        setSelectedIndex(0);
        setModalVisible(!modalVisible);
    }

    return (
        <View>
            <Modal
                animationType = {"slide"}
                transparent={false}
                visible={modalVisible}
                onRequestClose={() => {
                setModalVisible(!modalVisible);
                }}
            >
            <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#D4E2F8',}}>
                {myBudgetData.length === 0 ?
                    <View style={{marginTop: 50, }}>
                        <Text>????????? ?????????????????? ????????????.</Text>
                    </View>
                    :
                    <View style={{alignItems: 'center', }}>
                        <View style={styles.headerContainer}>
                            <Text style={{fontSize: 20, fontWeight: 'bold', margin: 10}}>??? ?????? ????????? ?????????</Text>
                        </View>
                            
                        {myBudgetData.map(item => {
                            return <MyBudgetItem key={item.planning_number} income={item.user_income} sumOfSavings={item.user_savings} 
                            fixedExpenditure={item.fixedExpenditure} plannedExpenditure={item.plannedExpenditure} dailyMoney={item.available_money}
                            planningID={item.planning_number} setSelectedIndex={setSelectedIndex} setIsSelected={setIsSelected} selectedIndex={selectedIndex}/>;
                        })}
                    </View>
                }
            </View> 

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleChange}>
                    <Text>??????</Text>
                </TouchableOpacity> 

                <TouchableOpacity
                    style={styles.button}
                    onPress={handleCancel}>
                    <Text>??????</Text>
                </TouchableOpacity> 
            </View>
        </Modal>

        <TouchableOpacity
            onPress={() => {
                setModalVisible(true);
        }}>
            <Text> ?????? ????????? ???????????? </Text>
        </TouchableOpacity>  
    </View>
    )
}
const styles = StyleSheet.create({
    appSize: {
        flex: 1,
        
    },
    buttonContainer: {
        marginTop: 5,
        marginBottom: 20,
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: "center",
    },
    button: {
        backgroundColor: '#6090FA',
        color: 'black',
        width: 100,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        margin: 10
      },
      headerContainer: {
        margin: 15,
        borderRadius: 10,
        backgroundColor: 'white',

      }
})
export default myBudgetCabinet;