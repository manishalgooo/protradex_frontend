import axios from 'axios';
import StorageItems from '../utils/StorageItems';
import {STOCK} from '../utils/baseURL';
import checkInternet from '../utils/checkConnection';

const GetAPI = {
  getOneStockData: async ({data, formattedObj = true}) => {
    return new Promise(async (resolve, reject) => {
      try {
        await checkInternet();
        const url = STOCK.GET_ONE_STOCK_DATA(data);
        const response = await fetch(url);

        const results = await response.json();

        const fullMetaObject = results?.chart?.result[0];

        if (!formattedObj) {
          resolve(fullMetaObject);
        }

        const filteredMetaObject = {
          currency: fullMetaObject?.meta.currency,
          symbol: fullMetaObject?.meta.symbol,
          exchangeName: fullMetaObject?.meta.exchangeName,
          regularMarketPrice: fullMetaObject?.meta.regularMarketPrice,
          // chartPreviousClose: fullMetaObject?.meta.chartPreviousClose,
          previousClose: fullMetaObject?.meta.previousClose,
        };
        resolve(filteredMetaObject);
      } catch (error) {
        if (error?.response?.data?.message) {
          console.log(error?.response?.data?.message);
          reject(error.response.data);
          return;
        }
        console.log(error);
        reject(error);
      }
    });
  },
  getOptoinData: async ({data, formattedObj = true}) => {
    return new Promise(async (resolve, reject) => {
      try {
        await checkInternet();
        const url = STOCK.GET_OPTION_DATA(data);
        const response = await fetch(url);

        const results = await response.json();

        const fullMetaObject = results?.records[0];

        if (!formattedObj) {
          resolve(fullMetaObject);
        }

        // resolve(filteredMetaObject);
      } catch (error) {
        if (error?.response?.data?.message) {
          console.log(error?.response?.data?.message);
          reject(error.response.data);
          return;
        }
        console.log('heheh', error);
        reject(error);
      }
    });
  },
};

export default GetAPI;
