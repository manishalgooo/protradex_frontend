import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from './styles';
import Email from '../../../assets/svg/email';
import Password from '../../../assets/svg/password';
import CustomTextinput from '../../component/TextInput/CustomTextinput';
import CustomButton from '../../component/buttons/CustomButton';
import Appheader from '../../component/AppHeader/appheader';
import Signup from '../../../assets/svg/signup';
import User from '../../../assets/svg/user';
import {useDispatch, useSelector} from 'react-redux';
import {CommonActions} from '@react-navigation/native';
import Spinner from '../../component/Spinner/Spinner';
import {register} from '../../redux/slice/AuthSlice';
import PostAPI from '../../api/PostAPI';

const SignUpScreen = ({props, navigation}) => {
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const userRegister = async () => {
    if (!firstname) {
      Alert.alert('Error', 'Please enter your first name');
      return;
    }
    if (!lastname) {
      Alert.alert('Error', 'Please enter your last name');
      return;
    }
    if (!email) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }
    if (!password) {
      Alert.alert('Error', 'Please enter your password');
      return;
    }
    let data = {
      fullName: firstname + ' ' + lastname,
      email,
      password,
    };

    try {
      setLoading(true);
      await PostAPI.register(data);
      navigation.navigate('VerifyNumberScreen');
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error?.message) {
        Alert.alert('Error', error.message);
      } else {
        Alert.alert('Error', 'Something went wrong!');
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Appheader
        onPress={() => navigation.navigate('LoginScreen')}
        header="Create Account"
      />
      <Spinner visible={loading} text={'Loading...'} />
      <ScrollView contentContainerStyle={styles.scrollview}>
        <View style={styles.mainview}>
          <View style={{marginTop: 20}}>
            <Signup />
          </View>
        </View>
        <View style={styles.subview}>
          <CustomTextinput
            placeholder="FirstName"
            onChangeText={newText => setFirstName(newText)}
            defaultValue={firstname}
            svg={User}
          />
          <CustomTextinput
            placeholder="LastName"
            onChangeText={newText => setLastName(newText)}
            defaultValue={lastname}
            svg={User}
          />
          <CustomTextinput
            keyboardType="email-address"
            placeholder="Email"
            onChangeText={newText => setEmail(newText)}
            defaultValue={email}
            svg={Email}
          />
          <CustomTextinput
            placeholder="Password"
            onChangeText={newText => setPassword(newText)}
            defaultValue={password}
            
            svg={Password}
          />
          <View style={styles.subcontainer}>
            <CustomButton textname="Sign Up" onPress={userRegister} />
            <View style={styles.accountview}>
              <Text style={styles.account}>Already have an account? </Text>
              <Text
                style={styles.signup}
                onPress={() => {
                  navigation.navigate('LoginScreen');
                }}>
                Login
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUpScreen;
