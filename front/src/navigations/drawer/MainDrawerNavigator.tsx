import { mainNavigations } from '@/constants';
import CalendarHomeScreen from '@/screens/calendar/CalendarHomeScreen';
import FeedHomeScreen from '@/screens/feed/FeedHomeScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigatorScreenParams } from '@react-navigation/native';
import React from 'react';
import MapStackNavigator, { MapStackParamList } from '../stack/MapStackNavigator';

export type MainDrawerParamList = {
  [mainNavigations.MAP_HOME]: NavigatorScreenParams<MapStackParamList>;
  [mainNavigations.FEED_HOME]: undefined;
  [mainNavigations.CALENDAR_HOME]: undefined;
};

const Drawer = createDrawerNavigator<MainDrawerParamList>();

const MainDrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerType: 'front',
      }}
    >
      <Drawer.Screen
        name={mainNavigations.MAP_HOME}
        component={MapStackNavigator}
        options={{
          title: '홈',
        }}
      />
      <Drawer.Screen
        name={mainNavigations.FEED_HOME}
        component={FeedHomeScreen}
        options={{
          title: '피드',
        }}
      />
      <Drawer.Screen
        name={mainNavigations.CALENDAR_HOME}
        component={CalendarHomeScreen}
        options={{
          title: '캘린더',
        }}
      />
    </Drawer.Navigator>
  );
};

export default MainDrawerNavigator;
