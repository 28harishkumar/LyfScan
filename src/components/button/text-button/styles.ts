import { StyleSheet, Platform } from 'react-native';

const style = ('android' === Platform.OS) ? {
  textAlignVertical: 'center',
  includeFontPadding: false,
} : {};

const styles = StyleSheet.create({
  container: {
    height: 36,
    minWidth: 64,
    paddingHorizontal: 8,
  },

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
