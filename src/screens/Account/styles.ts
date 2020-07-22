import { StyleSheet } from 'react-native';
import colors from '@src/core/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 50,
    backgroundColor: colors.primary,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerContent: {
    flexDirection: 'row',
  },
  headerIcon: {
    margin: 10,
    marginHorizontal: 16,
  },
  logoText: {
    color: colors.secondaryText,
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  userProfile: {
    height: 100,
  },
});
