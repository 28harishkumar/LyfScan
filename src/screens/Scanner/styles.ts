import { StyleSheet, Dimensions } from 'react-native';
import colors from '@src/core/colors';

export default StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  fullFlex: {
    flex: 1,
  },
  modal: {
    padding: 16,
    backgroundColor: '#ffffff',
    borderRadius: 8,
  },
  modalHead: {
    fontWeight: 'bold',
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#dddddd',
  },
  modalBody: {
    marginVertical: 16,
  },
  modalFooter: {
  },
  header: {
    backgroundColor: colors.primary,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  homeIcon: {
    margin: 8,
  },
  tourBtn: {
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 16,
    paddingRight: 16,
  },
  scanner: {
    flex: 1,
    aspectRatio: undefined,
  },
  button: {
    flex: 1,
    alignSelf: 'center',
    // position: 'absolute',
    bottom: 32,
  },
  tabList: {
    height: 50,
  },
  tabListContainer: {
    paddingHorizontal: Dimensions.get('screen').width / 2 - 50,
  },
  tabView: {
    padding: 13,
    justifyContent: 'center',
  },
  tabText: {
    color: colors.primayText,
    paddingBottom: 5,
  },
  activeTabText: {
    color: colors.highlightText,
    paddingBottom: 5,
  },
  activeTabBorder: {
    height: 3,
    backgroundColor: colors.highlightBorder,
    borderRadius: 4,
  },
  footer: {
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.secondaryBg,
    justifyContent: 'space-around',
  },
  actionIcon: {
    margin: 10,
  },
  captureOffIcon: {
    bottom: -10,
  },
  captureOffText: {
    alignSelf: 'flex-end',
    bottom: 15,
    right: 10,
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.danger,
  },
  captureBtn: {
    backgroundColor: colors.primary,
    padding: 12,
    borderRadius: 28,
  },
  imageDim: {
    width: 40,
    height: 60,
    backgroundColor: colors.layoverBackground,
  },
  cropActionWrap: {
    height: 100,
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: colors.intenseBackground,
  },
  cropNote: {
    paddingBottom: 16,
    color: colors.secondaryText,
  },
  cropBtnWrap: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  retakeBtn: {
    marginRight: 16,
  },
  cropBtnText: {
    color: colors.secondaryText,
    padding: 8,
    fontWeight: 'bold',
  },
  confirmBtn: {
    backgroundColor: colors.primary,
    borderRadius: 16,
    padding: 8,
  },
});
