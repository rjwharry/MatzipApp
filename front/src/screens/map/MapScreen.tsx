import React from 'react';
import { StyleSheet } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

const MapHomeScreen: React.FC = () => {
  return (
    <MapView
      style={styles.container}
      provider={PROVIDER_GOOGLE}
      showsUserLocation
      followsUserLocation
      showsMyLocationButton
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MapHomeScreen;
