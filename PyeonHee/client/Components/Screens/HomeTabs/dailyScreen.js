import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Button, Image, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';
import SavingItem from '../SavingItem';
import { daily, dailySaving, saveTranHistory, } from '../../api';

const DailyScreen = (props) => {
    const [userID, setUserID] = useState('');
    const [userName, setUserName] = useState('');
    const [loading, setLoading] = useState(false);
    const [year, setYear] = useState('');
    const [month, setMonth] = useState('');
    const [day, setDay] = useState('');
    const [isCompleted, setIsCompleted] = useState(true);

    const [foodExpenses, setFoodExpenses] = useState(0);
    const [rent, setRent] = useState(0);
    const [education, setEducation] = useState(0);
    const [traffic, setTraffic] = useState(0);
    const [shopping, setShopping] = useState(0);
    const [hobby, setHobby] = useState(0);
    const [insurance, setInsurance] = useState(0);
    const [medical, setMedical] = useState(0);
    const [communication, setCommunication] = useState(0);
    const [event, setEvent] = useState(0);
    const [ect, setEct] = useState(0);
    const [subscribe, setSubscribe] = useState(0);

    const [realFoodExpenses, setRealFoodExpenses] = useState(0);
    const [realRent, setRealRent] = useState(0);
    const [realEducation, setRealEducation] = useState(0);
    const [realTraffic, setRealTraffic] = useState(0);
    const [realShopping, setRealShopping] = useState(0);
    const [realHobby, setRealHobby] = useState(0);
    const [realInsurance, setRealInsurance] = useState(0);
    const [realMedical, setRealMedical] = useState(0);
    const [realCommunication, setRealCommunication] = useState(0);
    const [realEvent, setRealEvent] = useState(0);
    const [realEct, setRealEct] = useState(0);
    const [realSubscribe, setRealSubscribe] = useState(0);

    const [coinBank, setCoinBank] = useState(0);

    const [dailyRestMoney, setDailyRestMoney] = useState(0);
    const [dailyAvailableMoney, setDailyAvailableMoney] = useState(0);
    const [monthMoney, setMonthMoney] = useState(0);

    const [saving, setSaving] = useState([]);

    let date = new Date();	// ?????? ?????? ??? ??????
    let todayYear = date.getFullYear(); //???
    let todayMonth = date.getMonth()+1;	// ???
    let todayDate = date.getDate(); 

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
            //for test
            daily(tempID)
            .then((responseJson)=>{
                console.log('????????? response data');
                console.log(responseJson);
                setUserName(responseJson.userName[0].name);
                setFoodExpenses(responseJson.live_money);
                if((responseJson.planamt.length === 0 && responseJson.realamt.length === 0) || responseJson.length === 0){
                    setIsCompleted(false);
                }else{

                    if(responseJson.planamt.length != 0){
                        setCoinBank(responseJson.planamt.rest_money);
                        setDailyRestMoney(responseJson.planamt.available_money - responseJson.planamt.daily_spent_money);
                        setDailyAvailableMoney(responseJson.planamt.available_money);

                        
                        setEducation(responseJson.planamt.education_expense);
                        setTraffic(responseJson.planamt.transportation_expense);
                        setShopping(responseJson.planamt.shopping_expense);
                        setHobby(responseJson.planamt.leisure_expense);
                        setInsurance(responseJson.planamt.insurance_expense);
                        setMedical(responseJson.planamt.medical_expense);
                        setRent(responseJson.planamt.monthly_rent);
                        setCommunication(responseJson.planamt.communication_expense);
                        setEct(responseJson.planamt.etc_expense);
                        setEvent(responseJson.planamt.event_expense);
                        setSubscribe(responseJson.planamt.subscribe_expense);
                    }

                    if(responseJson.realamt.length != 0){
                        let tempMonthMoney=0;
                        responseJson.realamt.map(item  => {
                            tempMonthMoney=tempMonthMoney+Number(item.daily_amount);
                            console.log('monthmoney=', monthMoney);
                            if(item.tran_type === '??????'){
                                setRealShopping(item.daily_amount);
                            }else if(item.tran_type === '??????'){
                                setRealTraffic(item.daily_amount);
                            }else if(item.tran_type === '??????'){
                                setRealSubscribe(item.daily_amount);
                            }else if(item.tran_type === '??????'){
                                setRealCommunication(item.daily_amount);
                            }else if(item.tran_type === '??????'){
                                setRealHobby(item.daily_amount);
                            }else if(item.tran_type === '??????'){
                                setRealEducation(item.daily_amount);
                            }else if(item.tran_type === '??????'){
                                setRealEvent(item.daily_amount);
                            }else if(item.tran_type === '??????'){
                                setRealInsurance(item.daily_amount);
                            }else if(item.tran_type === '??????'){
                                setRealMedical(item.daily_amount);
                            }else if(item.tran_type === '??????'){
                                setRealRent(item.daily_amount);
                            }else if(item.tran_type === '??????'){
                                setRealEct(item.daily_amount);
                            }
                            else if(item.tran_type === '??????'){
                                setRealFoodExpenses(item.daily_amount);
                            }
                        })
                        setMonthMoney(tempMonthMoney);
                    }


                    var now = new Date();	// ?????? ?????? ??? ??????
                    var year = now.getFullYear(); //???
                    var month = now.getMonth();	// ???
                    var day = now.getDate(); 

                    setYear(year);
                    setMonth(month+1);
                    setDay(day);
                }
            }) 
            .then(()=>{
                dailySaving(tempID)
                .then((responseJson)=>{
                    console.log('????????? ?????? response data');
                    console.log(responseJson);
                    
                    setSaving(responseJson);
                }) 
                .then(()=>{
                    saveTranHistory(tempID)
                    .then((responseJson)=>{
                        console.log('????????? ???????????? response data');
                        console.log(responseJson);
                        if(responseJson.status === 'success'){
                            console.log('???????????? ?????? ??????');
                        }else{
                            console.log('???????????? ?????? ??????');
                        }
                    })
                    .then(()=>{
                        setLoading(true);
                    })
                    .catch((error)=>{
                        console.log(error);
                    })
                })
                .catch((error)=>{
                    console.log(error);
                })
            })
            .catch((error)=>{
                console.log(error);
            })
        })
        .catch((error)=>{
            console.log(error);
        })
    },[props])
    if(loading === true && isCompleted === true){
        return (
            <ScrollView style={styles.appSize}>
                <View style={styles.appTopBar}>
                    <View style={styles.titleDiv}>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={styles.NameStyle}>{userName}</Text>
                            <Text style={styles.NextToNameStyle}>???</Text>
                        </View>
                        <View style={styles.monthDiv}>
                            <Text style={styles.monthText}>{year}??? {month}??? {day}???</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.appBody}>
                    <Text style={styles.dailyText}>Daily</Text>
                    <View style={styles.dailyBody}>
                        <View style={styles.savingDiv}>
                            <View style={styles.savingLeftDiv}>
                                <Image source={require('../assets/coinBank.png')} style={styles.iconDiv}/>
                                <Text style={styles.savingLockerText}>?????????</Text>
                                <Text style={styles.savingPriceText}>+  {coinBank.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}???</Text>
                            </View>
                        </View>
                        <View style={styles.exDiv}>
                            <View style={styles.exTopDiv}>
                                <Text style={styles.exTitleDiv}>??? ?????? ??????:</Text>
                                <Text style={styles.exText}>{monthMoney.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}???</Text>
                            </View>
                            <View style={styles.exBottomDiv}>
                                <Text style={styles.exTitleDiv}>?????? ?????? ??????:</Text> 
                                <Text style={styles.exText}>{dailyAvailableMoney.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}???</Text>
                            </View>
                            <View style={styles.exBottomDiv}>
                                <Text style={styles.exTitleDiv}>?????? ?????? ??????:</Text> 
                                <Text style={styles.exText}>{dailyRestMoney.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}???</Text>
                            </View>
                        </View>
                    </View>
                    <Text style={styles.dailyText}>Category</Text>
                    <View style={styles.categoryBody}>
                        <View style={styles.categoryInnerBody}>
                            <View style={styles.itemDiv}>
                                <View style={styles.logoContainer}>
                                    <Image source={require('../assets/category/spoon.png')} style={styles.categoryIconDiv}/>
                                </View>
                                <Text style={styles.itemTitle}>??????</Text>
                                <View style={{alignItems: 'flex-end'}}>
                                    <Text style={styles.realPriceTitle}>{realFoodExpenses.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}???</Text>
                                    <Text style={styles.priceTitle}>{foodExpenses.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}???</Text>
                                </View>
                            </View>
                            <View style={styles.itemDiv}>
                                <View style={styles.logoContainer}>
                                    <Image source={require('../assets/category/traffic.png')} style={styles.categoryIconDiv}/>
                                </View>
                                <Text style={styles.itemTitle}>?????????</Text>
                                <View style={{alignItems: 'flex-end'}}>
                                    <Text style={styles.realPriceTitle}>{realTraffic.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}???</Text>
                                    <Text style={styles.priceTitle}>{traffic.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}???</Text>
                                </View>
                            </View>
                            <View style={styles.itemDiv}>
                                <View style={styles.logoContainer}>
                                    <Image source={require('../assets/category/leisure.png')} style={styles.categoryIconDiv}/>
                                </View>
                                <Text style={styles.itemTitle}>??????/??????/??????</Text>
                                <View style={{alignItems: 'flex-end'}}>
                                    <Text style={styles.realPriceTitle}>{realHobby.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}???</Text>
                                    <Text style={styles.priceTitle}>{hobby.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}???</Text>
                                </View>
                            </View>
                            <View style={styles.itemDiv}>
                            <View style={styles.logoContainer}>
                                    <Image source={require('../assets/category/shopping.png')} style={styles.categoryIconDiv}/>
                                </View>
                                <Text style={styles.itemTitle}>??????/??????/??????</Text>
                                <View style={{alignItems: 'flex-end'}}>
                                    <Text style={styles.realPriceTitle}>{realShopping.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}???</Text>
                                    <Text style={styles.priceTitle}>{shopping.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}???</Text>
                                </View>
                            </View>
                            <View style={styles.itemDiv}>
                                <View style={styles.logoContainer}>
                                    <Image source={require('../assets/category/education.png')} style={styles.categoryIconDiv}/>
                                </View>
                                <Text style={styles.itemTitle}>??????</Text>
                                <View style={{alignItems: 'flex-end'}}>
                                <Text style={styles.realPriceTitle}>{realEducation.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}???</Text>
                                <Text style={styles.priceTitle}>{education.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}???</Text>
                                </View>
                            </View>
                            <View style={styles.itemDiv}>
                                <View style={styles.logoContainer}>
                                    <Image source={require('../assets/category/medical.png')} style={styles.categoryIconDiv}/>
                                </View>
                                <Text style={styles.itemTitle}>?????????</Text>
                                <View style={{alignItems: 'flex-end'}}>
                                <Text style={styles.realPriceTitle}>{realMedical.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}???</Text>
                                <Text style={styles.priceTitle}>{medical.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}???</Text>
                                </View>
                            </View>
                            <View style={styles.itemDiv}>
                                <View style={styles.logoContainer}>
                                    <Image source={require('../assets/category/event.png')} style={styles.categoryIconDiv}/>
                                </View>
                                <Text style={styles.itemTitle}>?????????/??????</Text>
                                    <View style={{alignItems: 'flex-end'}}>
                                    <Text style={styles.realPriceTitle}>{realEvent.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}???</Text>
                                    <Text style={styles.priceTitle}>{event.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}???</Text>
                                </View>
                            </View>
                            <View style={styles.itemDiv}>
                                <View style={styles.logoContainer}>
                                    <Icon name={'ellipsis-horizontal-outline'}  size={20} color={'#203864'}/>
                                </View>
                                <Text style={styles.itemTitle}>??????</Text>
                                <View style={{alignItems: 'flex-end'}}>
                                    <Text style={styles.realPriceTitle}>{realEct.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}???</Text>
                                    <Text style={styles.priceTitle}>{ect.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}???</Text>
                                </View>
                            </View>

                            <View style={styles.itemDiv}>
                                <View style={styles.logoContainer}>
                                    <Icon name={'log-out-outline'} size={20} color={'#203864'}/>
                                </View>
                                <Text style={styles.itemTitle}>??????</Text>
                                <View style={{alignItems: 'flex-end'}}>
                                    <Text style={styles.realPriceTitle}>{realRent.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}???</Text>
                                    <Text style={styles.priceTitle}>{rent.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}???</Text>
                                </View>
                            </View>
                            <View style={styles.itemDiv}>
                                <View style={styles.logoContainer}>
                                    <Image source={require('../assets/category/health-insurance.png')} style={styles.categoryIconDiv}/>
                                </View>
                                <Text style={styles.itemTitle}>?????????</Text>
                                <View style={{alignItems: 'flex-end'}}>
                                    <Text style={styles.realPriceTitle}>{realInsurance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}???</Text>
                                    <Text style={styles.priceTitle}>{insurance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}???</Text>
                                </View>
                            </View>
                            <View style={styles.itemDiv}>
                                <View style={styles.logoContainer}>
                                    <Icon name={'phone-portrait-outline'} size={20} color={'#203864'}/>
                                </View>
                                <Text style={styles.itemTitle}>?????????</Text>
                                <View style={{alignItems: 'flex-end'}}>
                                    <Text style={styles.realPriceTitle}>{realCommunication.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}???</Text>
                                    <Text style={styles.priceTitle}>{communication.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}???</Text>
                                </View>
                            </View>
                            <View style={styles.itemDiv}>
                                <View style={styles.logoContainer}>
                                    <Image source={require('../assets/category/subscribe.png')} style={styles.categoryIconDiv}/>
                                </View>
                                <Text style={styles.itemTitle}>?????????</Text>
                                <View style={{alignItems: 'flex-end'}}>
                                    <Text style={styles.realPriceTitle}>{realSubscribe.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}???</Text>
                                    <Text style={styles.priceTitle}>{subscribe.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}???</Text>
                                </View>
                            </View>
                            
                        </View>
                    </View>
                    <Text style={styles.dailyText}>Saving</Text>
                    <View style={styles.savingBody}>
                        <View>
                            {saving.length === 0 ?
                                <Text style={{margin: 10,}}>?????? ????????? ?????? ????????? ????????????.</Text> :
                                saving.map(item => {
                                    return <SavingItem key={item.saving_number} savingName={item.saving_name} currentSavingMoney={item.all_savings_money} goalSavingMoney={item.savings_money}
                                        startSavingDate={item.start_date} endSavingDate={item.finish_date}/>;
                            })}
                        </View>
                    </View>
                </View>
            </ScrollView>
        )
    }else if(loading === true && isCompleted === false){
        return(
            <View style={styles.appSize}>
                <View style={styles.appTopBar}>
                    <View style={styles.titleDiv}>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={styles.NameStyle}>{userName}</Text>
                            <Text style={styles.NextToNameStyle}>???</Text>
                        </View>
                        <View style={styles.monthDiv}>
                            <Text style={styles.monthText}>{todayYear}??? {todayMonth}??? {todayDate}???</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.appBody}>
                    <View style={styles.notCompletedInnerBody}>
                        <Text style={styles.notCompletedText}>?????? ?????? ???????????? ???????????? ???????????????.</Text>
                    </View>
                </View>
            </View>
        )
    }else{
        return(
            <View style={styles.appSize}>

            </View>
        );
    }
}

export default DailyScreen;

const styles = StyleSheet.create({
    appSize: {
      flex: 1,
      padding: 3,
      textAlign: 'center',
      backgroundColor: '#F0F4FA',
    },
    appTopBar: {
        height: 40,
    },
    appBody:{
        flex: 1,
    },
    titleDiv: {
        marginTop: 5,
        marginHorizontal: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    NameStyle:{
        fontSize: 25,
        fontWeight: 'bold',
        color: 'black',
    },
    NextToNameStyle: {
        marginTop: 9,
        fontSize: 15,
        fontWeight: 'bold',
    },
    innerTopDiv:{
        alignItems: 'center',
        backgroundColor: 'yellow',

    },
    monthDiv:{
        marginLeft: 10,
        padding: 5,
    },
    monthText:{
        fontWeight: 'bold',
        fontSize: 15,
    },
    dailyText:{
        margin: 10,
        fontSize: 17,
        fontWeight: 'bold',
        color: '#203864',
    },
    dailyBody:{
        borderRadius: 13,
        height: 110,
        paddingVertical: 5, 
        marginHorizontal: 5,
        flexDirection: 'row',
        backgroundColor: '#203864',
    },
    savingBody:{
        borderRadius: 10,
        flex: 1,
        marginHorizontal: 5,
        backgroundColor: 'white',
        alignItems: 'center',
    },
    savingLockerText: {
        marginTop: 5,
        fontSize: 12,
        color: 'white',
    },
    categoryText:{
        margin: 10,
        fontSize: 15,
        fontWeight: 'bold',
    },
    categoryBody:{
        borderRadius: 13,
        height: 620,
        marginBottom: 20,
        marginHorizontal: 5,
        backgroundColor: 'white',
    },
    iconDiv: {
        width: 50,
        height: 50,
        tintColor: 'pink'
    },
    exTitleDiv: {
        width: 100,
        fontSize: 13,
        fontWeight: '500',
        color: 'white',
    },
    savingDiv:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    exDiv:{
        flex: 2,
        paddingVertical: 5,
        marginRight: 10,
    },
    savingLeftDiv:{
        flexDirection: 'column',
        alignItems: 'center',
    },
    savingRightDiv:{
        marginTop: 35,
        marginLeft: 5,
    },
    savingPriceText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: 'white',
    },
    exTopDiv: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    exBottomDiv: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    exText: {
        width: 90,
        textAlign: 'right',
        color: 'white',
    },
    categoryInnerBody: {
        marginHorizontal: 10,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    itemTitle: {
        width: 110,
        color: 'black',
    },
    priceTitle: {
        width: 150,
        textAlign: 'right',
        fontSize: 11,
        marginTop: 3,
    },
    realPriceTitle: {
        width: 165,
        textAlign: 'right',
        fontSize: 15,
        fontWeight: 'bold',
        color: '#203864',
    },
    slashFont: {
        width: 30,
        textAlign: 'center',
        fontSize: 15,
    },
    itemDiv: {
        flexDirection: 'row',
        margin: 5,
        alignItems: 'center'
    },
    logoContainer: {
        padding: 6,
        borderRadius: 20,
        marginRight: 10, 
        borderColor: '#203864',
        borderWidth: 1,
    },
    categoryIconDiv: {
        margin: 3,
        width: 18,
        height: 18,
        tintColor: '#203864',
    },
    notCompletedInnerBody: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        flex: 1,
        borderRadius: 50,
    },
    notCompletedText :{
        fontWeight: 'bold',
        color: 'black',
    },
});