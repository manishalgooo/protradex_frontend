import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
} from 'react-native';
import React from 'react';
import {styles} from './styles';
import Splashlogo from '../../../assets/svg/splashlogo';
import CustomButton from '../../component/buttons/CustomButton';
// import AppLogo from '../../../assets/bootsplash_logo.png';
import AppLogo from '../../../assets/logo.jpg';

import Seperator from '../../component/Seperator/Seperator';

const SplashScreen = ({props, navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainview}>
        {/* <Splashlogo /> */}
        <Text style={styles.welcome}>Welcome to</Text>
        <Seperator seperate={10} />
        <Image style={{height: 150, width: 367}} source={AppLogo} />
      </View>
      <View style={styles.subcontainer}>
        <CustomButton
          textname="Login"
          onPress={() => navigation.navigate('LoginScreen')}
        />
        <View style={styles.accountview}>
          <Text style={styles.account}>Don’t have an account? </Text>
          <Text
            style={styles.signup}
            onPress={() => {
              navigation.navigate('SignUpScreen');
            }}>
            Sign Up
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SplashScreen;
