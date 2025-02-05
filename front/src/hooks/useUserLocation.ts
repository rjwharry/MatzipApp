import Geolocation from '@react-native-community/geolocation';
import { useEffect, useState } from 'react';
import { LatLng } from 'react-native-maps';
import useAppState from './useAppState';

const useUserLocation = () => {
  const [userLocation, setUserLocation] = useState<LatLng>({
    latitude: 37.403859,
    longitude: 127.121451,
  });
  const [isUserLocationError, setIsUserLocationError] = useState(false);
  const isComeback = useAppState();
  useEffect(() => {
    Geolocation.getCurrentPosition(
      (location) => {
        const { latitude, longitude } = location.coords;
        setUserLocation({ latitude, longitude });
        setIsUserLocationError(false);
      },
      () => {
        setIsUserLocationError(true);
      }
    );
  }, [isComeback]);

  return { userLocation, isUserLocationError };
};

export default useUserLocation;
