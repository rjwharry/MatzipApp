import { mapNavigations } from '@/constants';
import { MapStackParamList } from '@/navigations/stack/MapStackNavigator';
import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type AddPostScreenProps = StackScreenProps<MapStackParamList, typeof mapNavigations.ADD_POST>;

const AddPostScreen = ({ route }: AddPostScreenProps) => {
  const { location } = route.params;
  return (
    <View style={styles.container}>
      <Text>{location.latitude}</Text>
      <Text>{location.longitude}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AddPostScreen;
