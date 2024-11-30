// const baseURL = 'https://papertrading-qrht.onrender.com';
// const baseURL = 'https://paper-trading-server.onrender.com';
// https://vertex-fx.onrender.com
const baseURL = 'https://protradex-backend.onrender.com';

export const AUTH = {
  REGISTER: `${baseURL}/user/register`,
  LOGIN: `${baseURL}/user/login`,
  SEND_OTP: `${baseURL}/user/sendotp`,
  VERIFY_OTP: `${baseURL}/user/verifyotp`,
  USER_PROFILE: `${baseURL}/user/getuserprofile`,
};

export const STOCK = {
  WATCH_LIST: `${baseURL}/market/getwatchlist/`,
  ADD_WATCHLIST: `${baseURL}/market/addtowatchlist`,
  DELETE_WATCHLIST: `${baseURL}/market/removewatchlistitem/`,
  BUY_STOCK: `${baseURL}/market/buy`,
  SELL_STOCK: `${baseURL}/market/sell`,
  STOCK_HISTORY: `${baseURL}/market/getmystockhistory`,
  MY_STOCKS: `${baseURL}/market/getmystocks`,
  DECODE_STOCK_DATA: `${baseURL}/market/decodestockdata`,
  SQUARE_OFF: `${baseURL}/market/squareoff`,
  DELETE_STOCK: `${baseURL}/market/deletestock/`,
  GET_OPTION_DATA: symbol =>
    `https://www.nseindia.com/api/option-chain-indices?symbol=${symbol}`,
  GET_ONE_STOCK_DATA: symbol =>
    `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}`,
  SEARCH_STOCKS: symbol =>
    `https://query2.finance.yahoo.com/v1/finance/search?q=${symbol}&lang=en-US&region=IN&quotesCount=3&newsCount=0&listsCount=0&enableFuzzyQuery=false&quotesQueryId=tss_match_phrase_query&multiQuoteQueryId=multi_quote_single_token_query&enableCb=false&enableNavLinks=false&enableEnhancedTrivialQuery=false&enableResearchReports=false&enableCulturalAssets=false&enableLogoUrl=false&researchReportsCount=0`,
};
