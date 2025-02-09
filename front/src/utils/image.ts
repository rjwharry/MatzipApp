import { Image } from 'react-native-image-crop-picker';

const getFormDataImages = (images: Image[]): FormData => {
  const formData = new FormData();
  images.forEach(({ path, mime }) => {
    formData.append('images', {
      uri: path,
      type: mime,
      name: path.split('/').pop(),
    });
  });
  return formData;
};

export { getFormDataImages };
