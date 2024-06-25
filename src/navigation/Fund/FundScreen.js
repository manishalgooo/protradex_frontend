// import {
//   View,
//   Text,
//   SafeAreaView,
//   ScrollView,
//   TextInput,
//   Image,
// } from 'react-native';
// import React, {useState} from 'react';
// import {styles} from './styles';
// import {font} from '../../common/Font';
// import {color} from '../../common/color';
// import Add from '../../../assets/svg/add';
// import Withdraw from '../../../assets/svg/withdraw';
// import {useSelector} from 'react-redux';
// import {userProfile} from '../../redux/slice/AuthSlice';
// import Loader from '../../component/Loader/Loader';
// import ErrorMessage from '../../component/ErrorMessage/ErrorMessage';
// import priceFormat from '../../utils/priceFormat';

// const FundScreen = () => {
//   const {userProfileData, userProfileDataFailed, loading} = useSelector(
//     state => state.auth,
//   );
//   return (
//     <>
//       {userProfileData ? (
//         <SafeAreaView style={styles.container}>
//           <ScrollView contentContainerStyle={styles.scrollview}>
//             <View style={styles.mainview}>
//               <Text style={styles.fund}>Funds</Text>
//               <Text style={styles.cash}>( Cash + Collateral )</Text>
//             </View>
//             <View style={styles.subview}>
//               <View style={styles.mainview}>
//                 <Text style={styles.available}>Available margin</Text>
//                 <Text style={styles.numberText}>
//                   ₹{priceFormat(userProfileData?.wallet)}
//                 </Text>
//               </View>
//               <View style={styles.horizontalline} />

//               <Text style={[styles.balancetext, {paddingTop: 15}]}>
//                 Opening balance
//               </Text>
//               <Text style={styles.balancenumber}>₹10,00,000</Text>
//               <Text style={[styles.balancetext, {paddingTop: 10}]}>
//                 Total Invested
//               </Text>
//               <Text style={styles.balancenumber}>
//                 ₹{priceFormat(userProfileData?.totalInvested)}
//               </Text>
//               <Text style={[styles.balancetext, {paddingTop: 10}]}>
//                 Today's Profit
//               </Text>
//               <Text style={styles.balancenumber}>
//                 ₹{priceFormat(userProfileData?.todayProfit) || 0}
//               </Text>
//               <Text style={[styles.balancetext, {paddingTop: 10}]}>
//                 Overall Profit
//               </Text>
//               <Text style={styles.balancenumber}>
//                 ₹{priceFormat(userProfileData?.overallProfit) || 0}
//               </Text>
//               {/* <Text style={[styles.balancetext, {paddingTop: 10}]}>
//                 Option Primum
//               </Text>
//               <Text style={styles.balancenumber}>0.00</Text>
//               <View style={styles.horizontalline} />
//               <Text style={[styles.balancetext, {paddingTop: 10}]}>
//                 Total Collateral
//               </Text>
//               <Text style={styles.balancenumber}>0.00</Text> */}

//               {/* <View style={styles.buttonview}>
//                 <View style={styles.addfundview}>
//                   <Add />
//                   <Text style={styles.bothText}>Add Funds</Text>
//                 </View>
//                 <View style={styles.withdrawview}>
//                   <Withdraw />
//                   <Text style={styles.bothText}>Withdraw</Text>
//                 </View>
//               </View> */}
//             </View>
//           </ScrollView>
//         </SafeAreaView>
//       ) : userProfileDataFailed ? (
//         <ErrorMessage
//           apiToCall={userProfile}
//           message={userProfileDataFailed?.message}
//         />
//       ) : (
//         loading && <Loader loading={loading} />
//       )}
//     </>
//   );
// };

// export default FundScreen;

import {
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
// import {Entypo, Ionicons} from '@expo/vector-icons';
import {useDispatch, useSelector} from 'react-redux';
import {color} from '../../common/color';
import priceFormat from '../../utils/priceFormat';
import Seperator from '../../component/Seperator/Seperator';
import SeperatorLine from '../../component/SeperatorLine';
import FastImage from 'react-native-fast-image';
import OptimizedFlatlist from '../../component/OptimizedFlatlist.js/OptimizedFlatlist';
import checkNonEmpty from '../../utils/checkNonEmpty';
import moment from 'moment';
import Debounce from '../../utils/Debounce';
import getSocketData from '../../utils/getSocketData';
import GetAPI from '../../api/GetAPI';

const FundScreen = ({navigation}) => {
  const {userProfileData} = useSelector(state => state.auth);
  const {stockHistory} = useSelector(state => state.stockData);
  const {myStocks} = useSelector(state => state.stockData);
  const [stocks, setStocks] = useState([]);
  const [focus, setFocus] = useState(1);
  const [data, setData] = useState([]);
  const [todayPL, setTodayPL] = useState(0);

  useEffect(() => {
    const data = myStocks.filter(stock => stock.executed && !stock.squareOff);
    setStocks(data);
  }, [myStocks]);

  useEffect(() => {
    const data = myStocks.filter(stock => stock.executed && !stock.squareOff);
    if (checkNonEmpty(data)) {
      const symbols = data.map(res => res.symbol);
      const ws = new WebSocket('wss://streamer.finance.yahoo.com');

      ws.onopen = function open() {
        console.log('connected details');
        ws.send(
          JSON.stringify({
            subscribe: symbols,
          }),
        );
      };

      ws.onclose = function close() {
        console.log('disconnected details');
      };

      ws.onmessage = async function incoming(message) {
        try {
          const socketData = await Debounce({
            func: async () => {
              const result = await getSocketData({message});
              return result;
            },
            delay: 800,
          });
          if (socketData && Array.isArray(socketData)) {
            const updatedStocks = data.map(stock => {
              const matchingSocketData = socketData.find(
                socket => socket.symbol === stock.symbol,
              );

              if (matchingSocketData) {
                const regularMarketPrice =
                  matchingSocketData.regularMarketPrice;
                const stockPrice = stock.stockPrice;
                const difference =
                  (regularMarketPrice - stockPrice) * stock.quantity;

                return {
                  ...stock,
                  difference,
                };
              }

              return stock;
            });
            const totalDiff = updatedStocks
              .filter(stock => Number.isFinite(stock.difference))
              .reduce(
                (accumulator, stock) => accumulator + stock.difference,
                0,
              );

            setTodayPL(totalDiff);
            setStocks(updatedStocks);
          }
        } catch (error) {
          console.log(error);
        }
      };
    }
  }, [myStocks]);

  const changeFocus = type => {
    if (type === 1) {
      setFocus(1);
      setData(stockHistory);
    }
    if (type === 2) {
      setFocus(2);
      setData(stocks);
    }
  };

  useEffect(() => {
    if (focus === 1) {
      setData(stockHistory);
    }
  }, [stockHistory]);

  useEffect(() => {
    if (focus === 2) {
      setData(stocks);
    }
  }, [stocks]);

  useEffect(() => {
    const fetch = async () => {
      console.log('FETCHFETCHFETCH');
      try {
        const data = myStocks.filter(
          stock => stock.executed && !stock.squareOff,
        );
        if (checkNonEmpty(data)) {
          const results = await Promise.all(
            data.map(async res => {
              const stockData = await GetAPI.getOneStockData({
                data: res.symbol,
              });
              return {...stockData, id: res._id};
            }),
          );
          const updatedStocks = data.map(stock => {
            const matchingSocketData = results.find(
              socket => socket.symbol === stock.symbol,
            );

            if (matchingSocketData) {
              const regularMarketPrice = matchingSocketData.regularMarketPrice;
              const stockPrice = stock.stockPrice;
              const difference =
                (regularMarketPrice - stockPrice) * stock.quantity;

              return {
                ...stock,
                difference,
              };
            }

            return stock;
          });
          const totalDiff = updatedStocks
            .filter(stock => Number.isFinite(stock.difference))
            .reduce((accumulator, stock) => accumulator + stock.difference, 0);

          console.log('totalDiff', totalDiff);

          setTodayPL(totalDiff);
          setStocks(updatedStocks);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, [myStocks]);

  // const TodayProfitandlossAmount = 10;
  // const PastProfitAndLossAmount = 330;
  // function formatPercentage(value) {
  //   // Convert the decimal to a percentage
  //   const pastProfitAndLossAmount = value * 100;

  //   // Determine the color based on the sign of the percentage
  //   const color = pastProfitAndLossAmount < 0 ? 'red' : 'green';

  //   return {
  //     pastProfitAndLossAmount: '₹' + PastProfitAndLossAmount.toFixed(2),
  //     color: color,
  //   };
  // }

  const renderItem = ({item}) => {
    return (
      <Pressable
        onPress={() => navigation.navigate('Details', {data: item})}
        style={{
          borderWidth: 0.5,
          borderColor: color.Default_GREY,
          borderRadius: 9,
          padding: 14,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View style={{flexDirection: 'row', width: '100%', gap: 10}}>
          <FastImage
            style={{
              height: 48,
              width: 48,
              borderRadius: 8,
              alignSelf: 'flex-start',
              alignItems: 'center',
            }}
            source={{uri: userProfileData?.userPicture}}
          />
          <View>
            <Text style={{fontWeight: '600'}}>{userProfileData?.fullName}</Text>
            <Text style={{fontWeight: '600', color: color.Default_GREY}}>
              {moment(item?.buyDate).format('DD MMM')}
            </Text>
          </View>
        </View>
        <SeperatorLine />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            justifyContent: 'center',
          }}>
          <Text style={{fontSize: 12}}>{item?.symbol}</Text>
          <Text
            style={{
              fontSize: 14,
              fontWeight: '700',
              alignSelf: 'flex-end',
              color: (
                focus === 1 ? item?.netProfitAndLoss < 0 : item?.difference < 0
              )
                ? color.color_red
                : color.Default_GREEN,
              position: 'absolute',
              right: 5,
            }}>
            ₹
            {priceFormat(
              focus === 1 ? item?.netProfitAndLoss : item?.difference,
            ) || 0}
          </Text>
        </View>
        <Text style={{fontSize: 12, color: color.Default_GREY}}>
          {item?.quantity} QTY
        </Text>
        <SeperatorLine />
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      {/* <View style={styles.headerContainer}>
        <Text style={styles.headerText}>FundScreen</Text>
      </View> */}
      <Seperator seperate={10} />
      {/* Wallet amount  */}
      <View style={styles.walletBox}>
        {/* Current Wallte fund */}
        <Text style={styles.walletAmountText}>
          ₹{priceFormat(userProfileData?.wallet)}
        </Text>
        <Text style={styles.walletStaticText}>Available Fund</Text>
      </View>
      <View style={styles.AvailableMarginBox}>
        <View style={styles.AvailableMarginLeft}>
          {/* available Margin */}
          <Text style={styles.AvailableMarginAmountText}>
            ₹{priceFormat(userProfileData?.wallet)}
            {/* 200000 */}
          </Text>
          <Text style={styles.AvailableMarginStaticText}>Available Margin</Text>
        </View>
        <View style={styles.InvestedAmountLeft}>
          {/* invested amount  */}
          <Text style={styles.InvestedAmountText}>
            ₹{priceFormat(userProfileData?.totalInvested)}
          </Text>
          <Text style={styles.InvestedAmountStaticText}>Invested Amount</Text>
        </View>
      </View>
      <View style={styles.ProftAndLossBox}>
        {/* Profit and  Loss */}
        {/* past Profit and loss  Box */}
        <View style={styles.PastProfitAndLossBox}>
          <Text style={styles.ProfitAndLossStatictext}>Past P&L</Text>
          {/* condition add if in loss show in red else green */}
          <Text
            style={{
              color: userProfileData?.overallProfit < 0 ? 'red' : 'green',
              fontSize: 15,
              fontWeight: '600',
            }}>
            ₹{priceFormat(userProfileData?.overallProfit) || 0}
          </Text>
        </View>
        {/* Today Profit and loss  Box */}
        <View style={styles.PastProfitAndLossBox}>
          <Text style={styles.ProfitAndLossStatictext}>Today P&L</Text>
          {/* condition add if in loss show in red else green */}
          <Text
            style={{
              color: todayPL < 0 ? 'red' : 'green',
              fontSize: 15,
              fontWeight: '600',
            }}>
            ₹{priceFormat(todayPL) || 0}
          </Text>
        </View>
      </View>
      <Seperator />
      <View style={{height: 50, flexDirection: 'row'}}>
        <TouchableOpacity
          onPress={() => changeFocus(1)}
          style={styles.topTabView(focus === 1)}>
          <Text style={styles.topTabText(focus === 1)}>History</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => changeFocus(2)}
          style={styles.topTabView(focus === 2)}>
          <Text style={styles.topTabText(focus === 2)}>Position</Text>
        </TouchableOpacity>
      </View>
      <Seperator />
      {checkNonEmpty(data) ? (
        <>
          <OptimizedFlatlist
            style={{marginBottom: '5%'}}
            contentContainerStyle={{gap: 20}}
            renderItem={renderItem}
            data={data}
          />
        </>
      ) : (
        <Text style={{alignSelf: 'center', marginTop: 10}}>No Data</Text>
      )}
    </View>
  );
};

export default FundScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: color.Default_WHITE,
  },
  headerContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingVertical: 10,
    marginBottom: 10,
    // paddingHorizontal: 20,
  },
  headerText: {
    fontSize: 20,
    // fontFamily: 'Inter-Black',
    lineHeight: 20 * 1.4,
    // width: display.setWidth(0),
    textAlign: 'center',
  },
  walletBox: {
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: color.Default_GREY,
    alignItems: 'center',
    gap: 7,
    paddingVertical: 30,
  },
  walletAmountText: {
    fontSize: 25,
    fontWeight: '700',
  },
  walletStaticText: {
    fontSize: 18,
    color: color.Default_GREY,
    marginVertical: 5,
  },
  AvailableMarginBox: {
    // gap: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  AvailableMarginLeft: {
    backgroundColor: color.Default_GREEN,
    width: '48%',
    borderRadius: 15,
    paddingVertical: 20,
    alignItems: 'center',
    gap: 8,
  },
  AvailableMarginAmountText: {
    fontSize: 18,
    color: color.Default_WHITE,
    fontWeight: '800',
  },
  AvailableMarginStaticText: {
    fontSize: 15,
    fontWeight: '400',
    color: color.Default_WHITE,
  },
  InvestedAmountLeft: {
    backgroundColor: color.TEXT_BLUE,
    width: '48%',
    borderRadius: 15,
    paddingVertical: 20,
    alignItems: 'center',
    gap: 8,
  },
  InvestedAmountText: {
    fontSize: 18,
    color: color.Default_WHITE,
    fontWeight: '800',
  },
  InvestedAmountStaticText: {
    fontWeight: '400',
    fontSize: 15,
    color: color.Default_WHITE,
  },
  ProftAndLossBox: {
    borderRadius: 16,
    borderWidth: 0.5,
    borderColor: color.Default_GREY,

    alignItems: 'center',
    gap: 7,
    paddingVertical: 10,
  },
  PastProfitAndLossBox: {
    justifyContent: 'space-between',
    // alignItems: "center",
    width: '100%',
    paddingHorizontal: 10,
    flexDirection: 'row',
  },
  ProfitAndLossStatictext: {
    fontWeight: '500',
    fontSize: 16,
  },
  topTabView: focus => ({
    width: '50%',
    borderBottomWidth: 2,
    borderBottomColor: focus ? color.color_green : color.color_gray,
    justifyContent: 'center',
    alignItems: 'center',
  }),
  topTabText: focus => ({color: focus ? color.color_green : color.color_black}),
});
