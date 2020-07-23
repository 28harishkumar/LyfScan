import { StyleSheet } from 'react-native';
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
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#dddddd',
    height: 200,
  },
  docContainerLeft: {
    marginRight: 4,
  },
  docContainerRight: {
    marginLeft: 4,
  },
  documentThumb: {
    height: 150,
    width: '100%',
  },
  pdfModal: {
    flex: 1,
  },
});
