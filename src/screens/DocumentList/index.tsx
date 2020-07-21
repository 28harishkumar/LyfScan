import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';


class DocumentList extends React.PureComponent {
  render() {
    return (
      <View>
        <Text>Document List is next in queue</Text>
      </View>
    );
  }
}

export default connect(state => ({}))(DocumentList);
