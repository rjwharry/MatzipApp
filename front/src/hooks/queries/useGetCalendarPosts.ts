import { getCalendarPosts, ResponseCalendarPost } from '@/api/post';
import { queryKeys, UseQueryCustomOptions } from '@/types';
import { useQuery } from '@tanstack/react-query';

const useGetCalendarPosts = (
  year: number,
  month: number,
  options?: UseQueryCustomOptions<ResponseCalendarPost>
) => {
  return useQuery({
    queryFn: () => getCalendarPosts(year, month),
    queryKey: [queryKeys.POST, queryKeys.GET_CALENDAR_POSTS, year, month],
    ...options,
  });
};

export default useGetCalendarPosts;
