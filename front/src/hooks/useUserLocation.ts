import Geolocation from '@react-native-community/geolocation';
import { useEffect, useState } from 'react';
import { LatLng } from 'react-native-maps';

const useUserLocation = () => {
  const [userLocation, setUserLocation] = useState<LatLng>({
    latitude: 37.403859,
    longitude: 127.121451,
  });
  const [isUserLocationError, setIsUserLocationError] = useState(false);
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
  }, []);

  return { userLocation, isUserLocationError };
};

export default useUserLocation;
