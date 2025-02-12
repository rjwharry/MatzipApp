import FeedItem from '@/components/feed/FeedItem';
import useGetInfinitePosts from '@/hooks/queries/useGetInfinitePosts';
import React, { useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';

const FeedList = () => {
  const {
    data: posts,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useGetInfinitePosts();
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

export default FeedList;
