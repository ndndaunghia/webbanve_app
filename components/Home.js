/* @flow */

import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  ScrollView,
  Switch,
} from 'react-native';

// librarys
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Store from '../store/Store';
import Communications from 'react-native-communications';

// components
import FindTickets from './FindTickets';

@observer
export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      finish: false,
    };
  }

  componentDidMount() {
    // get place data
    Store.getAirportData();
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <FindTickets
            ref={ref => (this.ref_ticket = ref)}
            navigation={this.props.navigation}
          />
        </ScrollView>

        <View style={styles.boxBtnChat}>
          <TouchableHighlight
            onPress={() => {
              if (isLinkChatTawkto(Store.site_data.chat_url)) {
                this.props.navigation.navigate('open_web', {
                  title: 'Hỗ trợ trực tuyến',
                  url: Store.site_data.chat_url,
                });
              } else {
                Communications.web(Store.site_data.chat_url);
              }
            }}
            underlayColor="transparent">
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 20,
                backgroundColor: '#fa6d01',
                width: 48,
                height: 48,
                borderRadius: 24,
              }}>
              <Ionicons name="chatbubbles" size={24} color="#fff" />
            </View>
          </TouchableHighlight>
        </View>
        <View style={styles.boxBtnSearch}>
          <TouchableHighlight
            onPress={() => this.ref_ticket.onSearch()}
            underlayColor="transparent">
            <View style={styles.btnSearchContent}>
              <Text style={styles.textBtnSearch}>Tìm kiếm</Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  boxBtnSearch: {
    width: Util.size.width,
    alignItems: 'center',
    marginBottom: 40,
  },
  boxBtnChat: {
    width: Util.size.width,
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  btnSearchContent: {
    width: Util.size.width * 0.916,
    height: Util.size.width * 0.916 * 0.1515,
    backgroundColor: '#fa6d01',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  textBtnSearch: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});
