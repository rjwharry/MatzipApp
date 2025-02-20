import { queryClient } from '@/api';
import { deletePost } from '@/api/post';
import { queryKeys, UseMutationCustomOptions } from '@/types';
import { useMutation } from '@tanstack/react-query';

const useMutateDeletePost = (options?: UseMutationCustomOptions) => {
  return useMutation({
    mutationFn: deletePost,
    mutationKey: [queryKeys.POST, queryKeys.DELETE_POST],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.POST, queryKeys.GET_POSTS] });
      queryClient.invalidateQueries({ queryKey: [queryKeys.MARKER, queryKeys.GET_MARKERS] });
    },
    ...options,
  });
};

export default useMutateDeletePost;
