import { colors, mainNavigations } from '@/constants';
import CalendarHomeScreen from '@/screens/calendar/CalendarHomeScreen';
import FeedHomeScreen from '@/screens/feed/FeedHomeScreen';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigatorScreenParams, RouteProp } from '@react-navigation/native';
import React from 'react';
import { Dimensions } from 'react-native';
import MapStackNavigator, { MapStackParamList } from '../stack/MapStackNavigator';
import CustomDrawerContent from './CustomDrawerContent';

export type MainDrawerParamList = {
  [mainNavigations.MAP_HOME]: NavigatorScreenParams<MapStackParamList>;
  [mainNavigations.FEED_HOME]: undefined;
  [mainNavigations.CALENDAR_HOME]: undefined;
};

const Drawer = createDrawerNavigator<MainDrawerParamList>();

const DrawIcons = (route: RouteProp<MainDrawerParamList>, focused: boolean) => {
  let iconName = '';

  switch (route.name) {
    case mainNavigations.MAP_HOME:
      iconName = 'location-on';
      break;
    case mainNavigations.FEED_HOME:
      iconName = 'book';
      break;
    case mainNavigations.CALENDAR_HOME:
      iconName = 'event-note';
      break;
  }
  return (
    <MaterialIcons name={iconName} size={18} color={focused ? colors.BLACK : colors.GRAY_500} />
  );
};

const MainDrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={CustomDrawerContent}
      screenOptions={({ route }) => ({
        headerShown: false,
        drawerType: 'front',
        drawerStyle: {
          width: Dimensions.get('screen').width * 0.6,
          backgroundColor: colors.WHITE,
        },
        drawerActiveTintColor: colors.BLACK,
        drawerInactiveTintColor: colors.GRAY_500,
        drawerInactiveBackgroundColor: colors.GRAY_200,
        drawerActiveBackgroundColor: colors.PINK_200,
        drawerLabelStyle: {
          fontWeight: '600',
        },
        drawerIcon: ({ focused }) => DrawIcons(route, focused),
        drawerItemStyle: {
          borderRadius: 10,
          marginBottom: 4,
        },
      })}
    >
      <Drawer.Screen
        name={mainNavigations.MAP_HOME}
        component={MapStackNavigator}
        options={{
          title: '홈',
          swipeEnabled: false,
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
