import { colors } from '@/constants';
import { MainDrawerParamList } from '@/navigations/drawer/MainDrawerNavigator';
import { FeedStackParamList } from '@/navigations/stack/FeedStackNaviagtor';
import { FeedTabParamList } from '@/navigations/tab/FeedTabNavigator';
import Ionicons from '@react-native-vector-icons/ionicons';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { CompositeNavigationProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { View } from 'react-native';
import HeaderButton from '../common/HeaderButton';

type FeedHomeHeaderLeftProps = CompositeNavigationProp<
  StackNavigationProp<FeedStackParamList>,
  CompositeNavigationProp<
    BottomTabNavigationProp<FeedTabParamList>,
    DrawerNavigationProp<MainDrawerParamList>
  >
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
