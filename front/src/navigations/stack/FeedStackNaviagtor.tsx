import FeedHomeHeaderLeft from '@/components/feed/FeedHomeHeaderLeft';
import { feedNavigations } from '@/constants';
import FeedHomeScreen from '@/screens/feed/FeedHomeScreen';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

export type FeedStackParamList = {
  [feedNavigations.FEED_HOME]: undefined;
  // [feedNavigations.FEED_DETAIL]: undefined;
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
          //   headerLeft: () => <Text>메뉴</Text>,
        })}
      />
    </Stack.Navigator>
  );
};

export default FeedStackNavigator;
