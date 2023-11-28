import {reaction, observable, observe, computed, autorun, action} from 'mobx';
import autobind from 'autobind-decorator';

import {Keyboard} from 'react-native';

@autobind
class Store {
  constructor() {
    // Keyboard handler
    Keyboard.addListener('keyboardWillShow', this.keyboardWillShow);
    Keyboard.addListener('keyboardWillHide', this.keyboardWillHide);
  }

  @observable keyboardTop = 0;
  @action keyboardWillShow(e) {
    if (e) {
      this.keyboardTop = e.endCoordinates.height;
    }
  }

  @action keyboardWillHide(e) {
    this.keyboardTop = 0;
  }

  @observable site_data = null;

  @action setSiteData(data) {
    this.site_data = data;
  }

  @observable place_data = null;
  @observable place_data_static = null;

  @action setPlaceData(data) {
    this.place_data = data;
  }

  @action setPlaceDataStatic(data) {
    this.place_data_static = data;
  }

  async getAirportData(data, callBackLoading) {
    try {
      var response = await APIHandler.search_airport(data);
      // console.log('response', response.data);
      // console.log("Length: ", response.data[0].data.length);
      // for (let i = 0; i < response.data[0].data.length; i++) {
      //   console.log(
      //     response.data[0].data[i].code,
      //     response.data[0].data[i].city_name_vi,
      //   );
      // }
      if (response && response.status == STATUS_SUCCESS) {
        action(() => {
          if (this.place_data == null) {
            this.setPlaceDataStatic(response.data);
          }
          this.setPlaceData(response.data);
        })();
      }
    } catch (e) {
      console.warn(e);
    } finally {
      callBackLoading();
    }
  }

  @computed get formattedList() {
    return this.place_data
      ?.map?.(v => {
        return {title: v.title, data: v.data.slice()};
      })
      ?.slice?.();
  }

  @observable counter = 1;
  @action setCounter(c){
    this.counter = c;
  }
}

export default new Store();
