import { StyleSheet, Dimensions } from 'react-native';
import colors from '@src/core/colors';

export default StyleSheet.create({
  fullFlex: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 8,
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
  searchInput: {
    flex: 1,
    backgroundColor: colors.primaryBg,
    margin: 5,
    paddingHorizontal: 16,
    marginRight: 0,
    borderRadius: 8,
  },
  tabList: {
    height: 40,
    backgroundColor: colors.primary,
  },
  tabView: {
    paddingTop: 8,
    justifyContent: 'center',
  },
  tabText: {
    color: colors.secondaryText,
    fontWeight: 'bold',
    paddingHorizontal: 13,
    paddingBottom: 5,
  },
  activeTabText: {
    color: colors.secondaryText,
    fontWeight: 'bold',
    paddingHorizontal: 13,
    paddingBottom: 8,
  },
  activeTabBorder: {
    height: 5,
    backgroundColor: colors.secondaryBorder,
    borderRadius: 4,
  },
  documentList: {
    flex: 1,
    backgroundColor: colors.secondaryBg,
  },
  documentListConatainer: {
    paddingBottom: 100,
  },
  emptyContainer: {
    flex: 1,
    padding: 8,
  },
  docContainer: {
    flex: 1,
    margin: 8,
    marginBottom: 0,
    borderWidth: 2,
    borderColor: colors.primaryBorder,
    backgroundColor: colors.primaryBg,
    height: 184,
  },
  docContainerLeft: {
    marginRight: 4,
  },
  docContainerRight: {
    marginLeft: 4,
  },
  documentThumb: {
    height: 120,
    width: '100%',
  },
  docFooter: {
    height: 60,
    backgroundColor: colors.lightBackground,
    flexDirection: 'row',
    alignItems: 'center',
  },
  docInfo: {
    maxWidth: Dimensions.get('screen').width / 2 - 50,
    padding: 8,
  },
  docName: {
    fontSize: 14,
    color: colors.primayText,
    marginBottom: 5,
  },
  docDate: {
    color: colors.primarySubText,
    fontSize: 12,
  },
  docIcon: {
    padding: 8,
  },
  pdfModal: {
    flex: 1,
    paddingVertical: 8,
  },
  actionContainer: {
    height: 60,
    flexDirection: 'row',
    backgroundColor: colors.primaryBg,
    shadowColor: colors.intenseBackground,
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,

    elevation: 24,
  },
  actionWrap: {
    flex: 1,
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionText: {
    paddingTop: 4,
    fontSize: 11,
    color: colors.primayText,
  },
  iconRow: {
    flexDirection: 'row',
    alignContent: 'center',
    paddingBottom: 8,
  },
  menuIcon: {
    marginHorizontal: 16,
  },
  menuText: {
    paddingTop: 4,
  },
});
