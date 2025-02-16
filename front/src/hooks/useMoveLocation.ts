import useLocationStore from '@/store/useLocationStore';
import { numbers } from '@/utils';
import { useEffect, useRef, useState } from 'react';
import MapView, { LatLng, Region } from 'react-native-maps';

type Delta = Pick<Region, 'latitudeDelta' | 'longitudeDelta'>;

const useMoveLocation = () => {
  const mapRef = useRef<MapView | null>(null);
  const { moveLocation } = useLocationStore();
  const [regionData, setRegionData] = useState<Delta>(numbers.INITIAL_REGION);

  const moveMapView = (coordinate: LatLng) => {
    mapRef.current?.animateToRegion({
      latitude: coordinate.latitude,
      longitude: coordinate.longitude,
      ...regionData,
    });
  };

  const handleChangeDelta = (region: Region) => {
    const { latitudeDelta, longitudeDelta } = region;
    setRegionData({ latitudeDelta, longitudeDelta });
  };

  useEffect(() => {
    moveLocation && moveMapView(moveLocation);
  }, [moveLocation]);
  return { moveMapView, mapRef, handleChangeDelta };
};

export default useMoveLocation;
