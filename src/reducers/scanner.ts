import { ScannerState } from './types/screen';

const initialState: ScannerState = {
  activeTab: 2,
};

export default function reducer(state = initialState, action: { type: String }) {
  switch (action.type) {
    case 'SHOW_DOCUMENT_SCAN':
      return {
        ...state,
        activeTab: 2,
      };
    default:
      return state;
  }
}
