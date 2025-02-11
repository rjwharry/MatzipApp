import { colors, feedNavigations } from '@/constants';
import { MainDrawerParamList } from '@/navigations/drawer/MainDrawerNavigator';
import { FeedStackParamList } from '@/navigations/stack/FeedStackNaviagtor';
import Ionicons from '@react-native-vector-icons/ionicons';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { CompositeNavigationProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { View } from 'react-native';
import HeaderButton from './HeaderButton';

type FeedHomeHeaderLeftProps = CompositeNavigationProp<
  StackNavigationProp<FeedStackParamList, typeof feedNavigations.FEED_HOME>,
  DrawerNavigationProp<MainDrawerParamList>
>;

const FeedHomeHeaderLeft = (navigation: FeedHomeHeaderLeftProps) => {
  return (
    <View>
      <HeaderButton
        icon={<Ionicons name="menu" size={25} color={colors.BLACK} />}
        onPress={() => navigation.openDrawer()}
      />
    </View>
  );
};

export default FeedHomeHeaderLeft;
