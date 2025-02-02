import CalendarHomeScreen from '@/screens/calendar/CalendarHomeScreen';
import FeedHomeScreen from '@/screens/feed/FeedHomeScreen';
import MapHomeScreen from '@/screens/map/MapScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';

const Drawer = createDrawerNavigator();

const MainDrawerNavigator = () => {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="MapHome" component={MapHomeScreen} />
            <Drawer.Screen name="FeedHome" component={FeedHomeScreen} />
            <Drawer.Screen name="CalendarHome" component={CalendarHomeScreen} />
        </Drawer.Navigator>
    );
};

export default MainDrawerNavigator;