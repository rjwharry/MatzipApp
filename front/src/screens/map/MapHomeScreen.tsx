import CustomMarker from '@/components/CustomMarker';
import { alerts, colors, mapNavigations } from '@/constants';
import useGetMarkers from '@/hooks/queries/useGetMarkers';
import usePermission from '@/hooks/usePermission';
import useUserLocation from '@/hooks/useUserLocation';
import { MainDrawerParamList } from '@/navigations/drawer/MainDrawerNavigator';
import { MapStackParamList } from '@/navigations/stack/MapStackNavigator';
import mapStyle from '@/style/mapStyle';
import { headerKeys } from '@/types';
import { getHeader } from '@/utils';
import Ionicons from '@react-native-vector-icons/ionicons';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useRef, useState } from 'react';
import { Alert, Pressable, StyleSheet, View } from 'react-native';
import MapView, {
  Callout,
  LatLng,
  LongPressEvent,
  Marker,
  PROVIDER_GOOGLE,
} from 'react-native-maps';
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
  const [selectLocation, setSelectLocation] = useState<LatLng | null>();
  usePermission('LOCATION');
  //TODO: AccessToken이 있으면 알아서 refetch 되도록 변경해야 함.
  const { data: markers = [] } = useGetMarkers({
    enabled: !!getHeader(headerKeys.AUTHORIZATION),
  });
  const handleLongPressMapView = ({ nativeEvent }: LongPressEvent) => {
    setSelectLocation(nativeEvent.coordinate);
  };

  const handleOnPressAddPost = () => {
    if (!selectLocation) {
      return Alert.alert(alerts.NOT_SELECTED.TITLE, alerts.NOT_SELECTED.DESCRIPTION);
    }
    navigation.navigate(mapNavigations.ADD_POST, { location: selectLocation });
    setSelectLocation(null);
  };

  const handleOnPressUserLocation = () => {
    if (isUserLocationError) {
      return;
    }
    mapRef.current?.animateToRegion({
      latitude: userLocation.latitude,
      longitude: userLocation.longitude,
      latitudeDelta: 0.0173,
      longitudeDelta: 0.0022,
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
        customMapStyle={mapStyle}
        onLongPress={handleLongPressMapView}
        region={{ ...userLocation, latitudeDelta: 0.0173, longitudeDelta: 0.0022 }}
      >
        {markers.map(({ id, score, color, ...coordinate }) => (
          <CustomMarker key={id} score={score} color={color} coordinate={coordinate} />
        ))}
        {selectLocation && (
          <Callout>
            <Marker coordinate={selectLocation} />
          </Callout>
        )}
      </MapView>
      <Pressable
        style={[styles.drawerButton, { top: inset.top || 20 }]}
        onPress={() => navigation.openDrawer()}
      >
        <Ionicons name="menu" color={colors.WHITE} size={25} />
      </Pressable>
      <View style={styles.buttonList}>
        <Pressable style={styles.mapButton} onPress={handleOnPressAddPost}>
          <MaterialIcons name="add" color={colors.WHITE} size={25} />
        </Pressable>
        <Pressable style={styles.mapButton} onPress={handleOnPressUserLocation}>
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
  mapButton: {
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
