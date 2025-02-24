import { ImageUri, Post } from '@/types';
import { axiosInstance } from './axios';

type ResponsePost = Post & { images: ImageUri[] };

const getPosts = async (page: number): Promise<ResponsePost[]> => {
  const { data } = await axiosInstance.get(`/posts/my?page=${page}`);
  return data;
};

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

const deletePost = async (id: number) => {
  const { data } = await axiosInstance.delete(`/posts/${id}`);
  return data;
};

type RequestUpdatePost = {
  id: number;
  body: Omit<Post, 'id' | 'latitude' | 'longitude' | 'address'> & { imageUris: ImageUri[] };
};

const updatePost = async ({ id, body }: RequestUpdatePost): Promise<ResopnseSinglePost> => {
  const { data } = await axiosInstance.patch(`/posts/${id}`, body);
  return data;
};

const getFavoritePosts = async (page = 1): Promise<ResponsePost[]> => {
  const { data } = await axiosInstance.get(`/favorites/my?page=${page}`);
  return data;
};

const updateFavoritePost = async (id: number): Promise<number> => {
  const { data } = await axiosInstance.post(`/favorites/${id}`);

  return data;
};

export {
  createPost,
  deletePost,
  getFavoritePosts,
  getPost,
  getPosts,
  updateFavoritePost,
  updatePost,
};
export type { RequestPost, ResopnseSinglePost, ResponsePost };
