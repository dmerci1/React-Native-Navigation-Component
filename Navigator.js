import React from 'react';
import { createStackNavigator, createAppContainer, createBottomTabNavigator, createDrawerNavigator } from 'react-navigation';
import colors from './utils/colors';
import { MaterialIcons } from '@expo/vector-icons';

import Contacts from './Contacts';
import Profile from './Profile';
import User from './User';
import Favorites from './Favorites';
import Options from './Options';
import Chat from './Chat';

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


const ChatScreen = createStackNavigator(
  {
    Chat: {
      screen: Chat,
    },

  },
  {
    initialRouteName: 'Chat',
    navigationOptions: {
    drawerIcon: getDrawerItemIcon('chat'),
    },
  },
);
const DrawerNav = createDrawerNavigator({
  Contacts: {
    screen: ContactsScreen,

  },
  Favorites: {
    screen: FavoritesScreen,

  },
  User: {
    screen: UserScreen,
  },
  Chat: {
    screen: Chat,
  },
},
  { initialRouteName: 'Contacts',


  });

  const ContactsScreen2 = createStackNavigator(
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

  const FavoritesScreen2 = createStackNavigator(
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
  const UserScreen2 = createStackNavigator(
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

  const TabNav = createBottomTabNavigator({
    Contacts: {
      screen: ContactsScreen2,

    },
    Favorites: {
      screen: FavoritesScreen2,

    },
    User: {
      screen: UserScreen2,
    },
  },
    { initialRouteName: 'Contacts',


    });
    const AppNavigator = createDrawerNavigator({
    //  DrawerNav: {
      //  screen: DrawerNav,

    //},
    Contacts: {
      screen: ContactsScreen,

    },
    Favorites: {
      screen: FavoritesScreen,

    },
    User: {
      screen: UserScreen,
    },
    Chat: {
      screen: Chat,
    },
  },
    { initialRouteName: 'Chat',


    });



export default createAppContainer(AppNavigator);
