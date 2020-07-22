import * as Constant from '@src/actions/constants';
import {
  EditScanState,
  EditScanActionProps,
} from '@src/types/screens/editScan';

const initialState: EditScanState = {
  // document screen number
  activePage: 0,
  pdfDocument: null,
  showNameChangeForm: false,
  documentModified: false,
  confirmModificationRejection: false,
  showPageReorder: false,
  showColorOptions: false,
  applyColorToAll: false,
  showDeletePageWarning: false,
  showRecropOnImage: false,
};

export default function reducer(state = initialState, action: EditScanActionProps) {
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
    case Constant.EDIT_DOCUMENT_NAME:
    case Constant.SET_DOCUMENT_NAME:
    case Constant.SET_DOCUMENT_NAME:
    case Constant.REQUEST_DISCARD_CHANGES:
    case Constant.REJECT_DISCARD_CHANGES:
    case Constant.DISCARD_CHANGES:
    case Constant.SWAP_PAGE:
    case Constant.REORDER_PAGES:
    case Constant.RECROP_PAGE:
    case Constant.ROTATE_PAGE:
    case Constant.SHOW_COLOR_OPTIONS:
    case Constant.HIDE_COLOR_OPTIONS:
    case Constant.SET_PAGE_COLOR:
    case Constant.DELETE_PAGE_REQUEST:
    case Constant.DELETE_PAGE_REJECT:
    case Constant.DELETE_PAGE:
      return {
        ...state,
        ...restProps,
      };
    default:
      return state;
  }
}
