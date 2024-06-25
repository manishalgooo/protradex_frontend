import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  ColorPropType,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {styles} from './styles';
import {font} from '../../common/Font';
import {color} from '../../common/color';
import Drawer from '../../../assets/svg/drawer';
import CustomSearch from '../../component/CustomSearchview/CustomSearch';
import OrderTopTab from '../orderTopTab/OrderTopTab';
import Intraday from '../orderTopTab/Intraday';
import Delivery from '../orderTopTab/Delivery';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import TopTab from '../orderTopTab/TopTab';
import {useDispatch} from 'react-redux';
import {changeTopTabStatus} from '../../redux/slice/StockDataSlice';

const OrderScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [focus, setFocus] = useState(1);
  return (
    <SafeAreaView style={styles.container}>
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
      <View style={{height: 50, flexDirection: 'row'}}>
        <TouchableOpacity
          onPress={() => {
            setFocus(1);
            dispatch(changeTopTabStatus(true));
          }}
          style={style.topTabView(focus === 1)}>
          <Text style={style.topTabText(focus === 1)}>Intraday</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setFocus(2);
            dispatch(changeTopTabStatus(false));
          }}
          style={style.topTabView(focus === 2)}>
          <Text style={style.topTabText(focus === 2)}>Delivery</Text>
        </TouchableOpacity>
      </View>
      {/* <TopTab /> */}
      <View style={{flex: 1}}>
        <OrderTopTab />
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  topTabView: focus => ({
    width: '50%',
    borderBottomWidth: 2,
    borderBottomColor: focus ? color.color_green : color.color_gray,
    justifyContent: 'center',
    alignItems: 'center',
  }),
  topTabText: focus => ({color: focus ? color.color_green : color.color_black}),
});

export default OrderScreen;
