/* @flow */

import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  FlatList,
  Animated,
} from 'react-native';

import PropTypes from 'prop-types';

// lib
import Icon from 'react-native-vector-icons/Ionicons';

export default class Customer extends Component {
  static propTypes = {
    onSelected: PropTypes.func,
    nguoi_lon: PropTypes.number,
    tre_em: PropTypes.number,
    tre_so_sinh: PropTypes.number,
  };

  static defaultProps = {
    onSelected: value => value,
  };

  constructor(props) {
    super(props);

    var {nguoi_lon, tre_em, tre_so_sinh} = props.route.params;

    this.state = {
      opacity: new Animated.Value(0),
      bottom: new Animated.Value(-100),
      nguoi_lon: nguoi_lon || 0,
      tre_em: tre_em || 0,
      tre_so_sinh: tre_so_sinh || 0,
    };
  }

  componentDidMount() {
    Animated.timing(this.state.opacity, {
      duration: 250,
      toValue: 1,
      // useNativeDriver: true,
    }).start();

    Animated.timing(this.state.bottom, {
      duration: 250,
      toValue: 0,
      // useNativeDriver: true,
    }).start();
  }

  _onClose = () => {
    Animated.timing(this.state.bottom, {
      duration: 250,
      toValue: -100,
      // useNativeDriver: true,
    }).start();

    Animated.timing(this.state.opacity, {
      duration: 250,
      toValue: 0,
      // useNativeDriver: true,
    }).start(this.props.navigation.goBack());
  };

  _valid = (key, prefix) => {
    var pers = this.state[key];

    var vaild = CUSTOMER_VALID;

    var {min, max} = vaild[key];

    if (prefix == '-') {
      return pers > min;
    } else if (prefix == '+') {
      return pers < max;
    } else {
      console.warn('Error prefix _valid func');
    }
  };

  _onSave() {
    if (this.props.route.params.onSelected) {
      var {nguoi_lon, tre_em, tre_so_sinh} = this.state;

      this.props.route.params.onSelected({
        nguoi_lon,
        tre_em,
        tre_so_sinh,
      });
    }

    this._onClose();
  }

  render() {
    var {nguoi_lon, tre_em, tre_so_sinh} = this.state;
    return (
      <Animated.View
        style={[
          styles.container,
          {
            opacity: this.state.opacity,
            bottom: this.state.bottom,
          },
        ]}>
        <View style={styles.headerBackdrop}>
          <View style={styles.headerContent}>
            <View style={styles.header}>
              <Text style={styles.title}>Hành khách</Text>
              <View style={styles.leftNav}>
                <View style={styles.btnCloseBox}>
                  <TouchableHighlight
                    style={styles.btnClose}
                    onPress={this._onClose}
                    underlayColor="transparent">
                    <Icon
                      name="close"
                      size={38}
                      color="rgba(255,255,255,.6)"
                    />
                  </TouchableHighlight>
                </View>
              </View>
            </View>

            <View
              style={[
                styles.headerRows,
                {
                  marginTop: 20,
                },
              ]}>
              <View style={styles.leftContent}>
                <Text style={styles.labelRow}>Người lớn</Text>
                <Text style={styles.subLabel}>Trên 12 tuổi</Text>
              </View>

              <View style={styles.rightContent}>
                <TouchableHighlight
                  onPress={() => {
                    if (!this._valid('nguoi_lon', '-')) {
                      return;
                    }
                    this.setState({
                      nguoi_lon: nguoi_lon > 0 ? --nguoi_lon : 0,
                    });
                  }}
                  style={styles.actionButtonBox}
                  underlayColor="transparent">
                  <View style={styles.actionButton}>
                    <Icon
                      style={styles.btnActionIcon}
                      name="remove"
                      size={26}
                      color={DEFAULT_COLOR}
                    />
                  </View>
                </TouchableHighlight>

                <Text style={styles.textQuantity}>{nguoi_lon}</Text>

                <TouchableHighlight
                  onPress={() => {
                    if (!this._valid('nguoi_lon', '+')) {
                      return;
                    }
                    this.setState({
                      nguoi_lon: ++nguoi_lon,
                    });
                  }}
                  style={styles.actionButtonBox}
                  underlayColor="transparent">
                  <View style={styles.actionButton}>
                    <Icon
                      style={styles.btnActionIcon}
                      name="add"
                      size={26}
                      color={DEFAULT_COLOR}
                    />
                  </View>
                </TouchableHighlight>
              </View>
            </View>

            <View style={styles.headerRows}>
              <View style={styles.leftContent}>
                <Text style={styles.labelRow}>Trẻ em</Text>
                <Text style={styles.subLabel}>2 tới 12 tuổi</Text>
              </View>

              <View style={styles.rightContent}>
                <TouchableHighlight
                  onPress={() => {
                    if (!this._valid('tre_em', '-')) {
                      return;
                    }
                    this.setState({
                      tre_em: tre_em > 0 ? --tre_em : 0,
                    });
                  }}
                  style={styles.actionButtonBox}
                  underlayColor="transparent">
                  <View style={styles.actionButton}>
                    <Icon
                      style={styles.btnActionIcon}
                      name="remove"
                      size={26}
                      color={DEFAULT_COLOR}
                    />
                  </View>
                </TouchableHighlight>

                <Text style={styles.textQuantity}>{tre_em}</Text>

                <TouchableHighlight
                  onPress={() => {
                    if (!this._valid('tre_em', '+')) {
                      return;
                    }
                    this.setState({
                      tre_em: ++tre_em,
                    });
                  }}
                  style={styles.actionButtonBox}
                  underlayColor="transparent">
                  <View style={styles.actionButton}>
                    <Icon
                      style={styles.btnActionIcon}
                      name="add"
                      size={26}
                      color={DEFAULT_COLOR}
                    />
                  </View>
                </TouchableHighlight>
              </View>
            </View>

            <View style={styles.headerRows}>
              <View style={styles.leftContent}>
                <Text style={styles.labelRow}>Trẻ sơ sinh</Text>
                <Text style={styles.subLabel}>0-2 tuổi, không ghế</Text>
              </View>

              <View style={styles.rightContent}>
                <TouchableHighlight
                  onPress={() => {
                    if (!this._valid('tre_so_sinh', '-')) {
                      return;
                    }
                    this.setState({
                      tre_so_sinh: tre_so_sinh > 0 ? --tre_so_sinh : 0,
                    });
                  }}
                  style={styles.actionButtonBox}
                  underlayColor="transparent">
                  <View style={styles.actionButton}>
                    <Icon
                      style={styles.btnActionIcon}
                      name="remove"
                      size={26}
                      color={DEFAULT_COLOR}
                    />
                  </View>
                </TouchableHighlight>

                <Text style={styles.textQuantity}>{tre_so_sinh}</Text>

                <TouchableHighlight
                  onPress={() => {
                    if (!this._valid('tre_so_sinh', '+')) {
                      return;
                    }
                    this.setState({
                      tre_so_sinh: ++tre_so_sinh,
                    });
                  }}
                  style={styles.actionButtonBox}
                  underlayColor="transparent">
                  <View style={styles.actionButton}>
                    <Icon
                      style={styles.btnActionIcon}
                      name="add"
                      size={26}
                      color={DEFAULT_COLOR}
                    />
                  </View>
                </TouchableHighlight>
              </View>
            </View>

            <View style={styles.boxBtnSearch}>
              <TouchableHighlight
                onPress={this._onSave.bind(this)}
                underlayColor="transparent">
                <View style={styles.btnSearchContent}>
                  <Text style={styles.textBtnSearch}>Xong</Text>
                </View>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </Animated.View>
    );
  }
}

const MENU_WIDTH = Util.size.width * 0.859;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 100,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  header: {
    width: '100%',
    height: 54,
    backgroundColor: DEFAULT_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: Util.pixel,
    borderBottomColor: '#828287',
  },
  headerContent: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: '100%',
    height: 360,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    overflow: 'hidden',
  },
  headerBackdrop: {
    width: '100%',
    height: '100%',
  },
  leftNav: {
    position: 'absolute',
    left: 0,
    height: '100%',
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnClose: {
    padding: 8,
  },
  btnTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  title: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },

  headerRows: {
    width: '100%',
    minHeight: 40,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  actionButton: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: '#f1f1f1',
    overflow: 'hidden',
  },
  actionButtonBox: {
    padding: 8,
  },

  leftContent: {
    width: '50%',
    height: '100%',
    paddingLeft: 15,
  },
  labelRow: {
    fontSize: 16,
    color: '#000000',
    marginTop: 8,
  },
  subLabel: {
    fontSize: 12,
    color: '#999999',
    marginTop: 4,
  },

  rightContent: {
    width: '50%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: '4%',
  },
  textQuantity: {
    color: '#404040',
    fontSize: 16,
    fontWeight: '600',
  },

  boxBtnSearch: {
    width: Util.size.width,
    alignItems: 'center',
    marginTop: 40,
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
  btnActionIcon: {
    marginTop: isIOS ? 2 : 0,
  },
});
