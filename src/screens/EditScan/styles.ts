import { StyleSheet, Dimensions } from 'react-native';
import colors from '@src/core/colors';

const dimensions = Dimensions.get('screen');
const ratio = dimensions.height / dimensions.width;

export default StyleSheet.create({
  fullFlex: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
  },
  header: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.primary,
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
  closeIcon: {
    padding: 16,
  },
  nameForm: {
    flexDirection: 'row',
    paddingLeft: 16,
  },
  nameInput: {
    flex: 1,
    backgroundColor: colors.primaryBg,
    borderRadius: 10,
    paddingHorizontal: 8,
    marginVertical: 8,
  },
  headerIcon: {
    marginVertical: 8,
    marginLeft: 5,
    marginRight: 12,
  },
  nameWrap: {
    flexDirection: 'row',
  },
  cropHeaderTitle: {
    flex: 1,
    color: colors.secondaryText,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 5,
  },
  documentName: {
    color: colors.secondaryText,
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'center',
    paddingVertical: 16,
    width: dimensions.width - 200,
  },
  nameEditIcon: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  saveBtn: {
    backgroundColor: 'transparent',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  saveTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    paddingVertical: 16,
    color: colors.secondaryText,
  },
  pagerWrap: {
    flex: 1,
  },
  pagerContainerWrap: {
    // flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  firstPage: {
    marginLeft: dimensions.width * 0.15,
  },
  lastPage: {
    marginRight: dimensions.width * 0.15,
  },
  page: {
    width: dimensions.width * 0.7,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  activePage: {
    zIndex: 3,
    elevation: 3,
  },
  pageImage: {
    alignSelf: 'center',
  },
  paggingWrap: {
    bottom: 80,
    flexDirection: 'row',
    alignItems: 'center',
  },
  paggingText: {
    padding: 15,
    borderRadius: 40,
    backgroundColor: colors.secondaryBg,
  },
  paggingIcon: {
    padding: 16,
  },
  filterContainer: {
    minHeight: 100,
    width: dimensions.width,
    bottom: 60,
    position: 'absolute',
    backgroundColor: colors.primaryBg,
  },
  filterList: {
    flex: 1,
    backgroundColor: colors.primaryBg,
  },
  filterThumb: {
    margin: 5,
    borderWidth: 1,
    borderColor: colors.primaryBorder,
  },
  cropMeta: {
    textAlign: 'center',
    fontSize: 12,
  },
  switchWrap: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  switch: {
    padding: 12,
    marginRight: 8,
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
});
