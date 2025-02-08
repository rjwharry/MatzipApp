import { errorMessages } from '@/constants';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Config from 'react-native-config';
import { LatLng } from 'react-native-maps';

const useGetAddress = (location: LatLng) => {
  const { latitude, longitude } = location;
  const [address, setAddress] = useState('');
  useEffect(() => {
    try {
      (async () => {
        const { data } = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&result_type=street_address|route|political&key=${Config.GOOGLE_MAPS_API_KEY}&language=ko`
        );
        setAddress(
          data.results.length
            ? data.results[0].formatted_address
            : `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`
        );
      })();
    } catch (error) {
      setAddress(errorMessages.CANNOT_GET_ADDRESS);
    }
  }, [latitude, longitude]);
  return address;
};

export default useGetAddress;
