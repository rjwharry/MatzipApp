import { colors, feedNavigations } from '@/constants';
import { FeedStackParamList } from '@/navigations/stack/FeedStackNaviagtor';
import { ImageUri } from '@/types';
import { isAndroid } from '@/utils';
import Ionicons from '@react-native-vector-icons/ionicons';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, Pressable, ScrollView, StyleSheet, View } from 'react-native';

interface PreviewImageListProps {
  imageUris: ImageUri[];
  onDelete?: (uri: string) => void;
  onChangeOrder?: (from: number, to: number) => void;
  showOption?: boolean;
  zoomEnabled?: boolean;
}
const PreviewImageList = ({
  imageUris,
  onDelete = () => {},
  onChangeOrder = () => {},
  showOption = false,
  zoomEnabled = false,
}: PreviewImageListProps) => {
  const navigation = useNavigation<NavigationProp<FeedStackParamList>>();
  const handlePressImage = (index: number) => {
    if (zoomEnabled) {
      navigation.navigate(feedNavigations.IMAGE_ZOOM, { index });
    }
  };
  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      <View style={styles.container}>
        {imageUris.map(({ uri }, index) => (
          <Pressable
            key={index}
            style={styles.imageContainer}
            onPress={() => handlePressImage(index)}
          >
            <Image
              resizeMode="cover"
              style={styles.image}
              source={{
                uri: `${isAndroid ? 'http://10.0.2.2:3030' : 'http://localhost:3030'}/${uri}`,
              }}
            />
            {showOption && (
              <>
                <Pressable
                  style={[styles.imageButton, styles.deleteButton]}
                  onPress={() => onDelete && onDelete(uri)}
                >
                  <Ionicons name="close" size={16} color={colors.WHITE} />
                </Pressable>
                {index > 0 && (
                  <Pressable
                    style={[styles.imageButton, styles.moveLeftButton]}
                    onPress={() => onChangeOrder && onChangeOrder(index, index - 1)}
                  >
                    <Ionicons name="arrow-back-outline" size={16} color={colors.WHITE} />
                  </Pressable>
                )}
                {index < imageUris.length - 1 && (
                  <Pressable
                    style={[styles.imageButton, styles.moveRightButton]}
                    onPress={() => onChangeOrder && onChangeOrder(index, index + 1)}
                  >
                    <Ionicons name="arrow-forward-outline" size={16} color={colors.WHITE} />
                  </Pressable>
                )}
              </>
            )}
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
  imageButton: {
    position: 'absolute',
    backgroundColor: colors.BLACK,
    zIndex: 1,
  },
  deleteButton: {
    top: 0,
    right: 0,
  },
  moveLeftButton: {
    bottom: 0,
    left: 0,
  },
  moveRightButton: {
    bottom: 0,
    right: 0,
  },
});

export default PreviewImageList;
