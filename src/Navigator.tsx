import React from 'react';
import {
  Image,
  StyleSheet,
} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import { BottomTabBar } from 'containers';
import { palette } from 'constants/style';

import HomeScreen from './screens/HomeScreen';
import SearchScreen from './screens/SearchScreen';
import ChattingScreen from './screens/ChattingScreen';
import CreateStoryScreen from './screens/CreateStoryScreen';
import ProfileScreen from './screens/ProfileScreen';
import EditProfileScreen from './screens/EditProfileScreen';
import MessageScreen from './screens/MessageScreen';
import MyStoryScreen from './screens/MyStoryScreen';
import TagStoryScreen from './screens/TagStoryScreen';
import WebViewScreen from './screens/WebViewScreen';

const MainTabNavigator = createBottomTabNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      tabBarIcon: (options) => (
        <Image
          source={{ uri: `ic_home${options.focused ? '_active' : ''}` }}
          style={[styles.icon, { tintColor: options.tintColor! }]}
        />
      ),
    },
  },
  Search: {
    screen: SearchScreen,
    navigationOptions: {
      tabBarIcon: (options) => (
        <Image
          source={{ uri: `ic_search${options.focused ? '_active' : ''}` }}
          style={[styles.icon, { tintColor: options.tintColor! }]}
        />
      ),
    },
  },
  Add: {
    screen: () => null,
    navigationOptions: {
      tabBarIcon: () => (
        <Image
          source={{ uri: 'ic_add_active' }}
          style={[styles.icon, { tintColor: palette.gray[10] }]}
        />
      ),
      tabBarOnPress: ({ navigation }: { navigation: any }) => navigation.navigate('CreateStory'),
    },
  },
  Chatting: {
    screen: ChattingScreen,
    navigationOptions: {
      tabBarIcon: (options) => (
        <Image
          source={{ uri: `ic_chat${options.focused ? '_active' : ''}` }}
          style={[styles.icon, { tintColor: options.tintColor! }]}
        />
      ),
    },
    params: {
      private: true,
    },
  },
  Profile: {
    screen: ProfileScreen,
    navigationOptions: {
      tabBarIcon: (options) => (
        <Image
          source={{ uri: `ic_profile${options.focused ? '_active' : ''}` }}
          style={[styles.icon, { tintColor: options.tintColor! }]}
        />
      ),
    },
    params: {
      private: true,
    },
  },
}, {
  tabBarComponent: BottomTabBar,
  tabBarOptions: {
    activeTintColor: palette.gray[10],
    inactiveTintColor: palette.gray[40],
    showLabel: false,
  },
  initialRouteName: 'Home',
});

const MainStackNavigator = createStackNavigator({
  MainTab: MainTabNavigator,
  Message: MessageScreen,
  TagStory: TagStoryScreen,
  MyStory: MyStoryScreen,
  EditProfile: EditProfileScreen,
}, {
  headerMode: 'none',
  initialRouteName: 'MainTab',
});

const ModalNavigator = createStackNavigator({
  MainStack: MainStackNavigator,
  CreateStory: {
    screen: CreateStoryScreen,
    navigationOptions: {
      gesturesEnabled: false,
    },
  },
  WebView: WebViewScreen,
}, {
  headerMode: 'none',
  mode: 'modal',
  initialRouteName: 'MainStack',
});

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
});

export default createAppContainer(ModalNavigator);
