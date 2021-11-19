import React, { useEffect, useState, Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import config from '../../config';
import { WebView } from 'react-native-webview';
import axios from 'axios';
import {
    SafeAreaView,
    Alert,
} from 'react-native';
import Loading from './Loading';

const url = config.url;
const openBankingURL = config.openBankingURL;
const client_id = config.client_id;
const client_secret = config.client_secret;

const runFirst = `window.ReactNativeWebView.postMessage("this is message from web");`;

class testScreen extends Component {
  state = {
    userID: '',
  };
  componentDidMount() {
    AsyncStorage.getItem('userID', (err, result) => {
      const tempID = result;
      if(tempID!= null){
        this.setState({
          siteName: tempID,
        });
      }
    })
  }

  render() {
    
    function authProgress(data) {
      // access code는 url에 붙어 장황하게 날아온다.
      // substringd으로 url에서 code=뒤를 substring하면 된다.
      const exp = "code=";
      const exp2 = "&";
      var condition = data.indexOf(exp);
      var condition2= data.indexOf(exp2);

      if (condition != -1) {
          var request_code = data.substring(condition + exp.length, condition2);
          // console.log("access code :: " + request_code);
          // 토큰값 받기
          console.log('코드값', request_code);
          requestToken(request_code);
      }
  };



  const requestToken = async (request_code) => {
      var returnValue = "none";
      var request_token_url = "https://testapi.openbanking.or.kr/oauth/2.0/token";

      axios({
          method: "post",
          url: request_token_url,
          params: {
              grant_type: 'authorization_code',
              client_id: client_id,
              client_secret: client_secret,
              redirect_uri: `${url}/Together`,
              code: request_code,
          },
      }).then(function (response) {
          console.log('비교', response);
          returnValue = response.data.access_token;
          console.log('토큰', returnValue);
      }).then(()=>{
        //api 구현 되면 테스트
        /*
        fetch(`${url}/saveAccount`, {
          method: 'POST',
          body: JSON.stringify({
            userID: this.state.userID,
            userToken: returnValue,
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
            console.log(userID, userPassword, '계좌 등록 완료');
          }else{
            console.log(userID, userPassword, '계좌 등록 실패');
          }
          navigation.replace('자산');
        })
        */
      })
      .catch(function (error) {
          console.log('error', error);
      });
  };

    return (
      <WebView
        source={{ uri: openBankingURL }}
        startInLoadingState={true}
        renderLoading={() => <Loading />}
        originWhitelist={['*']}
        scalesPageToFit={false}
        onError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          console.warn('WebView error: ', nativeEvent);
        }}
        onMessage={(event) => { authProgress(event.nativeEvent["url"]); }}
        injectedJavaScript={runFirst}
        javaScriptEnabled={true}
      />
    );
  }
}

export default testScreen