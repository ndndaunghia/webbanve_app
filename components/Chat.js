/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import OpenWeb from './OpenWeb';

import Store from '../store/Store';

export default class Chat extends Component {
  render() {
    return (
      <OpenWeb
        {...this.props.passProps}
        title='Hỗ trợ trực tuyến'
        url={Store.site_data.chat_url}
        />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
