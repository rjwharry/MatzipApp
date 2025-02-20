import { ResponsePost } from '@/api/post';
import { create } from 'zustand';

interface DetailPostState {
  detailPost: ResponsePost | null;
  setDetailPost: (detailPost: ResponsePost) => void;
}

const useDetailPostStore = create<DetailPostState>((set) => ({
  detailPost: null,
  setDetailPost: (detailPost: ResponsePost) => {
    set({ detailPost });
  },
}));

export default useDetailPostStore;
