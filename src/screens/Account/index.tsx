import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import { Component } from './component';


// TODO:
type Props = any;

class Account extends React.PureComponent<Props> {
  goToDocuments = () => this.props.navigation.goBack();

  openCamera = () => this.props.navigation.popToTop();

  render() {
    return (
      <Component
        goToDocuments={this.goToDocuments}
        openCamera={this.openCamera}
      />
    );
  }
}

const mapStateToProps = state => state.account || {};

const mapDispatchToProps = dispatch => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(Account);
