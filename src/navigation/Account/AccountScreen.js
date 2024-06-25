import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {styles} from './styles';
import {color} from '../../common/color';
import {font} from '../../common/Font';
import Right from '../../../assets/svg/right';
import {useDispatch, useSelector} from 'react-redux';
import FastImage from 'react-native-fast-image';
import ErrorMessage from '../../component/ErrorMessage/ErrorMessage';
import {userProfile} from '../../redux/slice/AuthSlice';
import Loader from '../../component/Loader/Loader';

const AccountScreen = ({navigation}) => {
  const {userProfileData, userProfileDataFailed, loading} = useSelector(
    state => state.auth,
  );

  return (
    <>
      {userProfileData ? (
        <SafeAreaView style={styles.container}>
          <ScrollView contentContainerStyle={styles.scrollview}>
            <View style={styles.subview}>
              <View style={styles.imageview}>
                <FastImage
                  style={{height: 60, width: 60, borderRadius: 30}}
                  source={{uri: userProfileData?.userPicture}}
                />
              </View>
              <Text style={styles.firsttext}>{userProfileData?.fullName}</Text>
              <TouchableOpacity
                style={styles.touchview}
                onPress={() => {
                  navigation.navigate('InformationScreen');
                }}>
                <Text
                  style={{
                    fontSize: 19,
                    fontWeight: '600',
                    color: color.color_lightblack,
                    fontFamily: font.nunitoregular,
                  }}>
                  Personal information
                </Text>
                <Right />
              </TouchableOpacity>
              {/* 
          <TouchableOpacity style={styles.touchview}  onPress={() => {
              navigation.navigate('VerifyNumberScreen');
            }}>
            <Text style={styles.touchText}>Phone number verification</Text>
            <Right />
          </TouchableOpacity> */}

              <Text style={styles.settingtext}>Settings</Text>

              <TouchableOpacity
                style={styles.touchview}
                onPress={() => {
                  navigation.navigate('TabSecurity');
                }}>
                <Text style={styles.touchText}>Security</Text>
                <Right />
              </TouchableOpacity>

              <TouchableOpacity style={styles.touchview}>
                <Text style={styles.touchText}>{'Help & Support'}</Text>
                <Right />
              </TouchableOpacity>

              <TouchableOpacity style={styles.touchview}>
                <Text style={styles.touchText}>Legal</Text>
                <Right />
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
      ) : userProfileDataFailed ? (
        <ErrorMessage
          apiToCall={userProfile}
          message={userProfileDataFailed?.message}
        />
      ) : (
        loading && <Loader loading={loading} />
      )}
    </>
  );
};

export default AccountScreen;
