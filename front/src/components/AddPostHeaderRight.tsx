import HeaderButton from '@/components/HeaderButton';
import React from 'react';

const AddPostHeaderRight = (onSubmit: () => void) => {
  return <HeaderButton labelText="등록" onPress={onSubmit} />;
};

export default AddPostHeaderRight;
