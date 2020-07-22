// Scanner Actions
export const TAB_CHANGE = 'TAB_CHANGE';
export const POP_UP_CONFIRMED = 'POP_UP_CONFIRMED';
export const OCR_Language_REQUEST = 'OCR_Language_REQUEST';
export const OCR_LANGUAGE_CHANGE = 'OCR_LANGUAGE_CHANGE';
export const FLASH_CHANGE = 'FLASH_CHANGE';
export const AUTO_CAPTURE_CHANGE = 'AUTO_CAPTURE_CHANGE';

export const DOCUMENT_CAPTURED = 'DOCUMENT_CAPTURED';
export const DOCUMENT_ACCEPTED = 'DOCUMENT_ACCEPTED';
export const DOCUMENT_REJECED = 'DOCUMENT_REJECED';
export const SHOW_SCAN_NOT_SAVED_WARNING = 'SHOW_SCAN_NOT_SAVED_WARNING';
export const RESET_SCANNER_STATE = 'RESET_SCANNER_STATE';

// Edit Scan (Edit Document List) Actions
export const RESET_EDIT_SCAN_STATE = 'RESET_EDIT_SCAN_STATE';
export const EDIT_DOCUMENT_NAME = 'EDIT_DOCUMENT_NAME';
export const SET_DOCUMENT_NAME = 'SET_DOCUMENT_NAME';

export const REQUEST_DISCARD_CHANGES = 'REQUEST_DISCARD_CHANGES';
export const REJECT_DISCARD_CHANGES = 'REJECT_DISCARD_CHANGES';
export const DISCARD_CHANGES = 'DISCARD_CHANGES';

export const SWAP_PAGE = 'SWAP_PAGE';
export const ADD_NEW_PAGE = 'ADD_NEW_PAGE';
export const REORDER_PAGES = 'REORDER_PAGES';
export const RECROP_PAGE = 'RECROP_PAGE';
export const ROTATE_PAGE = 'ROTATE_PAGE';
export const SHOW_COLOR_OPTIONS = 'SHOW_COLOR_OPTIONS';
export const HIDE_COLOR_OPTIONS = 'HIDE_COLOR_OPTIONS';
export const SET_PAGE_COLOR = 'SET_PAGE_COLOR';
export const DELETE_PAGE_REQUEST = 'DELETE_PAGE_REQUEST';
export const DELETE_PAGE_REJECT = 'DELETE_PAGE_REJECT';
export const DELETE_PAGE = 'DELETE_PAGE';

// this action will update DocumentList state
export const SAVE_DOCUMENT_PDF = 'SAVE_DOCUMENT_PDF';

// DOCUMENT LIST ACTIONS
export const DOCUMENTS_TAB_CHANGE = 'DOCUMENTS_TAB_CHANGE';
export const SET_DOCUMENT_SEARCH = 'SET_DOCUMENT_SEARCH';
export const SEARCH_TEXT_CHANGE = 'SEARCH_TEXT_CHANGE';
export const VIEW_DOCUMENT = 'VIEW_DOCUMENT';
export const SHARE_DOCUMENT = 'SHARE_DOCUMENT';
export const LYFSCAN_DOCUMENT_SHARE = 'LYFSCAN_DOCUMENT_SHARE';
export const RENAME_DOCUMENT = 'RENAME_DOCUMENT';
export const DELETE_DOCUMENT_REQUEST = 'DELETE_DOCUMENT_REQUEST';
export const DELETE_DOCUMENT_REJECT = 'DELETE_DOCUMENT_REJECT';
export const DELETE_DOCUMENT = 'DELETE_DOCUMENT';
export const MOVE_TO_FOLDER = 'MOVE_TO_FOLDER';
export const SELECT_DOCUMENT = 'SELECT_DOCUMENT';
export const REFRESH_DOCUMENTS = 'REFRESH_DOCUMENTS';
export const LOAD_MORE_DOCUMENTS = 'LOAD_MORE_DOCUMENTS';

// this action is reduced in EditScan Reducer
export const MODIFY_DOCUMENT = 'MODIFY_DOCUMENT';

// DIRECTORY
export const CREATE_FOLDER_REQUEST = 'CREATE_FOLDER_REQUEST';
export const CREATE_FOLDER = 'CREATE_FOLDER';
export const CREATE_FOLDER_CANCEL = 'CREATE_FOLDER_CANCEL';
export const DELETE_FOLDER_REQUEST = 'DELETE_FOLDER_REQUEST';
export const DELETE_FOLDER_CONFIRM = 'DELETE_FOLDER_CONFIRM';
export const DELETE_FOLDER_REJECT = 'DELETE_FOLDER_REJECT';
export const OPEN_FOLDER = 'OPEN_FOLDER';
export const BACK_TO_PARENT_FOLDER = 'BACK_TO_PARENT_FOLDER';

// CONTACT TAB
export const SHOW_CONTACT_DETAILS = 'SHOW_CONTACT_DETAILS';
export const HIDE_CONTACT_DETAILS = 'HIDE_CONTACT_DETAILS';
export const MODIFY_CONTACT_DETAILS = 'MODIFY_CONTACT_DETAILS';
export const UPDATE_CONTACT_DETAILS = 'UPDATE_CONTACT_DETAILS';
export const DELETE_CONTACT_REQUEST = 'DELETE_CONTACT_REQUEST';
export const DELETE_CONTACT_REJECT = 'DELETE_CONTACT_REJECT';
export const DELETE_CONTACT_ACCEPT = 'DELETE_CONTACT_ACCEPT';
export const REFRESH_CONTACTS = 'REFRESH_CONTACTS';
export const LOAD_MORE_CONTACTS = 'LOAD_MORE_CONTACTS';
export const CALL_CONTACT = 'CALL_CONTACT';
export const MAIL_CONTACT =  'MAIL_CONTACT';
export const SMS_CONTACT = 'SMS_CONTACT';
export const SHARE_CONTACT = 'SHARE_CONTACT';

// BOTTOM NAVIGATION
export const GO_TO_SCAN = 'GO_TO_SCAN';
export const GO_TO_ACCOUNT = 'GO_TO_ACCOUNT';
export const GO_TO_DOCUMENT_LIST = 'GO_TO_DOCUMENT_LIST';


