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
import Qr_code from '../../../assets/Qr_code.png';
import FastImage from 'react-native-fast-image';
const Deposit = ({navigation}) => {
  const [firstname, setFirstName] = useState('');
  const [depositamount, setdepositamount] = useState('1000');
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
        header="Deposit Checkout"
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

        <FastImage
          style={{
            height: 150,
            width: 150,
            alignSelf: 'center',
            marginVertical: 20,
          }}
          source={Qr_code}
        />
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
            UPI
          </Text>
          <TextInput
            editable={false}
            onChangeText={setLastName}
            value={'msashokandsons.eazypay@icici'}
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
            Enter Deposit Amount
          </Text>
          <TextInput
            editable={true}
            onChangeText={setdepositamount}
            value={depositamount}
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
            Enter Deposit Transaction id
          </Text>
          <TextInput
            editable={true}
            onChangeText={setTransactionId}
            placeholder="Enter Transaction Id"
            value={TransactionId}
            underlineColorAndroid={color.color_gray}
            placeholderTextColor={color.color_lightblack}
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

export default Deposit;
