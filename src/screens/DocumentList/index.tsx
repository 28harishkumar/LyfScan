import React from 'react';
import { connect } from 'react-redux';
import {
  refreshDocuments, selectViewDocument,
} from '@src/actions/documentList';
import { Component } from './component';
import { DocumentListState } from '@src/types/screens/docoumentList';
import { SavedDocumentProps } from '@src/types/doc';

type Props = DocumentListState & {
  navigation: any;
  selectViewDocument: (doc: SavedDocumentProps) => void;
};

class DocumentList extends React.PureComponent<Props> {
  setViewDocument = (doc: SavedDocumentProps) => {
    const { selectViewDocument: selectDocument } = this.props;

    selectDocument(doc);
  }

  render() {
    return (
      <Component
        currentFolder={this.props.currentFolder}
        showSearch={this.props.showSearch}
        viewDocument={this.props.viewDocument}
        setViewDocument={this.setViewDocument}
      />
    );
  }
}

const mapStateToProps = state => state.documentList;

const mapDispatchToProps = dispatch => ({
  refreshDocuments: folderId => dispatch(refreshDocuments(folderId)),
  selectViewDocument: doc => dispatch(selectViewDocument(doc)),
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(DocumentList);
