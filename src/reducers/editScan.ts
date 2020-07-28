import * as Constant from '@src/actions/constants';
import {
  EditScanState,
  EditScanActionProps,
} from '@src/types/screens/editScan';

const initialState: EditScanState = {
  // document screen number
  activePage: 0,
  pdfDocument: null,
  shouldShowNameForm: false,
  documentModified: false,
  confirmModificationRejection: false,
  showPageReorder: false,
  showColorOptions: false,
  applyColorToAll: false,
  showDeletePageWarning: false,
  showRecropOnImage: false,
};

export default function reducer(state = initialState, action: EditScanActionProps): EditScanState {
  const { type: actoinType, ...restProps } = action;

  switch (actoinType) {
    case Constant.RESET_EDIT_SCAN_STATE:
      return {
        ...initialState,
      };
      break;
    case Constant.MODIFY_DOCUMENT:
      return {
        ...initialState,
        ...restProps,
      };
    case Constant.REQUEST_DISCARD_CHANGES:
      return {
        ...state,
        confirmModificationRejection: true,
      };
    case Constant.REJECT_DISCARD_CHANGES:
      return {
        ...state,
        confirmModificationRejection: false,
      };
    case Constant.SHOW_DOCUMENT_NAME_FORM:
    case Constant.SET_SCAN_DOCUMENT_NAME:
    case Constant.SWAP_PAGE:
    case Constant.REORDER_PAGES:
    case Constant.TOGGLE_CROP_MODAL:
    case Constant.RECROP_PAGE:
    case Constant.SHOW_COLOR_OPTIONS:
    case Constant.HIDE_COLOR_OPTIONS:
    case Constant.DELETE_PAGE_REQUEST:
    case Constant.DELETE_PAGE_REJECT:
    case Constant.DELETE_PAGE:
      return {
        ...state,
        ...restProps,
      };
    case Constant.ROTATE_PAGE:
    case Constant.SET_PAGE_COLOR:
    case Constant.REPLACE_PAGE:
      return {
        ...state,
        documentModified: true,
        ...restProps,
      };
    default:
      return state;
  }
}
