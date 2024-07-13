import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Alert,
} from 'react-native';
import CustomSearch from '../../component/CustomSearchview/CustomSearch';
import OptimizedFlatlist from '../../component/OptimizedFlatlist.js/OptimizedFlatlist';
import {useDispatch, useSelector} from 'react-redux';
import priceFormat from '../../utils/priceFormat';
import CalculateProfitLoss from '../../utils/CalculateProfitLoss';
import {color} from '../../common/color';
import {font} from '../../common/Font';
import Seperator from '../../component/Seperator/Seperator';
import ErrorMessage from '../../component/ErrorMessage/ErrorMessage';
import checkNonEmpty from '../../utils/checkNonEmpty';
import Loader from '../../component/Loader/Loader';
import Icon from 'react-native-vector-icons/AntDesign';
import PostAPI from '../../api/PostAPI';
import Icons from 'react-native-vector-icons/Entypo';
import {getWatchList} from '../../redux/slice/StockDataSlice';
import Spinner from '../../component/Spinner/Spinner';
import DeleteAPI from '../../api/DeleteAPI';
import {fill} from 'lodash';

const SearchPage = ({navigation}) => {
  const {watchList, searchedStocks, searchLoading, searchStocksFailed} =
    useSelector(state => state.stockData);
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);

  const renderItem = ({item, index}) => {
    const isPositive = item?.changePercent >= 0;
    const isPriceChanged = item?.regularMarketPrice > item?.previousClose;
    const isUsed = watchList.find(res => res.symbol === item.symbol);

    const addWatch = async symbol => {
      try {
        let data = {
          symbol,
        };
        setLoader(true);
        const res = await PostAPI.addToWatchList(data);
        console.log(res);
        await dispatch(getWatchList({navigation}));
        setLoader(false);
      } catch (error) {
        console.log(error);
        Alert.alert(error?.message);
        setLoader(false);
      }
    };

    const removeWatch = async symbol => {
      try {
        setLoader(true);
        const res = await DeleteAPI.deleteWatchItem(symbol);
        console.log(res);
        await dispatch(getWatchList({navigation}));
        setLoader(false);
      } catch (error) {
        console.log(error);
        Alert.alert(error?.message);
        setLoader(false);
      }
    };

    return (
      <Pressable
        style={styles.itemContainer}
        onPress={() =>
          navigation.navigate('BankDetails', {
            symbol: item.symbol,
          })
        }>
        {/* <View style={styles.iconContainer}>{item.icon}</View> */}
        <View style={styles.textContainer}>
          <Text style={styles.bankName}>{item.symbol}</Text>
          <Text style={styles.nse}>{item.name}</Text>
        </View>
        <View style={styles.priceContainer}>
          <Text style={[styles.price]}>
            {priceFormat(item.regularMarketPrice)}
          </Text>
          <View style={styles.resultContainer}>
            {item?.changePercent ? (
              <Text
                style={[
                  styles.price,
                  {
                    color: isPositive ? color.color_green : color.color_red,
                  },
                ]}>{`(${item?.changePercent.toFixed(2)}%)`}</Text>
            ) : (
              CalculateProfitLoss({
                initialValue: item?.previousClose,
                finalValue: item?.regularMarketPrice,
              })
            )}
          </View>
        </View>
        <Pressable
          //   disabled={isUsed}
          onPress={() =>
            isUsed ? removeWatch(item?.symbol) : addWatch(item?.symbol)
          }
          style={styles.priceContainer}>
          {/* <Text style={{fontSize: 30}}>+</Text> */}
          <Icon name={isUsed ? 'heart' : 'hearto'} size={22} />
        </Pressable>
      </Pressable>
    );
  };
  return (
    <View style={styles.container}>
      <CustomSearch />
      <Spinner visible={loader} text={'Adding to watch list'} />
      <Seperator />
      {searchLoading ? (
        <Loader loading={searchLoading} />
      ) : searchStocksFailed ? (
        <ErrorMessage
          //   apiToCall={getWatchList}
          message={searchStocksFailed?.message}
        />
      ) : checkNonEmpty(searchedStocks) ? (
        <OptimizedFlatlist
          contentContainerStyle={{gap: 10}}
          renderItem={renderItem}
          data={searchedStocks}
        />
      ) : (
        <>
          <View style={{width: '100%', height: '100%'}}>
            <View
              style={{
                flexDirection: 'row',
                marginVertical: 10,
                justifyContent: 'space-around',
              }}>
              {/* <TouchableOpacity
                style={{
                  borderColor: color.color_gray,

                  borderStyle: 'solid',
                  borderWidth: 1,
                  paddingVertical: 5,

                  width: '40%',
                  borderRadius: 100,
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: 10,
                  flexDirection: 'row',
                }}
                onPress={() => navigation.navigate('OptionChain')}>
                <Icons name={'line-graph'} />
                <Text
                  style={{
                    fontSize: 18,
                  }}>
                  Options
                </Text>
              </TouchableOpacity> */}
              <TouchableOpacity
                style={{
                  borderColor: color.color_gray,

                  borderStyle: 'solid',
                  borderWidth: 1,
                  paddingVertical: 5,

                  width: '40%',
                  borderRadius: 100,
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: 10,
                  flexDirection: 'row',
                }}
                onPress={() => navigation.navigate('Futures')}>
                <Icons name={'line-graph'} />
                <Text
                  style={{
                    fontSize: 18,
                  }}>
                  Future
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginVertical: 10,
                justifyContent: 'space-around',
              }}>
              <TouchableOpacity
                style={{
                  borderColor: color.color_gray,
                  borderStyle: 'solid',
                  borderWidth: 1,
                  paddingVertical: 5,

                  width: '40%',
                  borderRadius: 100,
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: 10,
                  flexDirection: 'row',
                }}
                onPress={() => navigation.navigate('MCXMaket')}>
                <Icons name={'line-graph'} />

                <Text
                  style={{
                    fontSize: 18,
                  }}>
                  MCX
                </Text>
              </TouchableOpacity>
              {/* <TouchableOpacity
                style={{
                  borderColor: color.color_gray,

                  borderStyle: 'solid',
                  borderWidth: 1,
                  paddingVertical: 5,

                  width: '50%',
                  borderRadius: 100,
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: 10,
                  flexDirection: 'row',
                }}>
                <Icons name={'line-graph'} />
                <Text
                  style={{
                    fontSize: 18,
                  }}>
                  Future
                </Text>
              </TouchableOpacity> */}
            </View>
            <View
              style={[
                styles.container,
                {justifyContent: 'center', alignItems: 'center'},
              ]}>
              <Text>Search Something...</Text>
            </View>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: color.color_lightblue, padding: 20},
  containerSec: {
    backgroundColor: color.color_white,
    paddingHorizontal: 15,
    flex: 1,
    paddingVertical: 15,
    gap: 10,
    zIndex: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: 18,
    fontFamily: font.nunitobold,
    color: color.color_black,
  },
  seeAllText: {
    fontSize: 15,
    fontFamily: font.nunitoregular,
    color: color.color_darkblue,
  },
  itemContainer: {
    backgroundColor: color.color_white,
    borderRadius: 12,
    flexDirection: 'row',
    // justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 10,
    flex: 1,
    gap: 30,
  },
  iconContainer: {
    alignSelf: 'center',
  },
  textContainer: {
    flexDirection: 'column',
    flex: 1,
    paddingLeft: 10,
    alignSelf: 'center',
  },
  bankName: {
    fontSize: 14,
    fontFamily: font.nunitoregular,
    fontWeight: 'bold',
    paddingTop: 2,
    color: color.color_black,
  },
  nse: {
    fontSize: 13,
    fontFamily: font.nunitoregular,
    fontWeight: '600',
    color: color.color_limit,
  },
  priceContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    zIndex: 10,
  },
  price: {
    fontSize: 15,
    fontFamily: font.nunitoregular,
    fontWeight: '600',
    paddingTop: 2,
    textAlign: 'center',
  },
  resultContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  result: {
    fontSize: 13,
    fontFamily: font.nunitoregular,
    fontWeight: '600',
    color: color.color_black,
    textAlign: 'center',
  },
  ltp: {
    fontSize: 13,
    fontFamily: font.nunitoregular,
    fontWeight: '600',
    textAlign: 'center',
  },
  bracket: {
    fontSize: 13,
    fontFamily: font.nunitoregular,
    fontWeight: '600',
    color: color.color_black,
    textAlign: 'center',
  },
});

export default SearchPage;
