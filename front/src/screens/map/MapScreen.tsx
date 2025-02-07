import { colors, mapNavigations } from '@/constants';
import usePermission from '@/hooks/usePermission';
import useUserLocation from '@/hooks/useUserLocation';
import { MainDrawerParamList } from '@/navigations/drawer/MainDrawerNavigator';
import { MapStackParamList } from '@/navigations/stack/MapStackNavigator';
import Ionicons from '@react-native-vector-icons/ionicons';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useRef } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type MapHomeScreenNavigationProps = CompositeNavigationProp<
  StackNavigationProp<MapStackParamList, typeof mapNavigations.MAP_HOME>,
  DrawerNavigationProp<MainDrawerParamList>
>;

const MapHomeScreen = () => {
  const mapRef = useRef<MapView | null>(null);
  const inset = useSafeAreaInsets();
  const navigation = useNavigation<MapHomeScreenNavigationProps>();
  const { userLocation, isUserLocationError } = useUserLocation();
  usePermission('LOCATION');

  const handleOnPressUserLocation = () => {
    if (isUserLocationError) {
      return;
    }
    mapRef.current?.animateToRegion({
      latitude: userLocation.latitude,
      longitude: userLocation.longitude,
      latitudeDelta: 0.0473,
      longitudeDelta: 0.092,
    });
  };

  return (
    <>
      <MapView
        ref={mapRef}
        style={styles.container}
        provider={PROVIDER_GOOGLE}
        showsUserLocation
        followsUserLocation
        showsMyLocationButton={false}
      />
      <Pressable
        style={[styles.drawerButton, { top: inset.top || 20 }]}
        onPress={() => navigation.openDrawer()}
      >
        <Ionicons name="menu" color={colors.WHITE} size={25} />
      </Pressable>
      <View style={styles.buttonList}>
        <Pressable style={styles.locationButton} onPress={handleOnPressUserLocation}>
          <MaterialIcons name="my-location" color={colors.WHITE} size={25} />
        </Pressable>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerButton: {
    position: 'absolute',
    left: 0,
    backgroundColor: colors.PINK_700,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
    shadowColor: colors.BLACK,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.5,
    elevation: 4,
  },
  buttonList: {
    position: 'absolute',
    bottom: 30,
    right: 15,
  },
  locationButton: {
    backgroundColor: colors.PINK_700,
    marginVertical: 5,
    height: 48,
    width: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    shadowColor: colors.BLACK,
    shadowOffset: {
      width: 1,
      height: 3,
    },
    shadowOpacity: 0.5,
    elevation: 2,
  },
});

export default MapHomeScreen;
