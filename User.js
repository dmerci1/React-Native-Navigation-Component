import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { fetchUserContact } from './utils/api';
import colors from './utils/colors';

import FriendThumbnail from './FriendThumbnail';

export default class User extends React.Component {
  static navigationOptions = ({ navigation: { navigate } }) => ({
    title: 'Me',
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: colors.blue,
    },
    headerRight: (
      <MaterialIcons
        name="settings"
        size={24}
        style={{ color: 'white', marginRight: 10 }}
        onPress={() => navigate('Options')}
      />
    )
  });

  state = {
    user: [],
    loading: true,
    error: false
  };

  async componentDidMount() {
    try {
      const user = await fetchUserContact();

      this.setState({
        user,
        loading: false,
        error: false,
      });
    } catch (e) {
      this.setState({
        loading: false,
        error: true,
      });
    }
    }

    render() {
      const { loading, user, error } = this.state;
      const { avatar, name, phone } = user;

      return (
        <View style={styles.container}>
          {loading && <ActivityIndicator size="large" />}
          {error && <Text>Error...</Text>}

          {!loading &&
             (
              <FriendThumbnail
                avatar={avatar}
                name={name}
                phone={phone}
              />
          )}
          </View>
      );
    }
  }

  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.blue,
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
    },
  });
