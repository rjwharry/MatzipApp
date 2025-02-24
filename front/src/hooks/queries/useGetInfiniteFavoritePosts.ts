import { getFavoritePosts, ResponsePost } from '@/api/post';
import { queryKeys, ResponseError } from '@/types';
import {
  InfiniteData,
  QueryKey,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
} from '@tanstack/react-query';

const useGetInfiniteFavoritePosts = (
  options?: UseInfiniteQueryOptions<
    ResponsePost[],
    ResponseError,
    InfiniteData<ResponsePost[], number>,
    ResponsePost[],
    QueryKey,
    number
  >
) => {
  return useInfiniteQuery({
    queryFn: ({ pageParam }) => getFavoritePosts(pageParam),
    queryKey: [queryKeys.POST, queryKeys.FAVORITE, queryKeys.GET_FAVORITES],
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const lastPost = lastPage[lastPage.length - 1];
      return lastPost ? allPages.length + 1 : undefined;
    },
    ...options,
  });
};

export default useGetInfiniteFavoritePosts;
