import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthStackParamList } from '../../navigations/stack/AuthStackNavigator';
import authNavigations from '../../constants';

type AuthHomeScreenProps = StackScreenProps<AuthStackParamList, typeof authNavigations.AUTH_HOME>;

const AuthHomeScreen = ({ navigation } : AuthHomeScreenProps) => {
    return (
        <SafeAreaView>
            <View>
                <Button title='로그인화면으로 이동' onPress={() => navigation.navigate(authNavigations.LOGIN)}/>
                <Button title='회원가입화면으로 이동' onPress={() => navigation.navigate(authNavigations.SIGNUP)}/>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    
});

export default AuthHomeScreen;