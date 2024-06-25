import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  ColorPropType,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {styles} from './styles';
import {font} from '../../common/Font';
import {color} from '../../common/color';
import Drawer from '../../../assets/svg/drawer';
import CustomSearch from '../../component/CustomSearchview/CustomSearch';
import Bell from '../../../assets/svg/bell';
import WatchListTopTab from '../watchlisttoptab/WatchListTopTab';
import {LineChart} from 'react-native-chart-kit';
import Reliance from '../../../assets/svg/reliance';
import Cadila from '../../../assets/svg/cadila';
import Axis from '../../../assets/svg/axis';
import Parle from '../../../assets/svg/parle';
import Hdfc from '../../../assets/svg/hdfc';
import Yes from '../../../assets/svg/yes';
import {useDispatch, useSelector} from 'react-redux';
import {
  getWatchList,
  setStockListSocket,
} from '../../redux/slice/StockDataSlice';
import CalculateProfitLoss from '../../utils/CalculateProfitLoss';
import Refresh from '../../component/Refresh/Refresh';
import Seperator from '../../component/Seperator/Seperator';
import getSocketData from '../../utils/getSocketData';
import checkNonEmpty from '../../utils/checkNonEmpty';
import priceFormat from '../../utils/priceFormat';
import ErrorMessage from '../../component/ErrorMessage/ErrorMessage';
import Loader from '../../component/Loader/Loader';
import OptimizedFlatlist from '../../component/OptimizedFlatlist.js/OptimizedFlatlist';
import Debounce from '../../utils/Debounce';

const WatchlistScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {watchList, watchListFailed, loading, stockListSocket, searchedStocks} =
    useSelector(state => state.stockData);

  const renderItem = ({item, index}) => {
    const isPositive = item?.changePercent >= 0;
    const isPriceChanged = item?.regularMarketPrice > item?.previousClose;
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() =>
          navigation.navigate('BankDetails', {
            symbol: item.symbol,
          })
        }>
        {/* <View style={styles.iconContainer}>{item.icon}</View> */}
        <View style={styles.textContainer}>
          <Text style={styles.bankName}>{item.symbol}</Text>
          <Text style={styles.nse}>NSE</Text>
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
      </TouchableOpacity>
    );
  };

  return (
    <>
      {loading ? (
        <Loader loading={loading} />
      ) : watchListFailed ? (
        <ErrorMessage
          apiToCall={getWatchList}
          message={watchListFailed?.message}
        />
      ) : checkNonEmpty(watchList) ? (
        <SafeAreaView style={styles.container}>
          {/* <ScrollView> */}
          <View style={{flexDirection: 'row', marginTop: 10}}>
            <TouchableOpacity
              style={{paddingLeft: 20, paddingRight: 15, paddingTop: 15}}
              onPress={() => navigation.openDrawer()}>
              <Drawer />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('SearchPage')}
              style={{flex: 1, marginRight: 10}}>
              <CustomSearch editable={false} />
            </TouchableOpacity>
          </View>
          <Seperator seperate={15} />
          <View style={styles.containerSec}>
            <View style={styles.headerContainer}>
              <Text style={styles.headerText}>Stocks</Text>
            </View>
            <OptimizedFlatlist
              contentContainerStyle={{gap: 10}}
              renderItem={renderItem}
              data={stockListSocket}
            />
            {/* <FlatList
                nestedScrollEnabled
                // refreshControl={<Refresh apiToRefresh={getWatchList} />}

                renderItem={renderItem}
                keyExtractor={(_, i) => i.toString()}
              /> */}
            {/* <View
            style={{
              borderBottomColor: color.color_gray,
              borderBottomWidth: 1,
              paddingTop: 20,
              flex: 1,
            }}
          />

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingTop: 20,
            }}>
            <Text
              style={{
                fontSize: 18,
                fontFamily: font.nunitobold,
                color: color.color_black,
              }}>
              Most Active Stock
            </Text>
            <Text
              style={{
                fontSize: 15,
                fontFamily: font.nunitoregular,
                color: color.color_darkblue,
              }}>
              See All
            </Text>
          </View>
          <FlatList
            data={MOSTDATA}
            renderItem={({item, index}) => (
              <TouchableOpacity
                style={{
                  backgroundColor: color.color_lightblue,
                  borderRadius: 12,
                  flexDirection: 'row',
                  marginTop: 10,
                  justifyContent: 'space-between',
                  paddingHorizontal: 10,
                  paddingVertical: 10,
                }}
                onPress={() => navigation.navigate('BankDetails')}>
                <View style={{alignSelf: 'center'}}>{item.icon}</View>
                <View
                  style={{
                    flexDirection: 'column',
                    flex: 1,
                    paddingLeft: 10,
                    alignSelf: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: font.nunitoregular,
                      fontWeight: '600',
                      paddingTop: 2,
                      color: color.color_black,
                    }}>
                    {item.bankname}
                  </Text>
                  <Text
                    style={{
                      fontSize: 13,
                      fontFamily: font.nunitoregular,
                      fontWeight: '600',

                      color: color.color_limit,
                    }}>
                    {item.nse}
                  </Text>
                </View>

                <LineChart
                  data={item.data}
                  width={200}
                  height={50}
                  withDots={false}
                  withInnerLines={false}
                  withOuterLines={false}
                  withHorizontalLabels={false}
                  chartConfig={{
                    backgroundColor: '#EDF1F9',
                    backgroundGradientFrom: '#EDF1F9',
                    backgroundGradientTo: '#EDF1F9',

                    color: (opacity = 0) => '#219653',
                  }}
                  style={{
                    flex: 1,
                    right: 30,
                    zIndex: -1,
                    alignItems: 'center',
                    bottom: 10,
                  }}
                  bezier
                />

                <View style={{flexDirection: 'column'}}>
                  <Text
                    style={{
                      fontSize: 15,
                      fontFamily: font.nunitoregular,
                      fontWeight: '600',
                      paddingTop: 2,
                      color: item.colorstatus,
                      textAlign: 'center',
                      alignSelf: 'flex-end',
                    }}>
                    {item.prise}
                  </Text>

                  <View style={{flexDirection: 'row'}}>
                    <Text
                      style={{
                        fontSize: 13,
                        fontFamily: font.nunitoregular,
                        fontWeight: '600',

                        color: color.color_black,
                        textAlign: 'center',
                      }}>
                      {item.result}
                    </Text>
                    <Text
                      style={{
                        fontSize: 13,
                        fontFamily: font.nunitoregular,
                        fontWeight: '600',
                        color: item.colorstatus,
                        textAlign: 'center',
                      }}>
                      {item.ltp}
                    </Text>
                    <Text
                      style={{
                        fontSize: 13,
                        fontFamily: font.nunitoregular,
                        fontWeight: '600',
                        color: color.color_black,
                        textAlign: 'center',
                      }}>
                      {item.bracket}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={item => item.id}
          />

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingTop: 20,
            }}>
            <Text
              style={{
                fontSize: 18,
                fontFamily: font.nunitobold,
                color: color.color_black,
              }}>
              Recent Visited Stocks
            </Text>
            <Text
              style={{
                fontSize: 15,
                fontFamily: font.nunitoregular,
                color: color.color_darkblue,
              }}>
              See All
            </Text>
          </View>

          <View
            style={{
              backgroundColor: color.color_lightblue,
              borderRadius: 12,
              flexDirection: 'row',
              marginTop: 10,
              justifyContent: 'space-around',
              paddingHorizontal: 10,
              paddingVertical: 10,
              marginBottom: 30,
            }}>
            <View
              style={{
                height: '100%',
                width: 2,
                backgroundColor: color.color_red,
              }}
            />
            <View style={{flexDirection: 'column', paddingLeft: 5}}>
              <Text
                style={{
                  fontSize: 9,
                  color: color.color_black,
                  fontFamily: font.montserratregular,
                }}>
                TCS
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: color.color_red,
                  fontFamily: font.montserratregular,
                }}>
                215.15
              </Text>
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{
                    fontSize: 8,
                    fontFamily: font.nunitoregular,
                    color: color.color_black,
                  }}>
                  +13.00(
                </Text>
                <Text
                  style={{
                    fontSize: 8,
                    fontFamily: font.nunitoregular,
                    color: color.color_red,
                  }}>
                  +0.14%
                </Text>
                <Text
                  style={{
                    fontSize: 8,
                    fontFamily: font.nunitoregular,
                    color: color.color_black,
                  }}>
                  )
                </Text>
              </View>
            </View>

            <View
              style={{
                height: '100%',
                width: 2,
                backgroundColor: color.color_green,
              }}
            />
            <View style={{flexDirection: 'column', paddingLeft: 5}}>
              <Text
                style={{
                  fontSize: 9,
                  color: color.color_black,
                  fontFamily: font.montserratregular,
                }}>
                WIPRO
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: color.color_green,
                  fontFamily: font.montserratregular,
                }}>
                456.40
              </Text>
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{
                    fontSize: 8,
                    fontFamily: font.nunitoregular,
                    color: color.color_black,
                  }}>
                  +13.00(
                </Text>
                <Text
                  style={{
                    fontSize: 8,
                    fontFamily: font.nunitoregular,
                    color: color.color_green,
                  }}>
                  +0.01%
                </Text>
                <Text
                  style={{
                    fontSize: 8,
                    fontFamily: font.nunitoregular,
                    color: color.color_black,
                  }}>
                  )
                </Text>
              </View>
            </View>

            <View
              style={{
                height: '100%',
                width: 2,
                backgroundColor: color.color_green,
              }}
            />
            <View style={{flexDirection: 'column', paddingLeft: 5}}>
              <Text
                style={{
                  fontSize: 9,
                  color: color.color_black,
                  fontFamily: font.montserratregular,
                }}>
                SUNPHARMA
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: color.color_green,
                  fontFamily: font.montserratregular,
                }}>
                895.78
              </Text>
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{
                    fontSize: 8,
                    fontFamily: font.nunitoregular,
                    color: color.color_black,
                  }}>
                  +52.00(
                </Text>
                <Text
                  style={{
                    fontSize: 8,
                    fontFamily: font.nunitoregular,
                    color: color.color_green,
                  }}>
                  +2.52%
                </Text>
                <Text
                  style={{
                    fontSize: 8,
                    fontFamily: font.nunitoregular,
                    color: color.color_black,
                  }}>
                  )
                </Text>
              </View>
            </View>

            <View
              style={{
                height: '100%',
                width: 2,
                backgroundColor: color.color_red,
              }}
            />
            <View style={{flexDirection: 'column', paddingLeft: 5}}>
              <Text
                style={{
                  fontSize: 9,
                  color: color.color_black,
                  fontFamily: font.montserratregular,
                }}>
                CIPLA
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: color.color_red,
                  fontFamily: font.montserratregular,
                }}>
                1454.78
              </Text>
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{
                    fontSize: 8,
                    fontFamily: font.nunitoregular,
                    color: color.color_black,
                  }}>
                  +15.00(
                </Text>
                <Text
                  style={{
                    fontSize: 8,
                    fontFamily: font.nunitoregular,
                    color: color.color_red,
                  }}>
                  +5.52%
                </Text>
                <Text
                  style={{
                    fontSize: 8,
                    fontFamily: font.nunitoregular,
                    color: color.color_black,
                  }}>
                  )
                </Text>
              </View>
            </View>
          </View> */}
          </View>
          {/* </ScrollView> */}
        </SafeAreaView>
      ) : (
        <></>
      )}
    </>
  );
};

export default WatchlistScreen;
