import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  TextInput,
} from 'react-native';
import PropTypes from 'prop-types';

import Icon from 'react-native-vector-icons/Ionicons';
import {withSafeAreaInsets} from 'react-native-safe-area-context';

class ResultNavBar extends Component {
  constructor(props) {
    super();
  }

  componentWillMount() {}

  render() {
    var {title} = this.props;

    return (
      <View
        style={[
          styles.container,
          {
            // height: NAV_HEIGHT,
            // paddingTop: this.props.insets.top,
          },
        ]}>
        <View style={styles.leftNav}>
          <View style={styles.btnCloseBox}>
            <TouchableHighlight
              style={styles.btnClose}
              onPress={() => {
                this.props.navigation.goBack();
              }}
              underlayColor="transparent">
              <Icon name="close" size={24} color="rgba(255,255,255,.6)" />
            </TouchableHighlight>
          </View>
        </View>

        <View style={styles.centerNav}>
          <Text style={styles.title}>{title}</Text>
        </View>
      </View>
    );
  }
}

const NAV_HEIGHT = isIOS ? 64 : 54;

const styles = StyleSheet.create({
  container: {
    height: NAV_HEIGHT,
    flexDirection: 'row',
    paddingTop: isIOS ? 20 : 0,
    borderBottomWidth: Util.pixel,
    borderBottomColor: '#828287',
    backgroundColor: DEFAULT_COLOR,
  },
  centerNav: {
    flex: 4,
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  leftNav: {
    flex: 1,
  },
  title: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  btnCloseBox: {
    width: 60,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnClose: {
    padding: 8,
  },
  btnTitle: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '600',
  },
});

export default withSafeAreaInsets(ResultNavBar);
