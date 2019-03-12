import React from 'react';
import { Constants } from 'expo';
import { Platform, StyleSheet, View } from 'react-native';

export default class MeasureLayout extends React.Component {

state = {
  layout: null,
};

handleLayout = event => {
  const { nativeEvent : { layout } } = event;

  this.setState({
    layout: {
      ...layout,
      y:
        layout.y + (Platform.OS ==='android' ? Constants.statusBarHeight : 0),
    },
  });
};

render() {
  const { children } = this.props;
  const { layout } = this.state;

  if(!layout) {
    return (
      <View onLayout={this.handleLayout} style={styles.container} />
    );
  }

  return children(layout);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
