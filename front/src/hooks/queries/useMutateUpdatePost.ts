import { queryClient } from '@/api';
import { updatePost } from '@/api/post';
import { queryKeys } from '@/types';
import { useMutation } from '@tanstack/react-query';

const useMutateUpdatePost = () => {
  return useMutation({
    mutationFn: updatePost,
    onSuccess: (newPost) => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.POST, queryKeys.GET_POSTS] });
      queryClient.invalidateQueries({ queryKey: [queryKeys.MARKER, queryKeys.GET_MARKERS] });
      queryClient.setQueryData([queryKeys.POST, queryKeys.GET_POST, newPost.id], newPost);
    },
  });
};

export default useMutateUpdatePost;
