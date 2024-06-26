import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TextInput,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from './styles';
import Appheader from '../../component/AppHeader/appheader';
import {font} from '../../common/Font';
import {color} from '../../common/color';
import CustomButton from '../../component/buttons/CustomButton';
import {useSelector} from 'react-redux';
import priceFormat from '../../utils/priceFormat';
import FastImage from 'react-native-fast-image';
const Withdrawal = ({navigation}) => {
  const [firstname, setFirstName] = useState('');
  const [withdrawamount, setwithdrawamount] = useState('');
  const [TransactionId, setTransactionId] = useState('');

  const [lastname, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [citizenship, setcitizenship] = useState('');
  const {userProfileData, userProfileDataFailed} = useSelector(
    state => state.auth,
  );

  useEffect(() => {
    try {
      const fullName = userProfileData?.fullName.split(' ');
      setFirstName(fullName[0]);
      setLastName(fullName[1]);
    } catch (error) {}
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Appheader
        onPress={() => navigation.goBack()}
        header="Withdraw Confirm"
      />

      <ScrollView contentContainerStyle={styles.scrollview}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 14,
            fontFamily: font.nunitoregular,
            paddingLeft: 15,
            paddingRight: 15,
            color: color.color_gettext,
          }}>
          We get your personal information from the verification process. If you
          want to make changes on your personal information, contact our
          support.
        </Text>

        <View style={styles.subview}>
          <Text
            style={{
              fontSize: 15,
              fontWeight: '600',
              fontFamily: font.nunitoregular,
              color: color.color_lightblack,
              paddingTop: 10,
            }}>
            Currency
          </Text>
          <TextInput
            editable={false}
            onChangeText={setFirstName}
            value={'INR'}
            underlineColorAndroid={color.color_gray}
            placeholderTextColor={color.color_lightblack}
            style={{fontSize: 19, color: color.color_lightblack}}
          />

          <Text
            style={{
              fontSize: 15,
              fontWeight: '600',
              fontFamily: font.nunitoregular,
              color: color.color_lightblack,
              paddingTop: 10,
            }}>
            Gateway
          </Text>
          <TextInput
            editable={false}
            onChangeText={setLastName}
            value={'UPI'}
            underlineColorAndroid={color.color_gray}
            placeholderTextColor={color.color_lightblack}
            style={{fontSize: 19, color: color.color_lightblack}}
          />
          <Text
            style={{
              fontSize: 15,
              fontWeight: '600',
              fontFamily: font.nunitoregular,
              color: color.color_lightblack,
              paddingTop: 10,
            }}>
            Enter Withdwar Amount
          </Text>

          <TextInput
            editable={true}
            onChangeText={setwithdrawamount}
            value={withdrawamount}
            underlineColorAndroid={color.color_gray}
            placeholderTextColor={color.color_lightblack}
            style={{fontSize: 19, color: color.color_lightblack}}
          />
          <Text>
            Avalable Fund{' '}
            <Text style={{fontSize: 16, color: 'green'}}>
              ₹{priceFormat(userProfileData?.wallet)}
            </Text>
          </Text>
          <Text
            style={{
              fontSize: 15,
              fontWeight: '600',
              fontFamily: font.nunitoregular,
              color: color.color_lightblack,
              paddingTop: 10,
            }}>
            Enter Your upi id
          </Text>
          <TextInput
            editable={true}
            onChangeText={setTransactionId}
            placeholder="Enter Your upi Id"
            value={TransactionId}
            underlineColorAndroid={color.color_gray}
            placeholderTextColor={color.color_gray}
            style={{fontSize: 19, color: color.color_lightblack}}
          />

          {/* <Text
          style={{
            fontSize: 15,
            fontWeight: '600',
            fontFamily: font.nunitoregular,
            color: color.color_lightblack,
            paddingTop: 10,
          }}>
          Street address
        </Text>
        <TextInput
          placeholder="Enter Your Address"
          onChangeText={setAddress}
          value={address}
          underlineColorAndroid={color.color_gray}
          placeholderTextColor={color.color_lightblack}
          style={{fontSize: 19, color: color.color_lightblack}}
        />

        <Text
          style={{
            fontSize: 15,
            fontWeight: '600',
            fontFamily: font.nunitoregular,
            color: color.color_lightblack,
            paddingTop: 10,
          }}>
          City
        </Text>
        <TextInput
          placeholder="Enter Your City Name"
          onChangeText={setCity}
          value={city}
          underlineColorAndroid={color.color_gray}
          placeholderTextColor={color.color_lightblack}
          style={{fontSize: 19, color: color.color_lightblack}}
        />

        <Text
          style={{
            fontSize: 15,
            fontWeight: '600',
            fontFamily: font.nunitoregular,
            color: color.color_lightblack,
            paddingTop: 10,
          }}>
          ZIP/Area code
        </Text>
        <TextInput
          placeholder="Enter Your Area Pincode"
          onChangeText={setZipcode}
          value={zipcode}
          underlineColorAndroid={color.color_gray}
          placeholderTextColor={color.color_lightblack}
          style={{fontSize: 19, color: color.color_lightblack}}
        />

        <Text
          style={{
            fontSize: 15,
            fontWeight: '600',
            fontFamily: font.nunitoregular,
            color: color.color_lightblack,
            paddingTop: 10,
          }}>
          Citizenship
        </Text>
        <TextInput
          placeholder="Enter your Citizenship"
          onChangeText={setcitizenship}
          value={citizenship}
          underlineColorAndroid={color.color_gray}
          placeholderTextColor={color.color_lightblack}
          style={{fontSize: 19, color: color.color_lightblack}}
        /> */}
          <View style={{marginTop: 50, marginBottom: 50}}>
            <CustomButton
              textname="Submit  Request"
              onPress={() => navigation.navigate('Submited')}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Withdrawal;
