import {StyleSheet} from 'react-native';
import {font} from '../../common/Font';
import {color} from '../../common/color';

export const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: color.color_lightblue},
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
    backgroundColor: color.color_lightblue,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 10,
    flex: 1,
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
    fontWeight: '600',
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
