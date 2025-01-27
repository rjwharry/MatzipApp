import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthStackParamList } from '../../navigations/stack/AuthStackNavigator';
import CustomButton from '../../components/CustomButton';
import { authNavigations } from '../../constants';

type AuthHomeScreenProps = StackScreenProps<AuthStackParamList, typeof authNavigations.AUTH_HOME>;

const AuthHomeScreen = ({ navigation } : AuthHomeScreenProps) => {
    return (
        <SafeAreaView>
            <View>
                <CustomButton 
                    label='로그인화면으로 이동' 
                    onPress={() => navigation.navigate(authNavigations.LOGIN)}
                />
                <CustomButton 
                    label='회원가입화면으로 이동' 
                    variant='outlined'
                    onPress={() => navigation.navigate(authNavigations.SIGNUP)}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    
});

export default AuthHomeScreen;