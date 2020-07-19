import { StyleSheet, Platform } from 'react-native';
import RN from 'react-native/package.json';

const style = ('android' === Platform.OS) ? {
  textAlignVertical: 'center',
  includeFontPadding: false,
} : {};


const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    textTransform: 'uppercase',

    backgroundColor: 'transparent',

    fontSize: 14,
    fontWeight: '500',

    ...style,
  },
});

export { styles };
