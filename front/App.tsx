import { queryClient } from '@/api';
import RootNavigator from '@/navigations/root/RootNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClientProvider } from '@tanstack/react-query';
import React from 'react';



function App(): React.JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <RootNavigator/>
      </NavigationContainer>
    </QueryClientProvider>
  ) 
}

export default App;
