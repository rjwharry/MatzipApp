import { queryClient } from '@/api';
import { updateFavoritePost } from '@/api/post';
import { queryKeys, UseMutationCustomOptions } from '@/types';
import { useMutation } from '@tanstack/react-query';

const useMutateFavoritePost = (options?: UseMutationCustomOptions) => {
  return useMutation({
    mutationFn: updateFavoritePost,
    onSuccess: (updatedId) => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.POST, queryKeys.GET_POST, updatedId],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.POST, queryKeys.FAVORITE, queryKeys.GET_FAVORITES],
      });
    },
    ...options,
  });
};

export default useMutateFavoritePost;
