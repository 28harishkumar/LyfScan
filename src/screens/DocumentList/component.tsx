import React from 'react';
import {
  TouchableOpacity,
  FlatList,
  TextInput,
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
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { SavedDocumentProps } from '@src/types/doc';
import colors from '@src/core/colors';
import Ripple from '@src/components/ripple';
import BottomNavigation from '@src/components/BottomNavigation';
import styles from './styles';

type Props = {
  tabIndex: number;
  currentFolder: FolderProps;
  showSearch: boolean;
  viewDocument: SavedDocumentProps;
  openSearch: () => void;
  closeSearch: () => void;
  createFolder: () => void;
  refreshDocuments: () => void;
  openCamera: () => void;
  showPreferences: () => void;
  setViewDocument: (pdfDocuemnt: SavedDocumentProps) => void;
  modifyDocument: (pdfDocuemnt: SavedDocumentProps) => void;
};

class Component extends React.PureComponent<Props> {
  renderHeader = () => {
    const { showSearch } = this.props;
    // TODO: put animation when search input open

    if (!showSearch) {
      return (
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <MaterialIcons
              name='home'
              size={25}
              style={styles.headerIcon}
              color={colors.secondaryIcon}
            />
            <Text style={styles.logoText}>LyfScan</Text>
          </View>
          <View style={styles.headerContent}>
            <Ripple onPress={this.props.openSearch}>
              <MaterialIcons
                name='search'
                size={25}
                style={styles.headerIcon}
                color={colors.secondaryIcon}
              />
            </Ripple>
            <Ripple onPress={this.props.createFolder}>
              <MaterialIcons
                name='create-new-folder'
                size={25}
                style={styles.headerIcon}
                color={colors.secondaryIcon}
              />
            </Ripple>
          </View>
        </View>
      );
    }

    return (
      <View style={styles.header}>
        <TextInput
          style={styles.searchInput}
          autoFocus
        />
        <View style={styles.headerContent}>
          <Ripple onPress={this.props.closeSearch}>
            <MaterialIcons
              name='close'
              size={25}
              style={styles.headerIcon}
              color={colors.secondaryIcon}
            />
          </Ripple>
        </View>
      </View>
    );
  }

  renderSearchList = () => {
    const { showSearch } = this.props;

    if (!showSearch) {
      return null;
    }

    // TODO:
    return (
      <View style={styles.container}>
        <Text>Search is under development.</Text>
      </View>
    );
  }

  renderrTabItem = ({ item: tab, index }) => {
    const { tabIndex } = this.props;
    const isActiveTab = tabIndex === index;
    const {
      tabText,
      activeTabText,
    } = styles;

    const textStyle = isActiveTab ? activeTabText : tabText;

    // TODO: onPress
    return (
      <Ripple>
        <View style={styles.tabView}>
          <Text style={textStyle}>{tab.name}</Text>
          {isActiveTab && <View style={styles.activeTabBorder}></View>}
        </View>
      </Ripple>
    );
  }

  renderTabs = () => {
    const { showSearch } = this.props;

    if (showSearch) {
      return null;
    }

    // TODO: take from storage
    const RootChildern = [
      {
        name: 'Shared',
      },
      {
        name: 'Contacts',
      },
      {
        name: 'Documents',
      },
      {
        name: 'ID Cards',
      },
      {
        name: 'Photos',
      },
      {
        name: 'Passport',
      },
    ];

    return (
      <View style={styles.tabList}>
        <FlatList
          horizontal={true}
          data={RootChildern}
          renderItem={this.renderrTabItem}
          keyExtractor={item => item.name}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    );
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
    <View style={styles.emptyContainer}>
      <Text>No Document in this folder. Scan now!</Text>
    </View>
  )

  renderDocumentItem = ({ item: documentItem, index: position }: { item: SavedDocumentProps, index: number }) => {
    const { setViewDocument } = this.props;
    const docContainer = position % 2 === 1 ? styles.docContainerRight : styles.docContainerLeft;

    if (documentItem.id === '-1') {
      // This is empty document for keeping alignment for last document
      return <View style={{ flex: 1 }}></View>;
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
        <View style={{ padding: 5 }}>
          <Menu renderer={renderers.SlideInMenu}>
            <MenuTrigger text={documentItem.name} />
            <MenuOptions>
              <MenuOption onSelect={() => Alert.alert(`Delete`)} >
                <Text style={{ padding: 8 }}>Move to folder</Text>
              </MenuOption>
              <MenuOption onSelect={() => this.props.modifyDocument(documentItem)} >
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
      <View style={styles.fullFlex}>
        <FlatList
          data={documents}
          style={styles.documentList}
          contentContainerStyle={styles.documentListConatainer}
          renderItem={this.renderDocumentItem}
          keyExtractor={item => item.id}
          ListHeaderComponent={this.renderFolders}
          ListEmptyComponent={this.renderEmptyDocumentComponent}
          numColumns={2}
        />
      </View>
    );

  }

  renderBottomMenu = () => {
    const {
      showSearch,
      refreshDocuments,
      openCamera,
      showPreferences,
    } = this.props;

    if (showSearch) {
      return null;
    }

    return (
      <BottomNavigation
        onIconPress={[
          refreshDocuments,
          openCamera,
          showPreferences,
        ]}
        activeIndex={0}
      />
    );
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
