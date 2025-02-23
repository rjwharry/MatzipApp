import { colors } from '@/constants';
import { FeedStackParamList } from '@/navigations/stack/FeedStackNaviagtor';
import { ImageUri } from '@/types';
import { isAndroid } from '@/utils';
import Octicons from '@react-native-vector-icons/octicons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface ImageCarouselProps {
  images: ImageUri[];
  pressedIndex?: number;
}
const ImageCarousel = ({ images, pressedIndex = 0 }: ImageCarouselProps) => {
  const insets = useSafeAreaInsets();
  const deviceWidth = Dimensions.get('screen').width;
  const navigation = useNavigation<StackNavigationProp<FeedStackParamList>>();
  const [initialIndex, setInitialIndex] = useState(pressedIndex);
  const [page, setPage] = useState(pressedIndex);

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const newPage = Math.round(e.nativeEvent.contentOffset.x / deviceWidth);
    setPage(newPage);
  };

  return (
    <View style={styles.container}>
      <Pressable
        style={[styles.backButton, { marginTop: insets.top + 10 }]}
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Octicons name="arrow-left" size={30} color={colors.WHITE} />
      </Pressable>
      <FlatList
        data={images}
        renderItem={({ item }) => (
          <View style={{ width: deviceWidth }}>
            <Image
              style={styles.image}
              source={{
                uri: `${isAndroid ? 'http://10.0.2.2:3030' : 'http://localhost:3030'}/${item.uri}`,
              }}
              resizeMode="contain"
            />
          </View>
        )}
        keyExtractor={(item) => String(item.id)}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        initialScrollIndex={initialIndex}
        onScrollToIndexFailed={() => setInitialIndex(initialIndex)}
        onScroll={handleScroll}
        getItemLayout={(_, index) => ({
          length: deviceWidth,
          offset: deviceWidth * index,
          index,
        })}
      />
      <View style={[styles.pageContainer, { bottom: insets.bottom + 10 }]}>
        {Array.from({ length: images.length }, (_, index) => (
          <View key={index} style={[styles.pageDot, index === page && styles.currentPageDot]} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.WHITE,
  },
  backButton: {
    position: 'absolute',
    left: 20,
    zIndex: 1,
    backgroundColor: colors.PINK_700,
    height: 40,
    width: 40,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  pageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
  },
  pageDot: {
    margin: 4,
    backgroundColor: colors.GRAY_200,
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  currentPageDot: {
    backgroundColor: colors.PINK_700,
  },
});

export default ImageCarousel;
