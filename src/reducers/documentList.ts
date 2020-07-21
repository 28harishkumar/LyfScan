import * as Constant from '@src/actions/constants';
import {
  DocumentListState,
  DocumentListActionProps,
} from '@src/types/screens/docoumentList';

const initialState: DocumentListState = {
  tabIndex: 1,
  contacts: [],
  currentFolder: null,
  showSearch: false,
  searchText: null,
  selectedDocument: null,
  selectedDocumentIndex: null,
  numberOfLoadedDocuments: 0,
  viewDocument: null,
};

export default function reducer(state = initialState, action: DocumentListActionProps) {
  const { type: actoinType, ...restProps } = action;

  switch (actoinType) {
    case Constant.DOCUMENTS_TAB_CHANGE:
    case Constant.SHOW_DOCUMENT_SEARCH:
    case Constant.HIDE_DOCUMENT_SEARCH:
    case Constant.SEARCH_TEXT_CHANGE:
    case Constant.VIEW_DOCUMENT:
    case Constant.LYFSCAN_DOCUMENT_SHARE:
    case Constant.RENAME_DOCUMENT:
    case Constant.DELETE_DOCUMENT_REQUEST:
    case Constant.DELETE_DOCUMENT_REJECT:
    case Constant.DELETE_DOCUMENT:
    case Constant.MOVE_TO_FOLDER:
    case Constant.SELECT_DOCUMENT:
    case Constant.REFRESH_DOCUMENTS:
    case Constant.LOAD_MORE_DOCUMENTS:
      return {
        ...state,
        ...restProps,
      };
    default:
      return state;
  }
}
