import { colors, feedNavigations, feedTabNavigations, mainNavigations } from '@/constants';
import useGetPost from '@/hooks/queries/useGetPost';
import { MainDrawerParamList } from '@/navigations/drawer/MainDrawerNavigator';
import { FeedTabParamList } from '@/navigations/tab/FeedTabNavigator';
import { getDateWithSeparator, isAndroid } from '@/utils';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import Octicons from '@react-native-vector-icons/octicons';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  Dimensions,
  Image,
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import CustomMarker from '../common/CustomMarker';

interface MarkerModalProps {
  markerId: number | null;
  isVisible: boolean;
  hide: () => void;
}

type Navigation = CompositeNavigationProp<
  DrawerNavigationProp<MainDrawerParamList>,
  BottomTabNavigationProp<FeedTabParamList>
>;

const MarkerModal = ({ markerId, isVisible, hide }: MarkerModalProps) => {
  const { data: post, isPending, isError } = useGetPost(markerId);
  const navigation = useNavigation<Navigation>();

  if (isPending || isError) {
    return <></>;
  }

  const handlePressModal = () => {
    navigation.navigate(mainNavigations.FEED_HOME, {
      screen: feedTabNavigations.FEED_HOME,
      params: {
        screen: feedNavigations.FEED_DETAIL,
        params: {
          id: post.id,
        },
        initial: false,
      },
      initial: false,
    });
    hide();
  };

  return (
    <Modal visible={isVisible} transparent={true} animationType="slide">
      <SafeAreaView style={styles.optionBackground} onTouchEnd={hide}>
        <Pressable style={styles.cardContainer} onPress={handlePressModal}>
          <View style={styles.cardInner}>
            <View style={styles.cardAlign}>
              {post.images.length > 0 && (
                <View style={styles.imageContainer}>
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
                  <CustomMarker color={post.color} score={post.score} />
                </View>
              )}
              <View style={styles.infoContainer}>
                <View style={styles.addressContainer}>
                  <Octicons name="location" size={10} color={colors.GRAY_500} />
                  <Text numberOfLines={1} ellipsizeMode="clip" style={styles.addressText}>
                    {post.address}
                  </Text>
                </View>
                <Text style={styles.titleText}>{post.title}</Text>
                <Text style={styles.dateText}>{getDateWithSeparator(post?.date)}</Text>
              </View>
            </View>
            <MaterialIcons name="arrow-forward-ios" size={20} color={colors.BLACK} />
          </View>
        </Pressable>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  optionBackground: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  cardContainer: {
    backgroundColor: colors.WHITE,
    margin: 10,
    borderRadius: 20,
    shadowColor: colors.BLACK,
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.2,
    elevation: 1,
    borderColor: colors.GRAY_500,
    borderWidth: 1.5,
  },
  cardInner: {
    padding: 20,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardAlign: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 35,
  },
  emptyImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.GRAY_200,
    borderRadius: 35,
    borderWidth: 1,
  },
  infoContainer: {
    width: Dimensions.get('screen').width / 2,
    marginLeft: 15,
    gap: 5,
  },
  addressContainer: {
    gap: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  addressText: {
    color: colors.GRAY_500,
  },
  titleText: {
    color: colors.BLACK,
    fontSize: 25,
    fontWeight: 'bold',
  },
  dateText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.PINK_700,
  },
});

export default MarkerModal;
