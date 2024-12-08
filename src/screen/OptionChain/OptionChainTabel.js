import React, {useEffect, useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {color} from '../../common/color';
import {styles} from './styles';
import {SelectList} from 'react-native-dropdown-select-list';
import HorizontalSeperator from '../MatualFunds/Components/HorizontalSeperator';
import Optionsmodel from './Optionsmodel';

const OptionChainTabel = ({data, symbol, navigation}) => {
  console.log(data, symbol, navigation);
  const number = -10;

  const textColor = number < 0 ? 'red' : 'green';
  const [date, setDate] = useState(data?.expiryDates[0]);
  const [groupedData, setGroupedData] = useState({});
  const [selectedData, setSelectedData] = useState([]);
  const expiryDates = data?.expiryDates;
  const [selected, setSelected] = useState(date);
  console.log(`expiry date ${expiryDates}`);
  function changeExpiryDate(expiryDate) {
    setSelectedData(groupedData[expiryDate]);
  }
  console.log(`date ${date}`);
  useEffect(() => {
    if (date) {
      changeExpiryDate(date);
    }
  }, [date]);
  function groupByExpiryDate(data) {
    const result = {};

    data.forEach(item => {
      const expiryDate = item.expiryDate;

      if (!result[expiryDate]) {
        result[expiryDate] = [];
      }

      result[expiryDate].push(item);
    });

    return result;
  }
  useEffect(() => {
    (async () => {
      const groupedData = groupByExpiryDate(data?.data);
      setGroupedData(groupedData);
      setSelectedData(groupedData[data?.expiryDates[0]]);
      //   console.log('selectedData :>> ', groupedData[data?.expiryDates[0]]);
    })();
  }, []);
  const handleChange = value => {
    console.log('Selected value:', value);
    setDate(value);
  };
  //   TEST

  // model
  const [isModalVisibleCE, setModalVisibleCE] = useState(false);

  const toggleModalCE = () => {
    setModalVisibleCE(!isModalVisibleCE);
    console.log(isModalVisibleCE);
  };
  return (
    <>
      <SelectList
        setSelected={val => handleChange(val)}
        data={expiryDates}
        save="value"
      />
      <HorizontalSeperator />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: color.color_white,
          alignItems: 'center',
          paddingHorizontal: 20,
          paddingVertical: 10,
        }}>
        <View>
          <Text
            style={{
              fontSize: 15,
              color: color.Default_TEXT,
              fontWeight: 600,
            }}>
            Call LTP
          </Text>

          <Text
            style={{
              fontSize: 13,
              color: color.Default_TEXT,
              fontWeight: 500,
            }}>
            OI Crowd
          </Text>
        </View>
        <Text
          style={{fontSize: 15, color: color.Default_TEXT, fontWeight: 600}}>
          Strike
        </Text>
        <View>
          <Text
            style={{
              fontSize: 15,
              color: color.Default_TEXT,
              fontWeight: 600,
            }}>
            Put LTP
          </Text>
          <Text
            style={{
              fontSize: 13,
              color: color.Default_TEXT,
              fontWeight: 500,
            }}>
            OI Crowd
          </Text>
        </View>
      </View>
      <HorizontalSeperator />
      <ScrollView>
        {selectedData.map((row, idx) => (
          <View
            style={{
              backgroundColor: color.color_white,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            {/* <Optionsmodel
              isModalVisible={isModalVisibleCE}
              toggleModalCE={toggleModalCE}
              type="CE"
              symbol={symbol}
              expiryDate={row?.CE?.expiryDate}
              data={selectedData}
              price={row?.CE?.lastPrice}
              StrikePrice={row?.strikePrice}
            /> */}
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                paddingHorizontal: 10,
                paddingVertical: 10,
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 5,
                borderWidth: 1,
                borderColor: color.color_gray,
                width: '30%',
              }}
              onPress={() =>
                navigation.navigate('Optionchaindetail', {
                  symbol: symbol,
                  expiryDate: row?.CE?.expiryDate,
                  data: selectedData,
                  price: row?.CE?.lastPrice,
                  StrikePrice: row?.strikePrice,
                })
              }>
              <Text>{row?.CE?.lastPrice}</Text>

              <Text
                style={[
                  styles.text,
                  {color: row?.CE?.change.toFixed(2) < 0 ? 'red' : 'green'},
                ]}>
                {row?.CE?.change.toFixed(2)}
              </Text>
            </TouchableOpacity>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 1,
                borderColor: color.color_gray,
                flex: 1,
              }}>
              <Text>{row?.strikePrice}</Text>
            </View>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                paddingHorizontal: 10,
                paddingVertical: 10,
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 5,
                borderWidth: 1,
                borderColor: color.color_gray,
                width: '30%',
              }}
              onPress={() =>
                navigation.navigate('Optionchaindetail', {
                  symbol: symbol,
                  expiryDate: row?.PE?.expiryDate,
                  data: selectedData,
                  price: row?.PE?.lastPrice,
                  StrikePrice: row?.strikePrice,
                })
              }>
              <Text>{row?.PE?.lastPrice}</Text>

              <Text
                style={[
                  styles.text,
                  {color: row?.PE?.change.toFixed(2) < 0 ? 'red' : 'green'},
                ]}>
                {row?.PE?.change.toFixed(2)}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </>
  );
};

export default OptionChainTabel;
