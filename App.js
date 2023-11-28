'use strict';

import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Platform,
  StatusBar,
  PanResponder,
  BackHandler,
  Alert,
  TouchableHighlight,
  SafeAreaView,
  LogBox,
} from 'react-native';
LogBox.ignoreAllLogs();
// disable font scaling
// Text.defaultProps.allowFontScaling=false;

// constant, helper
import './lib/Constant';
import './lib/Helper';

if (isIOS) {
  StatusBar.setBarStyle('light-content');
}

// import Communications from 'react-native-communications';
import Communications from './Communications/Communications';
import {OneSignal} from 'react-native-onesignal';

// store
import Store from './store/Store';

// components
// import MenuIcon from './images/menu_burger.png';
import DrawerContent from './components/DrawerContent';
import NavButton from './components/NavButton';

import Home from './components/Home';
import Chat from './components/Chat';
import Customer from './components/Customer';

import ChatNavBar from './components/ChatNavBar';

import Place from './components/Place';
import PlaceNavBar from './components/PlaceNavBar';

import DatePicker from './components/DatePicker';
import DatePickerNavBar from './components/DatePickerNavBar';

import Result from './components/Result';
import ResultNavBar from './components/ResultNavBar';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import openWeb from './components/OpenWeb';
import {Provider} from 'mobx-react';

const getSceneProps = {
  navigationBarStyle: {
    backgroundColor: NAVBAR_COLOR,
  },
  navBarButtonColor: '#ffffff',
};

const drawerRightIcon = props => {
  var {hideChatBtn} = props;

  return (
    <View style={styles.rightIconbox}>
      {!hideChatBtn && (
        <NavButton
          label="Chat"
          icon="chatbubbles"
          size={24}
          onPress={openChat}
        />
      )}

      <NavButton
        label="Gọi"
        icon="call"
        size={24}
        onPress={() => {
          Communications.phonecall(Store.site_data.tel, true);
        }}
      />
    </View>
  );
};

const openChat = () => {
  if (isLinkChatTawkto(Store.site_data.chat_url)) {
    navigation.navigate('open_web', {
      title: 'Hỗ trợ trực tuyến',
      url: Store.site_data.chat_url,
      // type: ActionConst.REPLACE
    });
  } else {
    Communications.web(Store.site_data.chat_url);
  }
};

const drawerIcon = props => {
  return (
    <View style={styles.drawerIconBox}>
      <NavButton
        viewLayout
        style={styles.drawerIconBtn}
        icon="menu"
        size={30}
      />
    </View>
  );
};

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
export default class App extends Component<{}> {
  constructor(properties) {
    super(properties);
    OneSignal.initialize('a8645232-8f65-4967-8aaa-25cd0c96e204');
    OneSignal.Notifications.requestPermission(true);
    OneSignal.Notifications.addEventListener('received', this.onReceived);
    OneSignal.Notifications.addEventListener('opened', this.onOpened);
    OneSignal.Notifications.addEventListener('ids', this.onIds);
    this.state = {
      finish: false,
    };
  }

  componentWillMount() {
    OneSignal.Notifications.addEventListener('received', this.onReceived);
    OneSignal.Notifications.addEventListener('opened', this.onOpened);
    OneSignal.Notifications.addEventListener('ids', this.onIds);
  }
  onReceived(notification) {
    console.log('Notification received: ', notification);
  }

  onOpened(openResult) {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
  }

  onRegistered(notifData) {
    console.log(
      'Device had been registered for push notifications!',
      notifData,
    );
  }

  onIds(device) {
    console.log('Device info: ', device);
  }

  componentDidMount() {
    this._getData();
  }

  _getData = async () => {
    try {
      var response = await APIHandler.site_info();
      if (response && response.status == STATUS_SUCCESS) {
        action(() => {
          Store.setSiteData(response.data);
        })();
      }
    } catch (e) {
      console.warn(e);
    } finally {
      this.setState({
        finish: true,
      });

      layoutAnimation();
    }
  };

  DrawerStack = ({navigation}) => {
    return (
      <Drawer.Navigator
        drawerContent={() => {
          return <DrawerContent navigation={navigation} />;
        }}
        options={{}}
        screenOptions={{
          headerStyle: {
            backgroundColor: NAVBAR_COLOR,
            flex: 1,
          },
          headerTintColor: '#fff',
        }}>
        <Drawer.Screen
          name="home"
          component={Home}
          options={{
            title: 'Tìm chuyến bay',
            headerRight: props => {
              return drawerRightIcon(props);
            },
          }}
          {...getSceneProps}
        />
        <Drawer.Screen
          name="chat"
          component={Chat}
          options={{title: 'Hỗ trợ trực tuyến'}}
          {...getSceneProps}
        />
        <Drawer.Screen
          name="open_web"
          component={openWeb}
          options={({route}) => ({
            title: route?.params?.title,
            headerRight: props => {
              return drawerRightIcon(props);
            },
          })}
          {...getSceneProps}
        />
      </Drawer.Navigator>
    );
  };

  render() {
    var {finish} = this.state;

    if (finish == false) {
      return (
        <View style={styles.container}>
          <Indicator size="small" />
        </View>
      );
    }

    return (
      <Provider store={Store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="drawer"
              component={this.DrawerStack}
              options={{
                headerShown: false,
                headerRight: props => {
                  return drawerRightIcon(props);
                },
              }}
            />
            <Stack.Group
              screenOptions={{
                presentation: 'card',
              }}>
              <Stack.Screen
                name="place"
                component={Place}
                options={{
                  header: ({navigation, route, options, back}) => {
                    return (
                      <PlaceNavBar {...route.params} navigation={navigation} />
                    );
                  },
                }}
                {...getSceneProps}
              />
              <Stack.Screen
                name="date_picker"
                component={DatePicker}
                options={{
                  header: ({navigation, route, options, back}) => {
                    return (
                      <DatePickerNavBar
                        title="Chọn ngày"
                        navigation={navigation}
                      />
                    );
                  },
                }}
              />
              <Stack.Screen
                name="result"
                component={Result}
                options={({route}) => ({
                  header: ({navigation, route, options, back}) => {
                    return (
                      <ResultNavBar
                        navigation={navigation}
                        title={route?.params?.title}
                      />
                    );
                  },
                })}
                {...getSceneProps}
              />
              <Stack.Screen
                name="chat_modal"
                component={Chat}
                options={{
                  header: ({navigation, route, options, back}) => {
                    return (
                      <ChatNavBar
                        title="Hỗ trợ trực tuyến"
                        navigation={navigation}
                      />
                    );
                  },
                }}
              />
            </Stack.Group>
            <Stack.Group
              screenOptions={{
                presentation: 'transparentModal',
              }}>
              <Stack.Screen
                name="customer"
                component={Customer}
                options={{
                  title: 'Hành khách',
                  headerShown: false,
                }}
              />
            </Stack.Group>
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  tabBarStyle: {
    borderTopWidth: Util.pixel,
    borderColor: '#cccccc',
    backgroundColor: 'white',
    opacity: 1,
  },
  drawerIconBox: {
    height: '100%',
    justifyContent: 'center',
  },
  drawerIconBtn: {
    marginTop: isIOS ? -4 : 0,
  },
  rightIconbox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
