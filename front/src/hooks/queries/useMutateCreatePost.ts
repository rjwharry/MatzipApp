import { queryClient } from '@/api';
import { createPost } from '@/api/post';
import { queryKeys, UseMutationCustomOptions } from '@/types';
import { useMutation } from '@tanstack/react-query';

const useMutateCreatePost = (options?: UseMutationCustomOptions) => {
  return useMutation({
    mutationFn: createPost,
    ...options,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.MARKER, queryKeys.GET_MARKERS] });
      queryClient.invalidateQueries({ queryKey: [queryKeys.POST, queryKeys.GET_POSTS] });
    },
  });
};

export default useMutateCreatePost;
