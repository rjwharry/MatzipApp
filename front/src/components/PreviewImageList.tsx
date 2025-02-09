import { ImageUri } from '@/types';
import { isAndroid } from '@/utils';
import React from 'react';
import { Image, Pressable, ScrollView, StyleSheet, View } from 'react-native';

interface PreviewImageListProps {
  imageUris: ImageUri[];
}
const PreviewImageList = ({ imageUris }: PreviewImageListProps) => {
  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      <View style={styles.container}>
        {imageUris.map(({ uri }, index) => (
          <Pressable key={index} style={styles.imageContainer}>
            <Image
              resizeMode="cover"
              style={styles.image}
              source={{
                uri: `${isAndroid ? 'http://10.0.2.2:3030' : 'http://localhost:3030'}/${uri}`,
              }}
            />
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    gap: 15,
  },
  imageContainer: {
    width: 70,
    height: 70,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default PreviewImageList;
