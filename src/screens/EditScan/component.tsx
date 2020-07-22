import React from 'react';
import { View, Text, Image } from 'react-native';
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

    return (
      <View style={styles.container}>
        <Text>Edit document is in progress</Text>
        <View style={{padding: 10}}>
          <Text>Original uri: {doc.originalUri}</Text>
          <Text>Cropped uri: {doc.croppedUri}</Text>
          <Text>Findal uri: {doc.finalUri}</Text>
          <Image
            source={{ uri: doc.croppedUri, width: 200, height: 200 }} />
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
