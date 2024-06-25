import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {color} from '../../common/color';
import SeperatorLine from '../../component/SeperatorLine';
import Appheader from '../../component/AppHeader/appheader';
import {useSelector} from 'react-redux';
import moment from 'moment';
import priceFormat from '../../utils/priceFormat';

const Details = ({navigation, route}) => {
  const data = route?.params?.data;

  const arr = [
    {type: 'Туре', details: data?.status},
    {type: 'Instrument', details: data?.symbol},
    {type: 'Entry Price', details: priceFormat(data?.stockPrice) || 0},
    {type: 'Price@Trade', details: priceFormat(data?.stockPrice) || 0},
    {type: 'Target Price', details: priceFormat(data?.targetPrice) || 0},
    {type: 'Stop Price', details: priceFormat(data?.stopLoss) || 0},
    {
      type: 'Valid Till',
      details:
        moment(data?.buyDate).format('MMM DD, YYYY h:mm A') ||
        moment(data?.soldDate).format('MMM DD, YYYY h:mm A'),
    },
    {
      type: 'Margin',
      details: `${priceFormat(data?.totalAmount)} for ${data?.quantity} QTY`,
    },
  ];
  return (
    <View style={styles.container}>
      <Appheader onPress={() => navigation.goBack()} header="Details" />
      <View style={styles.secContainer}>
        {arr.map(res => (
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 3}}>
              <Text style={{color: color.Default_GREY}}>{res.type}</Text>
            </View>
            <View style={{flex: 3.5}}>
              <Text style={{fontWeight: '500'}}>{res.details}</Text>
            </View>
          </View>
        ))}
        <SeperatorLine />
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 3}}>
            <Text style={{color: color.Default_GREY}}>Net P&L</Text>
          </View>
          <View style={{flex: 3.5}}>
            <Text style={{fontWeight: '500'}}>
              ₹{priceFormat(data?.netProfitAndLoss) || 0}
            </Text>
          </View>
        </View>
        <SeperatorLine />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
  },
  secContainer: {
    borderWidth: 0.5,
    borderColor: color.Default_GREY,
    padding: 16,
    width: '90%',
    borderRadius: 12,
    gap: 10,
  },
});

export default Details;
