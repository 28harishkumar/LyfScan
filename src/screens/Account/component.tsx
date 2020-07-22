import React from 'react';
import {
  View,
  Text,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';
import colors from '@src/core/colors';
import BottomNavigation from '@src/components/BottomNavigation';
import Ripple from '@src/components/ripple';

type Props = {
  goToDocuments: () => void;
  openCamera: () => void;
};

export class Component extends React.PureComponent<Props> {
  renderHeader = () => {
    return (
      <View style={styles.header}>
        <Ripple
          onPress={this.props.goToDocuments}
          style={styles.headerContent}>
          <MaterialIcons
            name='home'
            size={25}
            style={styles.headerIcon}
            color={colors.secondaryIcon}
          />
          <Text style={styles.logoText}>Account</Text>
        </Ripple>
      </View>
    );
  }
  renderUserProfile = () => {
    return (
      <View style={styles.userProfile}>

      </View>
    );
  }
  renderPreferences = () => {
    return (
      <View style={styles.container}>

      </View>
    );
  }
  renderFooter = () => {
    const {
      goToDocuments,
      openCamera,
    } = this.props;

    return (
      <BottomNavigation
        onIconPress={[
          goToDocuments,
          openCamera,
          () => {},
        ]}
        activeIndex={2}
      />
    );
  }

  render() {
    return (
      <React.Fragment>
        {this.renderHeader()}
        {this.renderUserProfile()}
        {this.renderPreferences()}
        {this.renderFooter()}
      </React.Fragment>
    );
  }
}
