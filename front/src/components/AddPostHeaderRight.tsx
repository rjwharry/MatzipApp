import HeaderButton from '@/components/HeaderButton';
import React from 'react';
import { View } from 'react-native';

const AddPostHeaderRight = (onSubmit: () => void) => {
  return (
    <View>
      <HeaderButton labelText="등록" onPress={onSubmit} />
    </View>
  );
};

export default AddPostHeaderRight;
