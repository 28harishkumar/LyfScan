import React from 'react';
import {
  FlatList,
  TextInput,
  View,
  Text,
  Image,
  Dimensions,
  Modal as RNModal,
  Switch,
} from 'react-native';
import ImageZoom from 'react-native-image-pan-zoom';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import IonIcons from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import CustomCrop from 'react-native-image-processor';
import { SavedDocumentProps, ScannedDocumentProps } from '@src/types/doc';
import colors from '@src/core/colors';
import Ripple from '@src/components/ripple';
import { RaisedTextButton, TextButton } from '@src/components/button';
import styles from './styles';


const dimensions = Dimensions.get('window');

// TODO: define Props
type Props = {
  activePage: number;
  confirmModificationRejection: boolean;
  shouldShowNameForm: boolean;
  pdfDocument: SavedDocumentProps;
  onSave: () => void;
  onCancel: () => void;
  setActivePage: (index: number) => void;
  rejectDiscardRequest: () => void;
  onConfirmDiscardChanges: () => void;
  showNameChangeForm: (v: boolean) => void;
  updatePdfName: (name: string) => void;

  showCrop: boolean;
  toggleCropModal: (value: boolean) => void;
  cropImage: (response: any) => void;

  showColorOptions: boolean;
  applyColorToAll: boolean;
  showColorFilters: () => void;
  hideColorFilters: () => void;
  selectColorFilter: (effect: string) => void;

  showDeletePageWarning: boolean;
  deletePageRequest: () => void;
  deletePageDiscard: () => void;
  deletePage: () => void;
};

class Component extends React.PureComponent<Props> {
  flatListElement = null;
  name = '';
  customCrop = null;

  _onViewableItemsChanged = (params) => {
    const { changed } = params;
    const newItem = changed?.[0];

    if (newItem !== undefined) {
      const nextIndex = newItem.index;
      if (newItem.isViewable) {
        this.props.setActivePage(nextIndex);
      }
    }
  }

  _scrollToIndex = (index: number) => {
    const newParams = {
      animated: true,
      index,
      viewOffset: dimensions.width * 0.2,
    };

    this.props.setActivePage(index);
    this.flatListElement.scrollToIndex(newParams);
  };

  /**
   * Page delete confirmation
   */
  renderPageDeleteModal = () => {
    const {
      showDeletePageWarning,
      deletePageDiscard,
      deletePage,
    } = this.props;

    if (!showDeletePageWarning) { return null; }

    return (
      <Modal isVisible={showDeletePageWarning}>
        <View style={styles.modal}>
          <Text style={styles.modalHead}>Confirm Delete</Text>
          <View style={styles.modalBody}>
            <Text>Do you want to delete this page? This can not be undo later.</Text>
          </View>
          <View style={styles.modalFooter}>
            <View style={styles.row}>
              <RaisedTextButton
                style={styles.fullFlex}
                title='No'
                onPress={deletePageDiscard} />

              <TextButton
                style={styles.fullFlex}
                titleColor={colors.danger}
                title='Yes'
                onPress={deletePage} />
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  /**
   * Crop screen
   */
  renderCropModal = () => {
    const {
      showCrop,
      cropImage,
      pdfDocument,
      activePage,
      toggleCropModal,
    } = this.props;

    if (!showCrop) { return null; }

    const doc = pdfDocument.documents[activePage];

    return (
      <RNModal
        animated
        animationType='slide'
        onRequestClose={() => toggleCropModal(false)}>
        <View style={styles.fullFlex}>
          <View style={styles.header}>
            <View style={styles.nameForm}>
              <Ripple
                delayPressOut={150}
                onPressOut={() => toggleCropModal(false)}
              >
                <MaterialIcons
                  name='close'
                  size={24}
                  style={styles.headerIcon}
                  color={colors.secondaryIcon}
                />
              </Ripple>
              <Text style={styles.cropHeaderTitle}>Crop Image</Text>
              <Ripple
                delayPressOut={150}
                onPressOut={() => this.customCrop.crop()}
              >
                <MaterialIcons
                  name='check'
                  size={24}
                  style={styles.headerIcon}
                  color={colors.secondaryIcon}
                />
              </Ripple>
            </View>
          </View>
          <CustomCrop
            ref={ref => (this.customCrop = ref)}
            updateImage={cropImage}
            height={doc.croppedHeight}
            width={doc.croppedWidth}
            overlayColor='transparent'
            maxWidth={794}
            initialImage={doc.croppedUri}
            rectangleCoordinates={null}
          />
        </View>
      </RNModal>
    );
  }


  /**
   * Discard Modifications
   */
  renderDiscardConfirmModal = () => {
    const {
      confirmModificationRejection,
      onConfirmDiscardChanges,
      rejectDiscardRequest,
    } = this.props;

    if (!confirmModificationRejection) { return null; }

    return (
      <Modal isVisible={confirmModificationRejection}>
        <View style={styles.modal}>
          <Text style={styles.modalHead}>Discard the modifications?</Text>
          <View style={styles.modalBody}>
            <Text>If you close now, these modifictions will be lost.</Text>
          </View>
          <View style={styles.modalFooter}>
            <View style={styles.row}>
              <RaisedTextButton
                style={styles.fullFlex}
                title='No'
                onPress={rejectDiscardRequest} />

              <TextButton
                style={styles.fullFlex}
                titleColor={colors.danger}
                title='Yes'
                onPress={onConfirmDiscardChanges} />
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  /**
   * Header section
   */
  renderHeader = () => {
    const {
      pdfDocument,
      shouldShowNameForm,
      showNameChangeForm,
      updatePdfName,
    } = this.props;

    if (shouldShowNameForm) {
      return (
        <View style={styles.header}>
          <View style={styles.nameForm}>
            <TextInput
              autoFocus
              style={styles.nameInput}
              placeholder='Document Name'
              multiline={false}
              defaultValue={pdfDocument.name}
              onChangeText={t => this.name = t}
              onBlur={(e: any) => updatePdfName(this.name)}
            />
            <Ripple
              delayPressOut={150}
              onPressOut={() => showNameChangeForm(false)}
            >
              <MaterialIcons
                name='close'
                size={24}
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
        <Ripple
          delayPressOut={150}
          onPressOut={this.props.onCancel}
          style={styles.closeIcon}>
          <MaterialIcons
            name='close'
            size={24}
            color={colors.secondaryIcon}
          />
        </Ripple>
        <View style={styles.nameWrap}>
          <Text
            numberOfLines={1}
            style={styles.documentName}>
            {pdfDocument.name}
          </Text>
          <Ripple
            style={styles.nameEditIcon}
            delayPressOut={150}
            onPressOut={() => showNameChangeForm(true)}
          >
            <MaterialIcons
              name='edit'
              size={20}
              color={colors.secondaryIcon}
            />
          </Ripple>
        </View>
        <Ripple
          style={styles.saveBtn}
          delayPressOut={150}
          onPressOut={this.props.onSave}>
          <Text style={styles.saveTitle}>Save</Text>
        </Ripple>
      </View>
    );
  }

  /**
   * Page Item
   */
  renderDocumentPage = ({ item: doc, index }: { item: ScannedDocumentProps, index: number }) => {
    const { activePage, pdfDocument: { documents } } = this.props;
    const isActivePage = activePage === index;
    const isFirstPage = index === 0;
    const isLastPage = index === documents.length - 1;

    const ratio = doc.croppedHeight / doc.croppedWidth;
    const maxWidth = dimensions.width * 0.7;
    const imageWidth = doc.croppedWidth > maxWidth ? maxWidth : doc.croppedWidth;
    const imageHeight = imageWidth * ratio;
    const pageStyle: any[] = [styles.page, { width: imageWidth }];

    if (isActivePage) {
      pageStyle.push(styles.activePage);
    }

    if (isFirstPage) {
      pageStyle.push(styles.firstPage);
    }

    if (isLastPage) {
      pageStyle.push(styles.lastPage);
    }

    return (
      <View style={pageStyle}>
        <ImageZoom
          useNativeDriver={true}
          cropWidth={imageWidth + 250}
          cropHeight={dimensions.height - 110}
          imageWidth={imageWidth + 60}
          imageHeight={imageHeight + 60 * ratio}
          pinchToZoom={true}
          onStartShouldSetPanResponder={(e, gesture) => {
            return gesture.numberActiveTouches > 1;
          }}
          onMoveShouldSetPanResponder={(e, gesture) => {
            // TODO: enable scroll when document is zoomed
            return gesture.numberActiveTouches > 1;
          }}
        >
          <Image
            style={styles.pageImage}
            resizeMethod='resize'
            resizeMode='contain'
            source={{
              uri: doc.finalUri,
              height: imageWidth + 60,
              width: imageHeight + 60 * ratio,
            }}
          />
        </ImageZoom>
        {
          isActivePage && <View style={styles.paggingWrap}>
            {
              !isFirstPage && <Ripple
                style={styles.paggingIcon}
                delayPressOut={150}
                onPressOut={() => this._scrollToIndex(index - + 1)}>
                <MaterialIcons
                  name='chevron-left'
                  size={20}
                  color={colors.primaryIcon}
                />
              </Ripple>
            }
            <Text style={styles.paggingText}>
              Page {index + 1} of {documents.length}
            </Text>
            {
              !isLastPage && <Ripple
                style={styles.paggingIcon}
                delayPressOut={150}
                onPressOut={() => this._scrollToIndex(index + 1)}>
                <MaterialIcons
                  name='chevron-right'
                  size={20}
                  color={colors.primaryIcon}
                />
              </Ripple>
            }
          </View>
        }
      </View>
    );
  }

  /**
   * Page List
   */
  renderPages = () => {
    const { pdfDocument } = this.props;

    return (
      <FlatList
        horizontal
        ref={r => this.flatListElement = r}
        contentContainerStyle={styles.pagerContainerWrap}
        data={pdfDocument.documents}
        keyExtractor={d => d.originalUri}
        renderItem={this.renderDocumentPage}
        style={styles.pagerWrap}
        showsHorizontalScrollIndicator={false}
        pagingEnabled={true}
        snapToInterval={dimensions.width * 0.7}
        viewabilityConfig={{
          minimumViewTime: 200,
          itemVisiblePercentThreshold: 60,
        }}
        onViewableItemsChanged={this._onViewableItemsChanged}
      />
    );
  }

  /**
   * Render filter thumbnails
   */
  renderFilterThumbnail = ({ item, index }) => {
    const { selectColorFilter } = this.props;
    // TODO: render thumbnail
    return (
      <View>
        <Image
          style={styles.filterThumb}
          source={{
            uri: item.finalUri,
            height: 80,
            width: 80,
          }} />
          <Text style={styles.cropMeta}>Original</Text>
      </View>
    );
  }

  /**
   * Filter thumbnails
   */
  renderColorOptions = () => {
    const {
      pdfDocument,
      showColorOptions,
      applyColorToAll,
      hideColorFilters,
    } = this.props;

    if (!showColorOptions) { return null; }

    // TODO: put real data
    const data = pdfDocument.documents;

    return (
      <View style={styles.filterContainer}>
        <FlatList
          data={data}
          style={styles.filterList}
          keyExtractor={item => item.finalUri}
          renderItem={this.renderFilterThumbnail}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
        {
          data.length > 1 && (
            <Ripple
              delayPressOut={150}
              onPressOut={() => {}}
            >
              <View style={styles.switchWrap}>
                <Text>Apply To All</Text>
                <Switch
                  style={styles.switch}
                  trackColor={{ false: colors.secondaryBg, true: colors.primaryLight }}
                  thumbColor={applyColorToAll ? colors.primary : colors.primarySubText}
                  ios_backgroundColor='#3e3e3e'
                  onValueChange={() => { }}
                  value={applyColorToAll}
                />
              </View>
            </Ripple>
          )
        }
      </View>
    );
  }

  /**
   * Image edit actions
   */
  renderFooter = () => {
    const {
      showColorOptions,
      showColorFilters,
      hideColorFilters,
    } = this.props;

    const filterAction = showColorOptions ? hideColorFilters : showColorFilters;
    return (
      <View style={styles.actionContainer}>
        <Ripple style={styles.actionWrap}>
          <MaterialIcons
            name='add-a-photo'
            color={colors.primaryIcon}
            size={20} />
          <Text style={styles.actionText}>Add Page</Text>
        </Ripple>

        <Ripple style={styles.actionWrap}>
          <MaterialIcons
            name='reorder'
            color={colors.primaryIcon}
            size={20} />
          <Text style={styles.actionText}>Reorder</Text>
        </Ripple>

        <Ripple
          delayPressOut={150}
          onPressOut={() => this.props.toggleCropModal(true)}
          style={styles.actionWrap}>
          <MaterialIcons
            name='crop'
            color={colors.primaryIcon}
            size={20} />
          <Text style={styles.actionText}>Crop</Text>
        </Ripple>

        <Ripple style={styles.actionWrap}>
          <MaterialIcons
            name='rotate-right'
            color={colors.primaryIcon}
            size={20} />
          <Text style={styles.actionText}>Rotate</Text>
        </Ripple>

        <Ripple
          delayPressOut={150}
          onPressOut={filterAction}
          style={styles.actionWrap}>
          <IonIcons
            name='color-filter-outline'
            color={colors.primaryIcon}
            size={20} />
          <Text style={styles.actionText}>Filters</Text>
        </Ripple>

        <Ripple
          delayPressOut={150}
          onPressOut={this.props.deletePageRequest}
          style={styles.actionWrap}>
          <MaterialIcons
            name='delete'
            color={colors.primaryIcon}
            size={20} />
          <Text style={styles.actionText}>Delete</Text>
        </Ripple>
      </View>
    );
  }

  render() {
    const { pdfDocument } = this.props;
    const doc = pdfDocument.documents[0];
    const { width } = Dimensions.get('screen');
    const height = doc.croppedHeight * (width - 40) / doc.croppedWidth;

    return (
      <React.Fragment>
        {this.renderDiscardConfirmModal()}
        {this.renderPageDeleteModal()}
        {this.renderCropModal()}
        {this.renderHeader()}
        {this.renderPages()}
        {this.renderColorOptions()}
        {this.renderFooter()}
      </React.Fragment>
    );
  }
}

export { Component };
