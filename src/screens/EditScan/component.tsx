import React from 'react';
import {
  FlatList,
  View,
  TextInput,
  Text,
  Image,
  Dimensions,
} from 'react-native';
import ImageZoom from 'react-native-image-pan-zoom';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import IonIcons from 'react-native-vector-icons/Ionicons';
import { SavedDocumentProps, ScannedDocumentProps } from '@src/types/doc';
import styles from './styles';
import colors from '@src/core/colors';
import Ripple from '@src/components/ripple';
const dimensions = Dimensions.get('window');

// TODO: define Props
type Props = {
  activePage: number;
  showNameChangeForm: boolean;
  pdfDocument: SavedDocumentProps;
  onSave: () => void;
  setActivePage: (index: number) => void;
  onCancel: () => void;
};

class Component extends React.PureComponent<Props> {
  flatListElement = null;

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
   * Document Name & edit input field
   */
  renderDocumentName = () => {
    const {
      showNameChangeForm,
      pdfDocument,
    } = this.props;

    if (showNameChangeForm) {
      return (
        <View style={styles.nameForm}>
          <TextInput
            style={styles.nameInput}
            placeholder='Document Name'
          />
          <Ripple
            style={styles.nameCancelIcon}
            delayPressOut={150}
          >
            <MaterialIcons
              name='close'
              size={20}
              color={colors.primaryIcon}
            />
          </Ripple>
        </View>
      );
    }

    return (
      <View style={styles.nameWrap}>
        <Text
          numberOfLines={1}
          style={styles.documentName}>
          {pdfDocument.name}
        </Text>
        <Ripple
          style={styles.nameEditIcon}
          onPress={() => { }}
        >
          <MaterialIcons
            name='edit'
            size={20}
            color={colors.secondaryIcon}
          />
        </Ripple>
      </View>
    );
  }

  /**
   * Header section
   */
  renderHeader = () => {
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
        <View>
          {this.renderDocumentName()}
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
   * Image edit actions
   */
  renderFooter = () => {
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

        <Ripple style={styles.actionWrap}>
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

        <Ripple style={styles.actionWrap}>
          <IonIcons
            name='color-filter-outline'
            color={colors.primaryIcon}
            size={20} />
          <Text style={styles.actionText}>Color</Text>
        </Ripple>

        <Ripple style={styles.actionWrap}>
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
        {this.renderHeader()}
        {this.renderPages()}
        {this.renderFooter()}
      </React.Fragment>
    );
  }
}

export { Component };
