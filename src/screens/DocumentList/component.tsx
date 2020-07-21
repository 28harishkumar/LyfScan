import React from 'react';
import {
  TouchableOpacity,
  FlatList,
  View,
  Text,
  Image,
  Alert,
  Modal,
} from 'react-native';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  renderers,
} from 'react-native-popup-menu';
import Pdf from 'react-native-pdf';
import { FolderProps } from '@src/types/screens/docoumentList';
import { SavedDocumentProps } from '@src/types/doc';
import styles from './styles';

type Props = {
  currentFolder: FolderProps;
  showSearch: boolean;
  viewDocument: SavedDocumentProps;
  setViewDocument: (pdfDocuemnt: SavedDocumentProps) => void;
};

class Component extends React.PureComponent<Props> {
  renderHeader = () => {
    // TODO:
    return null;
  }

  renderSearchList = () => {
    const { showSearch } = this.props;

    if (!showSearch) {
      return null;
    }

    // TODO:
    return null;
  }

  renderTabs = () => {
    const { showSearch } = this.props;

    if (showSearch) {
      return null;
    }

    // TODO:
    return null;
  }

  renderBreadcums = () => {
    const { showSearch } = this.props;

    if (showSearch) {
      return null;
    }

    // TODO:
    return null;
  }

  renderFolders = () => {
    const { showSearch } = this.props;

    if (showSearch) {
      return null;
    }

    // TODO:
    return null;
  }

  renderEmptyDocumentComponent = () => (
    <View style={styles.containerPadding}>
      <Text>No Document in this folder. Scan now!</Text>
    </View>
  )

  renderDocumentItem = ({ item: documentItem, index: position }: { item: SavedDocumentProps, index: number }) => {
    const { setViewDocument } = this.props;
    const docContainer = position % 2 === 1 ? styles.docContainerRight : styles.docContainerLeft;

    if (documentItem.id === '-1') {
      // This is empty document for keeping alignment for last document
      return null;
    }

    // TODO: move menu to components
    return (
      <View style={[styles.docContainer, docContainer]}>
        <TouchableOpacity onPress={() => setViewDocument(documentItem)}>
          <Image
            style={styles.documentThumb}
            resizeMode='cover'
            source={{ uri: documentItem.thumbnailUri }} />
        </TouchableOpacity>
        <View style={{padding: 5}}>
          <Menu renderer={renderers.SlideInMenu}>
            <MenuTrigger text={documentItem.name} />
            <MenuOptions>
              <MenuOption onSelect={() => Alert.alert(`Delete`)} >
                <Text style={{ padding: 8 }}>Move to folder</Text>
              </MenuOption>
              <MenuOption onSelect={() => Alert.alert(`Delete`)} >
                <Text style={{ padding: 8 }}>Modify Scan</Text>
              </MenuOption>
              <MenuOption onSelect={() => Alert.alert(`Delete`)} >
                <Text style={{ padding: 8 }}>Share</Text>
              </MenuOption>
              <MenuOption onSelect={() => Alert.alert(`Delete`)} >
                <Text style={{ padding: 8 }}>LyfScan Share</Text>
              </MenuOption>
              <MenuOption onSelect={() => Alert.alert(`Delete`)} >
                <Text style={{ padding: 8 }}>Rename</Text>
              </MenuOption>
              <MenuOption onSelect={() => Alert.alert(`Delete`)} >
                <Text style={{ padding: 8 }}>Delete</Text>
              </MenuOption>
            </MenuOptions>
          </Menu>
        </View>
      </View>
    );
  };

  renderDocuments = () => {
    const {
      showSearch,
      currentFolder,
    } = this.props;

    const documents = currentFolder ? currentFolder.documents : null;

    if (!documents || showSearch) {
      return null;
    }

    if (documents.length % 2 === 1) {
      // put empty document in the last
      documents.push({
        id: '-1',
        name: '',
        create_time: new Date(),
        thumbnailUri: null,
        documents: null,
        documentType: null,
        pdfUri: null,
      });
    }

    return (
      <FlatList
        data={documents}
        style={styles.documentList}
        renderItem={this.renderDocumentItem}
        keyExtractor={item => item.id}
        ListHeaderComponent={this.renderFolders}
        ListEmptyComponent={this.renderEmptyDocumentComponent}
        numColumns={2}
      />
    );

  }

  renderBottomMenu = () => {
    const { showSearch } = this.props;

    if (showSearch) {
      return null;
    }

    // TODO:
    return null;
  }

  renderDocumentView = () => {
    const { viewDocument } = this.props;

    if (!viewDocument) { return false; }

    // TODO: move to components
    return (
      <Modal
        onRequestClose={() => this.props.setViewDocument(null)}
        onDismiss={() => this.props.setViewDocument(null)}
        visible={true}>
        <Pdf
          source={{ uri: viewDocument.pdfUri, cache: false }}
          style={styles.pdfModal}
        />
      </Modal>
    );
  }

  render() {
    return (
      <React.Fragment>
        {this.renderDocumentView()}
        {this.renderHeader()}
        {this.renderSearchList()}
        {this.renderTabs()}
        {this.renderBreadcums()}
        {this.renderDocuments()}
        {this.renderBottomMenu()}
      </React.Fragment>
    );
  }
}
export { Component };
