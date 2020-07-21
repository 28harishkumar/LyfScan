import React from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';

type Props = {
  navigation: any;
};

class EditDocument extends React.PureComponent<Props> {
  render() {
    return (
      <View>
        <Text>Under Development!</Text>
      </View>
    );
  }
}

const mapStateToProps = state => state.scanner;

const mapDispatchToProps = dispatch => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(EditDocument);
