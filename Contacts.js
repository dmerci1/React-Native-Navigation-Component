import React from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, Linking } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import colors from './utils/colors';
import getURLParams from './utils/getURLParams';

import store from './Store';
import FriendsListItem from './FriendsListItem';

import { fetchContacts } from './utils/api';

const keyExtractor = ({ phone }) => phone;

export default class Contacts extends React.Component {
  static navigationOptions = ({ navigation: { toggleDrawer, navigate } }) => ({
    title: 'Contacts',
    headerLeft: (
      <MaterialIcons
        name="menu"
        size={24}
        style={{ color: colors.black, marginLeft: 10 }}
        onPress={() => toggleDrawer()}
      />
    ),
    headerRight: (
      <MaterialIcons
        name="settings"
        size={24}
        style={{ color: colors.black, marginRight: 10 }}
        onPress={() => navigate('Options')}
      />
    ),
  });

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
      const contacts = await fetchContacts();

      store.setState({ contacts, isFetchingContacts: false });

      Linking.addEventListener('url', this.handleOpenUrl);

      const url = await Linking.getInitialUrl();
      this.handleOpenUrl({ url });

}

componentWillUnmount() {
  this.unsubscribe();
  Linking.removeEventListener('url', this.handleOpenUrl);
}

handleOpenUrl(event) {
  const { navigatio: { navigate } } = this.propTypes
  const { url } = event;
  const params = getURLParams(url);

  if(params.name) {
    const queriedContact = store
      .getState()
      .contacts.find(
        contact =>
          contact.name.split(' ')[0].toLowerCase() ===
          params.name.toLowerCase(),
      );
      if(queriedContact) {
        navigate('Profile', { id: queriedContact.id });
      }
  }
}
renderContact = ({ item }) => {
  const { navigation: { navigate }} = this.props;
  const { id, name, avatar, phone } = item;

  return (
    <FriendsListItem
      name={name}
      avatar={avatar}
      phone={phone}
      onPress={() => navigate('Profile', { contact: item })}
    />
  );
};

render() {
const { loading, contacts, error } = this.state;
const contactsSorted = contacts.sort((a, b) =>
a.name.localeCompare(b.name),
);


return (
  <View style={styles.container}>
    {loading && <ActivityIndicator size="large" />}
    {error && <Text>Error...</Text>}
    {!loading &&
    !error && (
      <FlatList
        data={contactsSorted}
        keyExtractor={keyExtractor}
        renderItem={this.renderContact}
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
});
