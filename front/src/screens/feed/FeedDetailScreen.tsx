import PreviewImageList from '@/components/common/PreviewImageList';
import { colorHex, colors, feedNavigations } from '@/constants';
import useGetPost from '@/hooks/queries/useGetPost';
import { FeedStackParamList } from '@/navigations/stack/FeedStackNaviagtor';
import { getDateLocaleFormat, isAndroid } from '@/utils';
import Ionicons from '@react-native-vector-icons/ionicons';
import Octicons from '@react-native-vector-icons/octicons';
import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { Dimensions, Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

type FeedDetailScreenProps = StackScreenProps<
  FeedStackParamList,
  typeof feedNavigations.FEED_DETAIL
>;

const FeedDetailScreen = ({ route, navigation }: FeedDetailScreenProps) => {
  const { id } = route.params;
  const { data: post, isPending, isError } = useGetPost(id);
  if (isPending || isError) {
    return <></>;
  }
  return (
    <ScrollView style={styles.container}>
      <SafeAreaView style={styles.headerContainer}>
        <View style={styles.header}>
          <Octicons
            name="arrow-left"
            size={30}
            color={colors.WHITE}
            onPress={() => navigation.goBack()}
          />
          <Ionicons name="ellipsis-vertical" size={30} color={colors.WHITE} />
        </View>
      </SafeAreaView>
      <View style={styles.imageContainer}>
        {post.images.length > 0 && (
          <Image
            style={styles.image}
            source={{
              uri: `${isAndroid ? 'http://10.0.2.2:3030' : 'http://localhost:3030'}/${post.images[0].uri}`,
            }}
            resizeMode="cover"
          />
        )}
        {post.images.length === 0 && (
          <View style={styles.emptyImageContainer}>
            <Text>No Image</Text>
          </View>
        )}
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.addressContainer}>
          <Octicons name="location" size={10} color={colors.GRAY_500} />
          <Text style={styles.addressText} ellipsizeMode="tail" numberOfLines={1}>
            {post.address}
          </Text>
        </View>
        <Text style={styles.titleText}>{post.title}</Text>
        <View style={styles.infoContainer}>
          <View style={styles.infoRow}>
            <View style={styles.infoColumn}>
              <Text style={styles.infoColumnKeyText}>방문날짜</Text>
              <Text style={styles.infoColumnValueText}>{getDateLocaleFormat(post.date)}</Text>
            </View>
            <View style={styles.infoColumn}>
              <Text style={styles.infoColumnKeyText}>평점</Text>
              <Text style={styles.infoColumnValueText}>{post.score}점</Text>
            </View>
          </View>
          <View style={styles.infoRow}>
            <View style={styles.infoColumn}>
              <Text style={styles.infoColumnKeyText}>마커색상</Text>
              <View style={[styles.markerColor, { backgroundColor: colorHex[post.color] }]} />
            </View>
          </View>
        </View>
        <Text style={styles.descriptionText}>{post.description}</Text>
      </View>
      <View style={styles.imageContentContainer}>
        {post.images.length > 0 && <PreviewImageList imageUris={post.images} />}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  headerContainer: {
    position: 'absolute',
    top: 0,
    zIndex: 1,
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  imageContainer: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').width,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  emptyImageContainer: {
    height: Dimensions.get('screen').width,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.GRAY_200,
    borderColor: colors.GRAY_200,
    borderWidth: 1,
  },
  contentContainer: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: colors.WHITE,
    marginBottom: 10,
  },
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.BLACK,
  },
  infoContainer: {
    marginVertical: 20,
    gap: 8,
  },
  infoRow: {
    flexDirection: 'row',
  },
  infoColumn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  infoColumnKeyText: {
    color: colors.BLACK,
  },
  infoColumnValueText: {
    color: colors.PINK_700,
  },
  markerColor: {
    width: 10,
    height: 10,
    borderRadius: 10,
  },
  addressContainer: {
    gap: 5,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  addressText: {
    color: colors.GRAY_500,
    fontSize: 12,
  },
  descriptionText: {
    color: colors.BLACK,
    lineHeight: 25,
    fontSize: 15,
  },
  imageContentContainer: {
    paddingVertical: 15,
    backgroundColor: colors.WHITE,
    marginBottom: 10,
  },
});

export default FeedDetailScreen;
