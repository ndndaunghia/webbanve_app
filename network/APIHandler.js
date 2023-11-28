import {StatusBar} from 'react-native';

import API from './API';
import axios from 'axios';

var HTTP_SUCCESS = 200;

class APIHandler {
  /**
   * Login khi mở app
   */
  async user_login(data) {
    var api = url_for(API.USER_LOGIN);
    return await this.postAPI(api, data);
  }

  /**
   * Lấy dữ liệu trang home
   */
  async user_home() {
    var api = url_for(API.USER_HOME);
    return await this.getAPI(api);
  }

  async search_airport(data) {
    var api = url_for(API.SITE_SEARCH_AIRPORT);
    // console.log('api', api);
    // console.log('data', data);
    return await this.postAPI(api, data);
  }

  async site_info() {
    var api = url_for(API.SITE_INFO);
    return await this.getAPI(api);
  }

  _networkIndicator(flag = true) {
    if (isIOS) {
      StatusBar.setNetworkActivityIndicatorVisible(flag);
    }
  }

  /**
   * Gửi yêu cầu phương thức GET
   */
  async getAPI(api) {
    this._networkIndicator();

    // console.log(api);
    var response = await axios(api);
    return await this.processError(response);
  }

  /**
   * Gửi yêu cầu phương thức POST
   */
  async postAPI(api, data) {
    this._networkIndicator();

    // console.log(api);
    var response = await axios.post(api, encodeQueryData(data));
    return await this.processError(response);
  }

  /**
   * Xử lý ngoại lệ
   */
  async processError(response) {
    this._networkIndicator(false);

    if (response.status != HTTP_SUCCESS) {
      throw 'Error: ' + response.statusText;
    }
    // console.log('--- response: ', JSON.stringify(response.data));
    return response.data;
  }
}

export default new APIHandler();
