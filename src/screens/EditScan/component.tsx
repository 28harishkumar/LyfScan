import React from 'react';
import { View, Text, Image, Dimensions } from 'react-native';
import { RaisedTextButton } from '@src/components/button';
import styles from './styles';
import { SavedDocumentProps } from '@src/types/doc';

// TODO: define Props
type Props = {
  pdfDocument: SavedDocumentProps;
  onSave: () => void;
};

class Component extends React.PureComponent<Props> {
  render() {
    const { pdfDocument } = this.props;
    const doc = pdfDocument.documents[0];
    const { width  } = Dimensions.get('screen');
    const height = doc.croppedHeight * (width - 40) / doc.croppedWidth;

    return (
      <View style={styles.container}>
        <Text>Edit document is in progress</Text>
        <View style={{padding: 10}}>
          <Image
            source={{
              uri: doc.finalUri,
              width: width - 40,
              height,
            }} />
        </View>
        <RaisedTextButton
          title='Save'
          onPress={this.props.onSave}
        />
      </View>
    );
  }
}

export { Component };
