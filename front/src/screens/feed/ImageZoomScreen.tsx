import ImageCarousel from '@/components/common/ImageCarousel';
import { feedNavigations } from '@/constants';
import { FeedStackParamList } from '@/navigations/stack/FeedStackNaviagtor';
import useDetailPostStore from '@/store/useDetailPostStore';
import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';

type ImageZoomScreenProps = StackScreenProps<FeedStackParamList, typeof feedNavigations.IMAGE_ZOOM>;

const ImageZoomScreen = ({ route }: ImageZoomScreenProps) => {
  const index = route.params.index;
  const { detailPost } = useDetailPostStore();
  if (!detailPost) {
    console.log(detailPost);
    return <></>;
  }
  return <ImageCarousel images={detailPost.images} pressedIndex={index} />;
};

export default ImageZoomScreen;
