import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator
} from 'react-native';
import store from './Store';

import { fetchContacts } from './utils/api';

import FriendThumbnail from './FriendThumbnail';

const keyExtractor = ({ phone }) => phone;

export default class Favorites extends React.Component {
  static navigationOptions = {
    title: 'Favorites',
  };

  state = {
    contacts: store.getState().contacts,
    loading: store.getState().isFetchingContacts,
    error: store.getState().error,
  };

  async componentDidMount() {
    this.unsubscribe = store.onChange(() =>
    this.setState({
      contacts: store.getState().contacts,
      loading: store.getState().isFetchingContacts,
      error: store.getState().error,
    }),
  );

  if (contact.length === 0) {
    const fetchedContacs = await fetchContacts();

    store.setState({
      contacts: fetchedContacs,
      isFetchingContacts: false
    });
  }
}
  componentWillUnmount() {
    this.unsubscribe();
  }


  renderFavoriteThumbnail = ({ item }) => {
    const { navigation: { navigate } } = this.props;
    const { avatar } = item;

    return (
      <FriendThumbnail
        avatar={avatar}
        onPress={() => navigate('Profile', { contact: item })}
      />
    );
  };

  render() {
    const { loading, contacts, error } = this.state;
    const favorites = contacts.filter(contact => contact.favorite);

    return (
      <View style={styles.container}>
        {loading && <ActivityIndicator size="large" />}
        {error && <Text>Error...</Text>}

        {!loading &&
          !error && (
            <FlatList
              data={favorites}
              keyExtractor={keyExtractor}
              numColumns={3}
              contentContainerStyle={styles.list}
              renderItem={this.renderFavoriteThumbnail}
            />
        )}
        </View>
    );
  }
}
  const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      justifyContent: 'center',
      flex: 1,
    },
    list: {
      alignItems: 'center',
    },
  });
