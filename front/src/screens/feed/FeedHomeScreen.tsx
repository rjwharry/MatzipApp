import FeedList from '@/components/feed/FeedList';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const FeedHomeScreen = () => {
  return (
    <View style={styles.container}>
      <FeedList />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default FeedHomeScreen;
