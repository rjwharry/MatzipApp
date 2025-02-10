import { ImageUri, Post } from '@/types';
import { axiosInstance } from './axios';

type ResponsePost = Post & { images: ImageUri[] };

type RequestPost = Omit<Post, 'id'> & { imageUris: ImageUri[] };

const createPost = async (body: RequestPost): Promise<ResponsePost> => {
  const { data } = await axiosInstance.post('/posts', body);
  return data;
};

type ResopnseSinglePost = ResponsePost & { isFavorite: boolean };

const getPost = async (id: number): Promise<ResopnseSinglePost> => {
  const { data } = await axiosInstance.get(`/posts/${id}`);
  return data;
};

export { createPost, getPost };
export type { RequestPost, ResopnseSinglePost, ResponsePost };
