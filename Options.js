import React from 'react';
import { StyleSheet, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import FriendDetailsListItem from './FriendDetailsListItem';
import colors from './utils/colors';

export default class Options extends React.Component {
  static navigationOptions = ({ navigation: { goBack } }) => ({
    title: 'Options',
    headerLeft: (
      <MaterialIcons
        name="close"
        size={24}
        style={{ color: colors.black, marginLeft: 10 }}
        onPress={() => goBack()}
      />
    ),
  });

  render() {
    return (
      <View style={styles.container}>
        <FriendDetailsListItem title="Update Profile" />
        <FriendDetailsListItem title="Change Language" />
        <FriendDetailsListItem title="Sign Out" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
