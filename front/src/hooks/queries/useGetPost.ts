import { getPost, ResopnseSinglePost } from '@/api/post';
import { queryKeys } from '@/types';
import { useQuery } from '@tanstack/react-query';

const useGetPost = (id: number | null) => {
  return useQuery<ResopnseSinglePost>({
    queryKey: [queryKeys.POST, queryKeys.GET_POST, id],
    queryFn: () => getPost(Number(id)),
    enabled: !!id,
  });
};

export default useGetPost;
