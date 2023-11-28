/* @flow */

import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SectionList,
  TouchableHighlight,
  SafeAreaView,
} from 'react-native';
import PropTypes from 'prop-types';

import Store from '../store/Store';
import Loading from './Loading';
import {observer} from 'mobx-react';

class Place extends Component {
  static propTypes = {
    onSelected: PropTypes.func,
  };
  constructor(props) {
    super(props);

    this.state = {
      place_data: Store.place_data,
      formattedList: [],
    };
  }

  static defaultProps = {
    onSelected: value => value,
  };

  static onEnter = () => {};

  static onExit = () => {
    action(() => {
      Store.setPlaceData(Store.place_data_static);
    })();
  };

  refreshingPlaceList = () => {
    action(() => {
      Store.setPlaceData(Store.place_data_static);
    })();
  };

  componentDidMount() {
    this.props.navigation.setParams({
      onChangeText: this._onChangeText,
    });
  }

  componentWillUnmount() {
    this.refreshingPlaceList();
  }

  _onChangeText = value => {
    clearTimeout(this._timerSearch);
    if (value) {
      this._timerSearch = setTimeout(() => {
        Store.getAirportData(
          {
            query: value,
          },
        );
      }, 300);
    } else {
      action(() => {
        Store.setPlaceData(Store.place_data_static);
      })();
    }
  };

  _onSelected(item) {
    this.props.route.params.onSelected(item);
    this.props.navigation.goBack();
  }

  _renderItem = ({item, index}) => {
    return (
      <TouchableHighlight
        onPress={this._onSelected.bind(this, item)}
        underlayColor="transparent">
        <View
          style={{
            height: 60,
            justifyContent: 'center',
            paddingHorizontal: 15,
            backgroundColor: '#ffffff',
            borderBottomWidth: Util.pixel,
            borderColor: '#dddddd',
          }}>
          <Text
            style={{
              fontSize: 16,
              color: '#404040',
            }}>{`${item.city_name_vi}, ${item.country_name_vi}`}</Text>
          <Text
            style={{
              fontSize: 12,
              color: '#999999',
            }}>{`${item.code} - ${item.name_vi}`}</Text>
        </View>
      </TouchableHighlight>
    );
  };

  renderSectionHeader = ({section}) => {
    return (
      <View
        style={{
          backgroundColor: '#f1f1f1',
          justifyContent: 'center',
          paddingHorizontal: 15,
          height: 36,
          borderBottomWidth: Util.pixel,
          borderColor: '#dddddd',
        }}>
        <Text
          style={{
            fontSize: 16,
            color: '#666666',
            fontWeight: '500',
          }}>
          {section.title}
        </Text>
      </View>
    );
  };

  render() {
    let {place_data, formattedList} = Store;
    console.log(place_data);
    return (
      <SafeAreaView style={styles.container}>
        {place_data ? (
          <SectionList
            keyboardShouldPersistTaps="always"
            style={{
              marginBottom: Store.keyboardTop,
            }}
            renderItem={this._renderItem}
            renderSectionHeader={this.renderSectionHeader}
            sections={formattedList}
            keyExtractor={item => item.id}
          />
        ) : (
          <Text>None</Text>
        )}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default observer(Place);
