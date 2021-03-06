import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Button} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const AccountLogo = (props) => {
  const accountCate = props.bankName;
  if(accountCate === '한국저축은행'){
      return(
          <Image source={require('../../assets/accounts/han.png')} style={styles.accountImage}/>
      )
  }else if(accountCate === '스마트저축은행'){
    return(
        <Image source={require('../../assets/accounts/smart.png')} style={styles.accountImage}/>
    )
  }else if(accountCate === '웰컴저축은행'){
    return(
        <Image source={require('../../assets/accounts/welcome.png')} style={styles.accountImage}/>
    )
  }
  else{
        return(
            <View style={styles.accountImage} />
        )
    }
}
const SavingItem = (props) => {
    return (
        <TouchableOpacity 
        style={styles.container}
        onPress={() => props.navigation.navigate('ItemLink', {link: props.link})}>
        <View style={styles.itemContainer}>
            <View style={styles.item1}>
                <AccountLogo bankName={props.bank_name}/>
                <Text style={styles.fundBankFont}>{props.bank_name}</Text>
                <Text style={styles.fundNameFont}>{props.product_name}</Text>
            </View>
            <View style={styles.item2}>
                <View style={styles.infoRow}> 
                    <Text style={styles.rowFont}>방식: </Text>
                    <Text style={styles.highlightFontAva}>{props.product_type}</Text>
                </View>
                <View style={styles.infoRow}> 
                    <Text style={styles.rowFont}>이자율: </Text>
                    <Text style={styles.highlightFont}>{props.interest}%</Text>
                </View>
                <View style={styles.infoRow}> 
                    <Text style={styles.rowFont}>최고 우대금리: </Text>
                    <Text style={styles.highlightFont}>{props.max_interest}%</Text>
                </View>
            </View>
            <View style={styles.nextCotainer}>
              <Icon name={'chevron-forward-outline'} size={20} color={'#203864'}/>
            </View>
        </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 100,
        backgroundColor: 'white',
        margin: 10,
        borderRadius: 10,
      },
      itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 100,
      },
      item1: {
        width: 170,
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRightWidth: 1,
        borderRightColor: 'gray',
      },
      item2: {
        justifyContent: 'space-between',
      },
      tierDesign: {
        width: 50,
        height: 50,
      },
      mbtiContainer: {
          marginBottom: 10,
          alignItems: 'center',
          borderRadius: 10,
      },
      mbtiInnerContainer: {
          backgroundColor: 'pink',
          padding: 3,
          borderRadius: 5,
      },
      mbtiText: {
          fontWeight: 'bold',
          fontSize: 15,
          color: 'white',
      },
      nextCotainer: {
          marginRight: 15,
      },
      nextText: {
          fontSize: 20,
          color: '#A7A3A3'
      },


      fundNameFont: {
        fontWeight: 'bold',
        fontSize: 12.5,
      },
      fundBankFont: {
        fontSize: 11,
      },
      infoRow: {
          flexDirection: 'row',
      },
      highlightFont: {
        color: 'blue',
        fontWeight: 'bold',
        fontSize: 12.5,
      },
      highlightFontAva:{
          fontWeight: 'bold',
          fontSize: 12.5,
      },
      rowFont: {
        fontSize: 12.5,
      },
      accountImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
        borderWidth: 1,
    },
  });

export default SavingItem;