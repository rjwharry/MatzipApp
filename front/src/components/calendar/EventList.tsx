import { CalendarPost } from '@/api/post';
import { colors } from '@/constants';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface EventListProps {
  posts: CalendarPost[];
}
const EventList = ({ posts }: EventListProps) => {
  const insets = useSafeAreaInsets();
  return (
    <ScrollView style={styles.container} scrollIndicatorInsets={{ right: 1 }}>
      <View style={[styles.innerContainer, { marginBottom: insets.bottom + 30 }]}>
        {posts.map((post) => (
          <Pressable key={post.id} style={styles.itemContainer}>
            <View style={styles.itemHeader} />
            <View style={styles.infoContainer}>
              <Text style={styles.addressText} numberOfLines={1} ellipsizeMode="tail">
                {post.address}
              </Text>
              <Text style={styles.titleText}>{post.title}</Text>
            </View>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.WHITE,
    padding: 20,
  },
  innerContainer: {
    gap: 20,
  },
  itemContainer: {
    flexDirection: 'row',
  },
  itemHeader: {
    backgroundColor: colors.PINK_700,
    width: 6,
    height: 50,
    marginRight: 8,
    borderRadius: 20,
  },
  infoContainer: {
    justifyContent: 'space-evenly',
  },
  addressText: {
    fontSize: 13,
    color: colors.GRAY_500,
  },
  titleText: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.BLACK,
  },
});

export default EventList;
