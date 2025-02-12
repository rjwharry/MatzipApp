import FeedHomeHeaderLeft from '@/components/feed/FeedHomeHeaderLeft';
import { colors, feedNavigations } from '@/constants';
import FeedDetailScreen from '@/screens/feed/FeedDetailScreen';
import FeedHomeScreen from '@/screens/feed/FeedHomeScreen';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

export type FeedStackParamList = {
  [feedNavigations.FEED_HOME]: undefined;
  [feedNavigations.FEED_DETAIL]: { id: number };
};

const Stack = createStackNavigator<FeedStackParamList>();

const FeedStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: { backgroundColor: 'white' },
        headerStyle: {
          backgroundColor: 'white',
          shadowColor: 'gray',
        },
        headerTitleStyle: {
          fontSize: 15,
        },
        headerTintColor: 'black',
      }}
    >
      <Stack.Screen
        name={feedNavigations.FEED_HOME}
        component={FeedHomeScreen}
        options={({ navigation }) => ({
          headerTitle: '피드',
          headerLeft: () => FeedHomeHeaderLeft(navigation),
        })}
      />
      <Stack.Screen
        name={feedNavigations.FEED_DETAIL}
        component={FeedDetailScreen}
        options={{
          headerShown: false,
          cardStyle: { backgroundColor: colors.GRAY_100 },
        }}
      />
    </Stack.Navigator>
  );
};

export default FeedStackNavigator;
