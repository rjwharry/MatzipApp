import { ResponsePost } from '@/api/post';
import { colors, feedNavigations } from '@/constants';
import { FeedStackParamList } from '@/navigations/stack/FeedStackNaviagtor';
import { getDateWithSeparator, isAndroid } from '@/utils';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { Dimensions, Image, Pressable, StyleSheet, Text, View } from 'react-native';

interface FeedItemProps {
  post: ResponsePost;
}

type Navigation = StackNavigationProp<FeedStackParamList>;

const FeedItem = ({ post }: FeedItemProps) => {
  const navigation = useNavigation<Navigation>();

  const handlePressFeed = () => {
    navigation.navigate(feedNavigations.FEED_DETAIL, { id: post.id });
  };

  return (
    <Pressable style={styles.container} onPress={handlePressFeed}>
      <View>
        {post.images.length > 0 && (
          <View key={post.id} style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={{
                uri: `${isAndroid ? 'http://10.0.2.2:3030' : 'http://localhost:3030'}/${post.images[0].uri}`,
              }}
              resizeMode="cover"
            />
          </View>
        )}
        {post.images.length === 0 && (
          <View style={[styles.imageContainer, styles.emptyImageContainer]}>
            <Text>No Image</Text>
          </View>
        )}
        <View style={styles.textContainer}>
          <Text style={styles.dateText}>{getDateWithSeparator(post.date, '/')}</Text>
          <Text style={styles.titleText}>{post.title}</Text>
          <Text style={styles.descriptionText}>{post.description}</Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 5,
    marginVertical: 12,
  },
  imageContainer: {
    width: Dimensions.get('screen').width / 2 - 25,
    height: Dimensions.get('screen').width / 2 - 25,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 2,
  },
  emptyImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.GRAY_500,
    borderRadius: 5,
    borderWidth: 1,
  },
  textContainer: {
    marginTop: 2,
    gap: 2,
  },
  dateText: {
    color: colors.PINK_200,
    fontWeight: '600',
    fontSize: 12,
  },
  titleText: {
    color: colors.BLACK,
    fontWeight: '500',
    fontSize: 13,
  },
  descriptionText: {
    color: colors.GRAY_500,
    fontSize: 13,
  },
});

export default FeedItem;
