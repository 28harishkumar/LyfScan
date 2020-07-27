import React from 'react';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

export type ImageProps = {
  uri: string;
};

export type GalleryPhotoProps = {
  node: {
    image: ImageProps,
  };
};

type Props = {
  item: GalleryPhotoProps;
  selected: boolean;
  selectedMarker?: React.ReactNode;
  imageMargin?: number;
  containerWidth?: number;
  imagesPerRow?: number;
  onClick: (image: { uri: string }) => void;
};

type State = {

};

class ImageItem extends React.Component<Props, State> {
  static defaultProps: Props = {
    item: null,
    selected: false,
    onClick: () => {},
  };

  shouldComponentUpdate(nextProps) {
    return this.props.selected !== nextProps.selected;
  }

  getImageSize(props: Props) {
    let width = Dimensions.get('screen').width;
    const { imageMargin, imagesPerRow, containerWidth } = props;

    if (typeof containerWidth !== 'undefined') {
      width = containerWidth;
    }

    return (width - (imagesPerRow + 1) * imageMargin) / imagesPerRow - 5;
  }

  _imageSize = this.getImageSize(this.props);

  render() {
    const { item, selected, selectedMarker, imageMargin } = this.props;

    const marker = selectedMarker ? selectedMarker :
      <Image
        style={[styles.marker, { width: 25, height: 25 }]}
        source={require('./circle-check.png')}
      />;

    const image = item.node.image;

    return (
      <TouchableOpacity
        style={{ marginBottom: imageMargin, marginRight: imageMargin, borderWidth: 1, borderColor: '#ddd' }}
        onPress={() => this._handleClick(image)}>
        <Image
          source={{ uri: image.uri }}
          style={{ height: this._imageSize, width: this._imageSize }} />
        {(selected) ? marker : null}
      </TouchableOpacity>
    );
  }

  _handleClick(item: { uri: string}) {
    this.props.onClick(item);
  }
}

const styles = StyleSheet.create({
  marker: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: '#2196f3',
    borderRadius: 12,
  },
});

export default ImageItem;
