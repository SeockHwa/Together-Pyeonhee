import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { SafeAreaView, StyleSheet, Text, View, Button, Image } from 'react-native';
import SetCategoryButton from '../Buttons/SetCategoryButton';
import RNPickerSelect from 'react-native-picker-select';
import { CATEGORY } from './constants';
import { Root, Popup } from 'react-native-popup-confirm-toast';
import BackButton from '../Buttons/BackButton';
import { updateCategory } from '../api';
const AccountLogo = (props) => {
    const accountCate = props.bankName;
    if(accountCate === 'NH농협은행'){
        return(
            <Image source={require('./assets/accounts/nonghyeob.png')} style={styles.accountImage}/>
        )
    }else if(accountCate === '부산은행'){
        return(
            <Image source={require('./assets/accounts/busan.png')} style={styles.accountImage}/>
        )
    }else if(accountCate === '씨티은행'){
        return(
            <Image source={require('./assets/accounts/citi.png')} style={styles.accountImage}/>
        )
    }else if(accountCate === '대구은행'){
        return(
            <Image source={require('./assets/accounts/daegu.png')} style={styles.accountImage}/>
        )
    }else if(accountCate === '광주은행'){
        return(
            <Image source={require('./assets/accounts/gwangju.png')} style={styles.accountImage}/>
        )
    }else if(accountCate === '하나은행'){
        return(
            <Image source={require('./assets/accounts/hana.png')} style={styles.accountImage}/>
        )
    }else if(accountCate === 'IBK기업은행'){
        return(
            <Image source={require('./assets/accounts/ibk.png')} style={styles.accountImage}/>
        )
    }else if(accountCate === 'SC제일은행'){
        return(
            <Image source={require('./assets/accounts/sc.png')} style={styles.accountImage}/>
        )
    }else if(accountCate === '제주은행'){
        return(
            <Image source={require('./assets/accounts/jeju.png')} style={styles.accountImage}/>
        )
    }else if(accountCate === 'SBI저축은행'){
        return(
            <Image source={require('./assets/accounts/sbi.png')} style={styles.accountImage}/>
        )
    }else if(accountCate === 'KB국민은행'){
        return(
            <Image source={require('./assets/accounts/kb.png')} style={styles.accountImage}/>
        )
    }else if(accountCate === 'Kbank'){
        return(
            <Image source={require('./assets/accounts/kbank.png')} style={styles.accountImage}/>
        )
    }else if(accountCate === 'KDB'){
        return(
            <Image source={require('./assets/accounts/kdb.png')} style={styles.accountImage}/>
        )
    }else if(accountCate === '카카오뱅크'){
        return(
            <Image source={require('./assets/accounts/kakao.png')} style={styles.accountImage}/>
        )
    }else if(accountCate === '새마을금고'){
        return(
            <Image source={require('./assets/accounts/mg.png')} style={styles.accountImage}/>
        )
    }else if(accountCate === 'SJ산림은행'){
        return(
            <Image source={require('./assets/accounts/sj.png')} style={styles.accountImage}/>
        )
    }else if(accountCate === 'SBI저축은행'){
        return(
            <Image source={require('./assets/accounts/sbi.png')} style={styles.accountImage}/>
        )
    }else if(accountCate === '신한은행'){
        return(
            <Image source={require('./assets/accounts/shinhan.png')} style={styles.accountImage}/>
        )
    }else if(accountCate === '신협은행'){
        return(
            <Image source={require('./assets/accounts/sinhyeob.png')} style={styles.accountImage}/>
        )
    }else if(accountCate === '수협은행'){
        return(
            <Image source={require('./assets/accounts/suhyeob.png')} style={styles.accountImage}/>
        )
    }else if(accountCate === '토스'){
        return(
            <Image source={require('./assets/accounts/toss.png')} style={styles.accountImage}/>
        )
    }else if(accountCate === '우체국'){
        return(
            <Image source={require('./assets/accounts/uche.png')} style={styles.accountImage}/>
        )
    }
    else if(accountCate === '우리은행'){
        return(
            <Image source={require('./assets/accounts/uri.png')} style={styles.accountImage}/>
        )
    }
    else if(accountCate === '오픈은행'){
        return(
            <Image source={require('./assets/accounts/open.png')} style={styles.accountImage}/>
        )
    }
    else{
          return(
              <View style={styles.accountImage} />
          )
      }
  }

const SetCategoryScreen = ({navigation, route}) => {
    const [userID, setUserID] = useState('');
    //route.params.tranID  거래 아이디 
    const [category, setCategory] = useState('');
    useEffect(()=>{
        AsyncStorage.getItem('userID', (err, result) => {
            const tempID = result;
            if(tempID!= null){
                setUserID(tempID);
            }
        })
    })
    const handleSubmitButton = () => {
        if(!category){
          Popup.show({
            type: 'success',
            textBody: '카테고리를 설정해주세요.',
            buttonText: '확인',
            okButtonStyle: {backgroundColor: '#0000CD'},
            iconEnabled: false,
            callback: () => Popup.hide()
          })
          return;
        }
        updateCategory(userID, route.params.fintech, category, route.params.tranDate, route.params.tranTime)
        .then((responseJson)=>{
          console.log(responseJson);
          if(responseJson.status === 'success'){
            Popup.show({
                type: 'success',
                textBody: '카테고리 설정을 완료했습니다.',
                buttonText: '확인',
                okButtonStyle: {backgroundColor: '#0000CD'},
                iconEnabled: false,
                callback: () => {
                    Popup.hide();
                    navigation.goBack();
                }
              })
            console.log('success store category');
          }else{
            alert('카테고리 설정 실패');
            console.log('Check id or password');
            navigation.goBack();
          }
        })
        .catch((error)=>{
          console.error(error);
        })
      }
    return (
        <Root>
        <View style={styles.appSize}>
            <View style={styles.appTopBar}>
                <BackButton onPress={()=>{navigation.goBack()}}/>
                <View style={styles.headerDiv}>
                  <Text style={styles.topFont}>카테고리 설정</Text>
                </View>
                <View style={styles.headerRightDiv}></View>
            </View>
            <View style={styles.appInnerSize}>
                <View style={styles.appOutBody}>
                <AccountLogo bankName={route.params.bankName}/>
                <View style={styles.appBody}>
                <View style={styles.lowDiv}>
                    <Text style={styles.tranTitle}>계좌 번호: </Text>
                    <Text style={styles.tranContent}>{route.params.account_num}</Text>
                </View>
                <View style={styles.lowDiv}>
                    <Text style={styles.tranTitle}>거래 일자: </Text>
                    <Text style={styles.tranContent}>{route.params.tranDate.substring(0,4)+'-'+route.params.tranDate.substring(4,6)+'-'+route.params.tranDate.substring(6,8)}</Text>
                </View>
                <View style={styles.lowDiv}>
                    <Text style={styles.tranTitle}>거래 시간: </Text>
                    <Text style={styles.tranContent}>{route.params.tranTime}</Text>
                </View>
                <View style={styles.lowDiv}>
                    <Text style={styles.tranTitle}>거래 금액: </Text>
                    <Text style={styles.tranContent}>{route.params.tranPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>
                </View>
                <View style={styles.lowDiv}>
                    <Text style={styles.tranTitle}>거래 종류: </Text>
                    <Text style={styles.tranContent}>{route.params.inoutType}</Text>
                </View>
                <View style={styles.lowDiv}>
                    <Text style={styles.tranTitle} >상호명: </Text>
                    <View style={styles.tranContent}>
                        <Text >{route.params.organizationName}</Text>
                        <Text style={styles.styleBranch}>({route.params.branchName})</Text>
                    </View>
                </View>
                <View style={styles.lowDiv}>
                    <Text style={styles.tranTitle}>종류: </Text>
                    <RNPickerSelect
                        placeholder={{
                            label: '선택',
                            color: 'gray',
                        }}
                        style={pickerSelectStyles}
                        onValueChange={(value) => setCategory(value)}
                        items={CATEGORY}
                        value={route.params.tranCate}
                    />
                </View>
                </View>
                <SetCategoryButton onPress={handleSubmitButton}/>
                </View>
            </View>
        </View>
        </Root>
    )
}

export default SetCategoryScreen;

const styles = StyleSheet.create({
    appSize: {
      flex: 1,
    },
    appInnerSize: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    appTopBar: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
      },
      headerDiv: {
          height: 40,
          alignItems: 'center',
          justifyContent: 'flex-end',
          flex: 1,
      },
      headerRightDiv:{
        width: 30,
      },
      topFont: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
      },

    appOutBody:{
        backgroundColor: 'white',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
    appBody: {
        margin: 30,
    },
    lowDiv: {
        flexDirection: 'row',
        width: 250,
        marginTop: 10,
    },
    accountImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 1,
    },
    tranTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        width: 80,
    },
    tranContent: {
        textAlign: 'right',
        width: 170,
        fontSize: 17,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
    },
    titleDiv: {
        fontSize: 20,
        margin: 30,
        fontWeight: 'bold',
    },
    styleBranch: {
        fontSize: 11,
    },
    organizationStyle:{
        textAlign: 'right',
        width: 110,
        fontSize: 17,
    },
});
const pickerSelectStyles = StyleSheet.create({
    inputAndroid: {
        height: 30, 
        width: 170, 
        backgroundColor: '#DCDCDC',
        borderColor: '#000000',  
        borderRadius: 3,
        padding: 10,
    },
});