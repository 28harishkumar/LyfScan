import React from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Alert,
} from 'react-native';

import CameraRoll, {
  PhotoIdentifiersPage,
  PhotoIdentifier,
} from '@react-native-community/cameraroll';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import ImageItem, { GalleryPhotoProps, ImageProps } from './ImageItem';
import Ripple from '../ripple';
import colors from '@src/core/colors';

type Props = {
  removeClippedSubviews?: boolean;
  groupTypes?: 'Album' | 'All' | 'Event' | 'Faces' | 'Library' | 'PhotoStream' | 'SavedPhotos';
  maximum?: number,
  assetType?: 'Photos' | 'Videos' | 'All';
  selectSingleItem?: boolean;
  imagesPerRow?: number;
  imageMargin?: number;
  containerWidth?: number;
  selected?: ImageProps[];
  selectedMarker: React.ReactNode;
  backgroundColor?: string;
  emptyText?: string;
  emptyTextStyle?: any;
  loader?: React.ReactNode;
  onClose?: () => void;
  onDocumentPickup: (image: ImageProps[]) => void;
};

type State = {
  images: PhotoIdentifier[];
  selected: ImageProps[];
  initialLoading: boolean;
  loadingMore: boolean;
  noMore: boolean;
  lastCursor: string;
  data: GalleryPhotoProps[][];
};

class DocumentPicker extends React.PureComponent<Props, State> {
  static defaultProps: Props = {
    removeClippedSubviews: true,
    groupTypes: 'SavedPhotos',
    maximum: 15,
    imagesPerRow: 3,
    imageMargin: 5,
    selectSingleItem: false,
    selectedMarker: null,
    assetType: 'Photos',
    backgroundColor: 'white',
    selected: [],
    emptyText: 'No photos.',
    onDocumentPickup: () => { },
  };

  state: State = {
    images: [],
    selected: this.props.selected,
    lastCursor: null,
    initialLoading: true,
    loadingMore: false,
    noMore: false,
    data: [],
  };

  componentDidMount() {
    this.setState({
      selected: [],
      images: [],
    });

    this.fetch();
  }

  fetch() {
    if (!this.state.loadingMore) {
      this.setState({ loadingMore: true }, () => { this._fetch(); });
    }
  }

  _fetch() {
    const { groupTypes, assetType } = this.props;

    const fetchParams: any = {
      first: 1000,
      groupTypes,
      assetType,
    };

    if (Platform.OS === 'android') {
      // not supported in android
      delete fetchParams.groupTypes;
    }

    if (this.state.lastCursor) {
      fetchParams.after = this.state.lastCursor;
    }

    CameraRoll.getPhotos(fetchParams)
      .then((data: PhotoIdentifiersPage) => this._appendImages(data), (e) => { });
  }

  _appendImages(data: PhotoIdentifiersPage) {
    const assets = data.edges;
    const newState: State = {
      ...this.state,
      loadingMore: false,
      initialLoading: false,
    };

    if (!data.page_info.has_next_page) {
      newState.noMore = true;
    }

    if (assets.length > 0) {
      newState.lastCursor = data.page_info.end_cursor;
      newState.images = this.state.images.concat(assets);
      newState.data = this._nEveryRow(newState.images, this.props.imagesPerRow);
    }

    this.setState(newState);
  }

  onDocumentPickup = () => {
    if (this.state.selected.length) {
      this.props.onDocumentPickup(this.state.selected);
    } else {
      Alert.alert(
        'No image selected',
        'Please select at least one image or press use close button from top-right to go back.',
      );
    }
  }

  renderHeader = () => {
    return (
      <View style={styles.headerWrap}>
        <Ripple onPressOut={this.props.onClose}>
          <MaterialIcons
            name='close'
            size={26}
            color={colors.primaryIcon}
            style={styles.headerIcon}
           />
        </Ripple>
        <Text style={styles.headerText}>Pick Images</Text>
        <Ripple onPressOut={this.onDocumentPickup}>
          <MaterialIcons
            name='check'
            size={26}
            color={colors.highlightIcon}
            style={styles.headerIcon}
          />
        </Ripple>
      </View>
    );
  }

  render() {
    const { data } = this.state;
    const {
      removeClippedSubviews,
      imageMargin,
      backgroundColor,
      emptyText,
      emptyTextStyle,
      loader,
    } = this.props;

    const imageStyle = {
      padding: imageMargin,
      paddingRight: 0,
      backgroundColor,
    };

    if (this.state.initialLoading) {
      return (
        <View style={[styles.loader, { backgroundColor }]}>
          {loader || <ActivityIndicator />}
        </View>
      );
    }

    const listViewOrEmptyText = data.length > 0 ? (
      <FlatList
        style={{ flex: 1 }}
        data={data}
        renderItem={({ item, index }: { item: GalleryPhotoProps[], index: number }) => this._renderRow(item)}
        onEndReachedThreshold={0.5}
        initialNumToRender={1}
        keyExtractor={(item, index) => `${item.length}-${index}`}
        removeClippedSubviews={removeClippedSubviews}
        ListFooterComponent={this._renderFooterSpinner}
        onEndReached={this._onEndReached}
      />
    ) : (
      <Text style={[{ textAlign: 'center' }, emptyTextStyle]}>{emptyText}</Text>
    );

    return (
      <View style={[styles.wrapper, imageStyle]}>
        {this.renderHeader()}
        {listViewOrEmptyText}
      </View>
    );
  }

  _renderImage(item: GalleryPhotoProps) {
    const { selected } = this.state;
    const {
      imageMargin,
      selectedMarker,
      imagesPerRow,
      containerWidth,
    } = this.props;

    const uri = item.node.image.uri;
    const isSelected = (this._arrayObjectIndexOf(selected, 'uri', uri) >= 0) ? true : false;

    return (
      <ImageItem
        key={uri}
        item={item}
        selected={isSelected}
        imageMargin={imageMargin}
        selectedMarker={selectedMarker}
        imagesPerRow={imagesPerRow}
        containerWidth={containerWidth}
        onClick={this._selectImage}
      />
    );
  }

  _renderRow(rowData: GalleryPhotoProps[]) {
    const items = rowData.map((item) => {
      if (item === null) {
        return null;
      }

      return this._renderImage(item);
    });

    return (
      <View style={styles.row}>
        {items}
      </View>
    );
  }

  _renderFooterSpinner = () => {
    if (!this.state.noMore) {
      return <ActivityIndicator style={styles.spinner} />;
    }

    return null;
  }

  _onEndReached = () => {
    if (!this.state.noMore) {
      this.fetch();
    }
  }

  _selectImage = (image: ImageProps) => {
    const { maximum, imagesPerRow, onDocumentPickup, selectSingleItem } = this.props;

    const { selected } = this.state;
    const index = this._arrayObjectIndexOf(selected, 'uri', image.uri);

    if (index >= 0) {
      selected.splice(index, 1);
    } else {
      if (selectSingleItem) {
        selected.splice(0, selected.length);
      }
      if (selected.length < maximum) {
        selected.push(image);
      }
    }

    this.setState({
      selected,
      data: this._nEveryRow(this.state.images, imagesPerRow),
    });
  }

  _nEveryRow = (data: GalleryPhotoProps[], n: number): GalleryPhotoProps[][] => {
    const result: GalleryPhotoProps[][] = [];
    let temp: GalleryPhotoProps[] = [];

    for (let i = 0; i < data.length; ++i) {
      if (i > 0 && i % n === 0) {
        result.push(temp);
        temp = [];
      }

      temp.push(data[i]);
    }

    if (temp.length > 0) {
      while (temp.length !== n) {
        temp.push(null);
      }
      result.push(temp);
    }

    return result;
  }

  _arrayObjectIndexOf(array: { [key: string]: any }[], property: string, value: any) {
    return array.map((o) => o[property]).indexOf(value);
  }
}

const styles = StyleSheet.create({
  headerWrap: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerIcon: {
    marginVertical: 12,
    marginHorizontal: 20,
  },
  headerText: {
    fontSize: 20,
    paddingVertical: 12,
  },
  wrapper: {
    flexGrow: 1,
  },
  loader: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    flex: 1,
  },
  marker: {
    position: 'absolute',
    top: 5,
    backgroundColor: 'transparent',
  },
  spinner: {

  },
});

export default DocumentPicker;
