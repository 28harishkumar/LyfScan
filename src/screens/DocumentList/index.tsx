import React from 'react';
import { connect } from 'react-redux';
import * as actions from '@src/actions/documentList';
import { Component } from './component';
import { DocumentListState, FolderProps } from '@src/types/screens/docoumentList';
import { SavedDocumentProps } from '@src/types/doc';

type Props = DocumentListState & {
  navigation: any;
  selectViewDocument: (doc: SavedDocumentProps) => void;
  refreshDocuments: (folderId: string) => void;
  createFolder: (folder: FolderProps) => void;
  setSearchOpen: (value: boolean) => void;
  filterDocuments: (name: string) => void;
  modifyDocument: (pdfDocuemnt: SavedDocumentProps) => void;
};

class DocumentList extends React.PureComponent<Props> {
  setViewDocument = (doc: SavedDocumentProps) => {
    this.props.selectViewDocument(doc);
  }

  openSearch = () => {
    this.props.setSearchOpen(true);
  }

  closeSearch = () => {
    this.props.setSearchOpen(false);
  }

  onSearch = (text: string) => {
    this.props.filterDocuments(text);
  }

  createFolder = () => {
    const { currentFolder } = this.props;
    this.props.createFolder(currentFolder);
  }

  refreshDocuments = () => {
    const { currentFolder } = this.props;
    this.props.refreshDocuments(currentFolder.folderId);
  }

  openCamera = () => {
    this.props.navigation.goBack();
  }

  showPreferences = () => {
    this.props.navigation.navigate('Account');
  }

  modifyDocument = (doc: SavedDocumentProps) => {
    this.props.modifyDocument(doc);
    this.props.navigation.navigate('EditScan');
  }

  render() {
    return (
      <Component
        tabIndex={this.props.tabIndex}
        currentFolder={this.props.currentFolder}
        showSearch={this.props.showSearch}
        viewDocument={this.props.viewDocument}
        setViewDocument={this.setViewDocument}
        openSearch={this.openSearch}
        closeSearch={this.closeSearch}
        createFolder={this.createFolder}
        refreshDocuments={this.refreshDocuments}
        openCamera={this.openCamera}
        showPreferences={this.showPreferences}
        modifyDocument={this.modifyDocument}
      />
    );
  }
}

const mapStateToProps = state => state.documentList;

const mapDispatchToProps = dispatch => ({
  refreshDocuments: folderId => dispatch(actions.refreshDocuments(folderId)),
  selectViewDocument: doc => dispatch(actions.selectViewDocument(doc)),
  createFolder: folderId => dispatch(actions.createFolder(folderId)),
  setSearchOpen: value => dispatch(actions.setSearchOpen(value)),
  filterDocuments: name => dispatch(actions.filterDocuments(name)),
  modifyDocument: doc => dispatch(actions.modifyDocument(doc)),
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(DocumentList);
