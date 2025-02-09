import { uploadImages } from '@/api';
import { UseMutationCustomOptions } from '@/types';
import { useMutation } from '@tanstack/react-query';

const UseMutateImages = (options?: UseMutationCustomOptions) => {
  return useMutation({
    mutationFn: uploadImages,
    ...options,
  });
};

export default UseMutateImages;
