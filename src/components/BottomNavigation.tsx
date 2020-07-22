import React from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import colors from '@src/core/colors';
import Ripple from './ripple';

type Props = {
  activeIndex: number;
  onIconPress: (() => void)[];
};

export default class BottomNavigation extends React.PureComponent<Props> {
  render() {
    const { activeIndex, onIconPress } = this.props;
    const {
      highlightIcon,
      primaryIcon,
    } = colors;

    return (
      <View style={styles.container}>
        <Ripple onPress={onIconPress[0]}>
          <Feather
            name='file-text'
            style={styles.icon}
            size={24}
            color={activeIndex === 0 ? highlightIcon : primaryIcon}
           />
        </Ripple>
        <Ripple
          style={styles.cameraIconWrap}
          onPress={onIconPress[1]}>
          <MaterialIcons
            name='camera-alt'
            style={styles.icon}
            size={26}
            color={colors.secondaryIcon}
          />
        </Ripple>
        <Ripple onPress={onIconPress[2]}>
          <MaterialIcons
            name='person-outline'
            style={styles.icon}
            size={24}
            color={activeIndex === 2 ? highlightIcon : primaryIcon}
          />
        </Ripple>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    backgroundColor: colors.primaryBg,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,

    elevation: 24,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  cameraIconWrap: {
    backgroundColor: colors.primary,
    borderRadius: 35,
    top: -20,
  },
  icon: {
    padding: 16,
  },
});
