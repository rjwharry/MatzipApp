import { authNavigations } from '@/constants';
import AuthHomeScreen from '@/screens/auth/AuthHomeScreen';
import LoginScreen from '@/screens/auth/LoginScreen';
import SignupScreen from '@/screens/auth/SignupScreen';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';


export type AuthStackParamList = {
    [authNavigations.AUTH_HOME]: undefined;
    [authNavigations.LOGIN]: undefined;
    [authNavigations.SIGNUP]: undefined;
};

const Stack = createStackNavigator<AuthStackParamList>();

const AuthStackNavigator = () => {

    return (
        <Stack.Navigator screenOptions={{ 
            cardStyle: { backgroundColor: 'white' },
            headerStyle: {
                backgroundColor: 'white',
                shadowColor: 'gray',
            },
        }}>
            <Stack.Screen 
                name={authNavigations.AUTH_HOME} 
                component={AuthHomeScreen} 
                options={{
                    headerTitle: '',
                    headerShown: false,
                }}/>
            <Stack.Screen 
                name={authNavigations.LOGIN} 
                component={LoginScreen} 
                options={{
                    headerTitle: '로그인',
                }}/>
            <Stack.Screen 
                name={authNavigations.SIGNUP} 
                component={SignupScreen} 
                options={{
                    headerTitle: '회원가입',
                }}/>
        </Stack.Navigator>
    );
};

export default AuthStackNavigator;