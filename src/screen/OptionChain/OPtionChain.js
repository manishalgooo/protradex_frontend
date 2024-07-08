import React, {useEffect, useRef, useState} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import Appheader from '../../component/AppHeader/appheader';
import {WebView} from 'react-native-webview';
import {styles} from './styles';
import SelectOptions from './SelectOptions';
const OPtionChain = ({navigation}) => {
  const indexes = ['NIFTY', 'FINNIFTY', 'BANKNIFTY', 'MIDCPNIFTY'];
  const isInitialRender = useRef(true);
  const [date, setDate] = useState(new Date());
  const firstSymbol = 'Choose symbol';
  const [symbols, setSymbols] = useState([]);
  const [selectedInstrument, setSelectedInstrument] = useState(indexes[0]);
  const [instrumentData, setInstrumentData] = useState({});
  const getSymbols = async () => {
    try {
      const res = await fetch(
        `https://option-chain-data.onrender.com/symbols`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.json();

      return data;
    } catch (error) {
      console.error('Error fetching symbol list:', error);
    }
  };
  const getInstrumentData = async (instrument, type) => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/chain?${type}=${instrument}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.json();
      return data;
    } catch (error) {
      console.error('Error fetching index or symbol detail:', error);
    }
  };
  useEffect(() => {
    (async () => {
      const instrumentRes = await getInstrumentData(
        selectedInstrument,
        'index',
      );
      setInstrumentData(instrumentRes);

      const res = await getSymbols();
      console.log('symbols :>> ', res);
      setInitialSymbols([...res]);
      setSymbols([firstSymbol, ...res]);
    })();
  }, []);
  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }
    (async () => {
      const isIndexSelected = indexes.includes(selectedInstrument);
      if (isIndexSelected) {
        setSymbols([firstSymbol]);
      }
      const instrumentRes = await getInstrumentData(
        selectedInstrument,
        isIndexSelected ? 'index' : 'symbol',
      );
      setInstrumentData(instrumentRes);
      // it is written again to reset the symbol if index is selected
      if (isIndexSelected) {
        setSymbols([firstSymbol, ...initialSymbols]);
      }
    })();
  }, [selectedInstrument]);

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Appheader onPress={() => navigation.goBack()} header="Option Chain" />
        <SelectOptions
          options={indexes}
          bottomText={'Select Index'}
          handleSelectChange={setSelectedInstrument}
        />
        <Text>OR</Text>
        <SelectOptions
          options={symbols}
          bottomText={'Select Symbol'}
          handleSelectChange={setSelectedInstrument}
        />
      </SafeAreaView>
    </>
  );
};

export default OPtionChain;
