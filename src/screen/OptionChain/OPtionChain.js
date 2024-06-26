import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import Appheader from '../../component/AppHeader/appheader';
import {styles} from './styles';

const OPtionChain = ({navigation}) => {
  return (
    <>
      <SafeAreaView style={styles.container}>
        <Appheader onPress={() => navigation.goBack()} header="Option Chain" />
        <View />
      </SafeAreaView>
    </>
  );
};

export default OPtionChain;
