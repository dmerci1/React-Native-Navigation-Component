import React from 'react';
import { createStackNavigator, createAppContainer, createBottomTabNavigator, createDrawerNavigator } from 'react-navigation';
import colors from './utils/colors';
import { MaterialIcons } from '@expo/vector-icons';

import Contacts from './Contacts';
import Profile from './Profile';
import User from './User';
import Favorites from './Favorites';
import Options from './Options';

const getDrawerItemIcon = icon => ({ tintColor}) => (
  <MaterialIcons name={icon} size={22} style={{ color: tintColor}} />
);

const ContactsScreen = createStackNavigator(
  {
    Contacts: {
      screen: Contacts,
    },
    Profile: {
      screen: Profile,
    },
  },
  {
    initialRouteName: 'Contacts',
    navigationOptions: {
    drawerIcon: getDrawerItemIcon('list'),
    },
  },
);

const FavoritesScreen = createStackNavigator(
  {
    Favorites: {
      screen: Favorites,
    },
    Profile: {
      screen: Profile,
    },
  },
  {
    initialRouteName: 'Favorites',
    navigationOptions: {
    drawerIcon: getDrawerItemIcon('star'),
    },
  },
);

const UserScreen = createStackNavigator(
  {
    User: {
      screen: User,
    },
    Options: {
      screen: Options,
    },
  },
  {
    mode: 'modal',
    initialRouteName: 'User',
    navigationOptions: {
    drawerIcon: getDrawerItemIcon('person'),
    },
  },
);
const AppNavigator = createDrawerNavigator({
  Contacts: {
    screen: ContactsScreen,

  },
  Favorites: {
    screen: FavoritesScreen,

  },
  User: {
    screen: UserScreen,
  },
},
  { initialRouteName: 'Contacts',


  });

export default createAppContainer(AppNavigator);
