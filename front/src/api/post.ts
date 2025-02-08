import { ImageUri, Post } from '@/types';
import { axiosInstance } from './axios';

type ResponsePost = Post & { images: ImageUri[] };

type RequestPost = Omit<Post, 'id'> & { imageUris: ImageUri[] };

const createPost = async (body: RequestPost): Promise<ResponsePost> => {
  const { data } = await axiosInstance.post('/posts', body);
  return data;
};

export { createPost };
export type { RequestPost, ResponsePost };
