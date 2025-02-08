import useAuth from '@/hooks/queries/useAuth';
import MainDrawerNavigator from '@/navigations/drawer/MainDrawerNavigator';
import AuthStackNavigator from '@/navigations/stack/AuthStackNavigator';
import React from 'react';

const RootNavigator = () => {
  const { isLogin } = useAuth();

  return <>{isLogin ? <MainDrawerNavigator /> : <AuthStackNavigator />}</>;
};

export default RootNavigator;
