import FeedItem from '@/components/feed/FeedItem';
import useGetInfiniteFavoritePosts from '@/hooks/queries/useGetInfiniteFavoritePosts';
import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

const FeedFavoriteList = () => {
  const {
    data: posts,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useGetInfiniteFavoritePosts();
  const [isRefresh, setIsRefresh] = useState(false);

  const handleRefresh = async () => {
    setIsRefresh(true);
    await refetch();
    setIsRefresh(false);
  };

  const handleEndReached = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };
  return (
    <FlatList
      data={posts?.pages.flat()}
      renderItem={({ item }) => <FeedItem post={item} />}
      keyExtractor={(item) => String(item.id)}
      numColumns={2}
      ListEmptyComponent={
        <View>
          <Text style={{ textAlign: 'center' }}>즐겨찾기한 장소가 없습니다</Text>
        </View>
      }
      contentContainerStyle={styles.contentContainer}
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.5}
      refreshing={isRefresh}
      onRefresh={handleRefresh}
    />
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    padding: 15,
  },
});

export default FeedFavoriteList;
