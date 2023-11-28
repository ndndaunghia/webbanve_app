import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  View,
  ViewPropTypes,
  TouchableHighlight,
  FlatList,
  ScrollView,
  Image,
} from 'react-native';

// library
import Icon from 'react-native-vector-icons/Ionicons';
import Store from '../store/Store';
// import Communications from 'react-native-communications';
import Communications from '../Communications/Communications';
import {withSafeAreaInsets} from 'react-native-safe-area-context';

@observer
class DrawerContent extends Component {
  static propTypes = {
    name: PropTypes.string,
    sceneStyle: ViewPropTypes.style,
    title: PropTypes.string,
  };

  static contextTypes = {
    drawer: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.state = {
      currentTabIndex: 0,
    };
  }

  componentDidMount() {}

  _setIndexTab(index) {
    this.setState({
      currentTabIndex: index,
    });
  }

  render() {
    var {currentTabIndex} = this.state;
    return (
      <View style={styles.container}>
        {Store.site_data && (
          <View
            style={{
              width: '100%',
              // height: 110,
              backgroundColor: DEFAULT_COLOR,
              flexDirection: 'row',
              alignItems: 'center',
              // height: NAV_HEIGHT + this.props.insets.top,
              paddingTop: this.props.insets.top,
              paddingBottom: 15,
            }}>
            <Image
              style={{
                width: 60,
                height: 60,
                borderRadius: 30,
                backgroundColor: '#ebebeb',
                overflow: 'hidden',
                marginLeft: 15,
                marginTop: isIOS ? 20 : 0,
                resizeMode: 'contain',
              }}
              source={{uri: Store.site_data.logo_url}}
            />

            <View
              style={{
                padding: 8,
                marginTop: isIOS ? 20 : 0,
                flex: 1,
              }}>
              <Text
                style={{
                  fontWeight: '600',
                  fontSize: 16,
                  color: '#ffffff',
                }}>
                {Store.site_data.name}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: '#ffffff',
                }}>
                {Store.site_data.desc}
              </Text>
            </View>
          </View>
        )}

        <ScrollView>
          {Store.site_data && (
            <FlatList
              style={{
                marginTop: 8,
              }}
              data={[
                {
                  key: 0,
                  title: 'Tìm chuyến bay',
                  icon: 'search',
                  onPress: () => {
                    this.props.navigation.navigate('home');
                  },
                },
                ...Store.site_data.menu,
              ]}
              renderItem={({item, index}) => {
                var isActive = index == currentTabIndex;
                let iconName = item?.icon;
                ['ios-', 'md-'].find(sign => {
                  const hasSign = !!item?.icon?.startsWith?.(sign);
                  if (hasSign) {
                    iconName = item?.icon.replace(sign, '');
                  }
                  return hasSign;
                });
                // console.log(item);

                return (
                  <TouchableHighlight
                    onPress={() => {
                      this._setIndexTab(index);

                      if (item.onPress) {
                        item.onPress();
                      } else if (item.url) {
                        if (item.name == 'chat') {
                          if (isLinkChatTawkto(item.url)) {
                            this.props.navigation.navigate('open_web', {
                              title: item.title,
                              url: item.url,
                            });
                          } else {
                            Communications.web(item.url);
                          }
                        } else {
                          this.props.navigation.navigate('open_web', {
                            title: item.title,
                            url: item.url,
                          });
                        }
                      }
                    }}
                    underlayColor="transparent">
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        backgroundColor: isActive ? '#ebebeb' : '#ffffff',
                        width: '100%',
                        height: 48,
                      }}>
                      <View
                        style={{
                          width: 42,
                          height: '100%',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <Icon
                          name={iconName}
                          size={24}
                          color={isActive ? DEFAULT_COLOR : '#404040'}
                        />
                      </View>

                      <View
                        style={{
                          flex: 1,
                          height: '100%',
                          justifyContent: 'center',
                        }}>
                        <Text
                          style={{
                            fontSize: 16,
                            color: isActive ? DEFAULT_COLOR : '#404040',
                          }}>
                          {item.title}
                        </Text>
                      </View>
                    </View>
                  </TouchableHighlight>
                );
              }}
            />
          )}
        </ScrollView>

        <View
          style={{
            width: '100%',
            paddingHorizontal: 15,
            paddingVertical: 8,
          }}>
          {Store.site_data && (
            <Text
              style={{
                color: '#666666',
                fontSize: 14,
                fontWeight: '600',
              }}>
              {Store.site_data.name}
            </Text>
          )}
          <Text
            style={{
              fontSize: 12,
              color: '#666666',
              marginTop: 2,
            }}>
            Phiên bản phần mềm {DeviceInfo.getVersion()}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});

export default withSafeAreaInsets(DrawerContent);
