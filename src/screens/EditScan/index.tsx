import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';


class EditScan extends React.PureComponent {
  render() {
    return (
      <View>
        <Text>Edit Document is in progress</Text>
      </View>
    );
  }
}

export default connect(state => ({}))(EditScan);
