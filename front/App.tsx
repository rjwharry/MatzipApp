import { NavigationContainer } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  StyleSheet,
} from 'react-native';
import RootNavigator from './src/navigations/root/RootNavigator';



function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <RootNavigator/>
    </NavigationContainer>
  ) 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    flex: 1,
    borderWidth: 2,
    borderColor: 'black',
    height: 50,
    width: 100,
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },  
});

export default App;
