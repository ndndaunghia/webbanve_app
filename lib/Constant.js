'use strict';

import {
  Platform,
  Dimensions,
  PixelRatio,
} from 'react-native';

// API URL
// global.API_URL = 'http://webbanvemaybay.local/';
global.API_URL = 'https://webbanve.net/';

// width, height of screen
Dimensions.get('window');
const {width, height} = Dimensions.get('window');

/**
* Util
*/
const Util = {
  ratio: PixelRatio.get(),
  pixel: 1 / PixelRatio.get(),
  size: {width, height},
};
global.Util = Util;

/**
* Detect OS
* Use: isAndroid or isIOS returns true if the OS that
*/
global.isAndroid = Platform.OS == 'android';
global.isIOS = Platform.OS == 'ios';

global.GA_ID = '249796517';

// color
global.DEFAULT_COLOR = '#0a4daa';
global.NAVBAR_COLOR = DEFAULT_COLOR;

// Css
global.NAV_HEIGHT = isAndroid ? 54 : 64;

global.STATUS_SUCCESS = 200;

global.CUSTOMER_VALID = {
  nguoi_lon: {min: 1, max: 9},
  tre_em: {min: 0, max: 9},
  tre_so_sinh: {min: 0, max: 2}
}
