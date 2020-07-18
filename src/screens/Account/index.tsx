import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';


class Account extends React.PureComponent {
  render() {
    return (
      <View></View>
    );
  }
}

export default connect(state => ({}))(Account);
