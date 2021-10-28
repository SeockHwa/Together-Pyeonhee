import React, { useState } from 'react';
import JoinRequestButton from '../Buttons/JoinRequestButton';
import BackButton from '../Buttons/BackButton';

import {
    StyleSheet,
    Text,
    View,
    TextInput,
} from 'react-native';

const JoinScreen = ({navigation}) => {
    const [id, setId] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');

    const handleSubmitButton = () => {
        if(!id){
          alert('아이디를 입력해주세요.');
          return;
        }
        var idCheck = /^[a-zA-z0-9]{8,20}$/;
        if(!idCheck.test(id)){
            alert('아이디는 8~20자의 영문자, 숫자만 입력 가능합니다.');
            return;
        }
        if(!email){
            alert('이메일을 입력해주세요.');
            return;
        }
        var emCheck = /^[A-Za-z0-9_]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{1,3}$/;
        if(!emCheck.test(email)){
            alert('이메일 형식이 올바르지 않습니다.');
            return;
        }
        if(!password){
          alert('비밀번호를 입력해주세요.');
          return;
        }
        var pwCheck = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
        if(!pwCheck.test(password)){
            alert('비밀번호는 8~25자의 영문자, 숫자, 특수문자의 조합으로 입력해야 합니다.');
            return;
        }
        if(!passwordCheck){
            alert('비밀번호 확인을 입력해주세요.');
            return;
        }
        if(password != passwordCheck){
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }
        fetch('/join', {
          method: 'POST',
          body: JSON.stringify({
            user_id: id,
            user_email: email,
            user_password: password,
            user_passwordCheck: passwordCheck,
          }),
          headers: {
            'Accept': 'application/json',
            'Content-Type':'application/json',
          },
        })
        .then((response)=>response.json())
        .then((responseJson)=>{
          console.log(responseJson);
          if(responseJson.status === 'success'){
            console.log(id, password, '회원가입 완료');
            alert('회원가입이 완료되었습니다.');
            navigation.replace('Login');
          }else{
            alert('이미 존재하는 아이디입니다.');
            console.log('fail to join. id is already exist.');
          }
        })
        .catch((error)=>{
          console.error(error);
        })
    }
    return(
        <View style={styles.appSize}>
            <View style={styles.appTopBar}>
                <View style={styles.backButtonPosition}>
                    <BackButton onPress={() => { if (navigation.canGoBack()) navigation.goBack(); else navigation.replace('Login')}}/>
                </View>
            </View>
            <View style={styles.appLogoHeaderDiv}>
                <Text style={styles.logoJoin}>회원가입</Text>
            </View>
            <View style={styles.appBody}>
                <View style={styles.appInnerBody}>
                    <View style={styles.innerTextAlign}>
                        <Text>아이디*</Text>
                    </View>
                    <TextInput 
                    style={styles.textInputDesign}
                    placeholder='8~20자(영문자+숫자만 사용)'
                    onChangeText={(id) => setId(id)}
                    maxLength ={20}
                    />
                    <View style={styles.innerTextAlign}>
                        <Text>이메일*</Text>
                    </View>
                    <TextInput 
                    style={styles.textInputDesign}
                    placeholder='ex)ex@ex.com'
                    onChangeText={(email) => setEmail(email)}
                    maxLength ={50}
                    />
                    <View style={styles.innerTextAlign}>
                        <Text>비밀번호*</Text>
                    </View>
                    <TextInput
                    secureTextEntry={true}
                    style={styles.textInputDesign}
                    placeholder='8~25자(영문자+숫자+특수문자 조합)'
                    onChangeText={(password) => setPassword(password)}
                    maxLength = {25}
                    />
                    <View style={styles.innerTextAlign}>
                        <Text>비밀번호 확인*</Text>
                    </View>
                    <TextInput
                    secureTextEntry={true}
                    style={styles.textInputDesign}
                    onChangeText={(passwordCheck) => setPasswordCheck(passwordCheck)}
                    maxLength = {25}
                    />
                </View>
            </View>
            <View style={styles.appFooter}>
                <JoinRequestButton onPress={handleSubmitButton}/>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    appSize: {
        flex: 1,
    },
    appTopBar: {
        flex: 1,
    },
    backButtonPosition: {
        marginLeft: 10,
    },
    appLogoHeaderDiv: {
        flex: 4,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    logoJoin:{
        marginTop: 40,
        fontSize: 30,
        fontWeight: 'bold',
        color: 'gray',
    },
    appInnerBody: {
        flex: 1,
        alignItems: 'center',
    },
    innerTextAlign: {
        flexDirection: 'row',
        width: 240,
        marginTop: 5,
    },
    appBody: {
        flex: 10,
    },
    textInputDesign: {
        marginTop: 10,
        marginBottom: 10,
        paddingHorizontal: 10,
        height: 40,
        width: 250,
        borderRadius: 5,
        borderColor: 'black',
        borderWidth: 1,
        backgroundColor: '#DCDCDC',
    },
    appFooter: {
        flex: 5,
        alignItems: 'center',
    },
});
export default JoinScreen;