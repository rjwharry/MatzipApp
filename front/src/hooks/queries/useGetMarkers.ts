import { getMarkers } from '@/api';
import { Marker, queryKeys, UseQueryCustomOptions } from '@/types';
import { useQuery } from '@tanstack/react-query';

const useGetMarkers = (options?: UseQueryCustomOptions<Marker[]>) => {
  return useQuery({
    queryKey: [queryKeys.MARKER, queryKeys.GET_MARKERS],
    queryFn: getMarkers,
    ...options,
  });
};

export default useGetMarkers;
