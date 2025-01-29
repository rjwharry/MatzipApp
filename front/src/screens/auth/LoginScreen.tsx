import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import InputField from '../../components/InputField';
import CustomButton from '../../components/CustomButton';
import useForm from '../../hooks/useForm';
import { validateLogin } from '../../utils';



const LoginScreen = () => {
    const login = useForm({
        initialValues: {
            email: '',
            password: ''
        },
        validateLogin: validateLogin,
    });

    const handleSubmit = () => {
        console.log('values', login.values);
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.inputContainer}>
                <InputField 
                    placeholder='이메일'
                    error={login.errors.email}
                    inputMode='email'
                    touched={login.touched.email} 
                    {...login.getTextInputProps('email')}
                />
                <InputField 
                    placeholder='비밀번호' 
                    error={login.errors.password}
                    secureTextEntry
                    touched={login.touched.password}
                    {...login.getTextInputProps('password')}
                />
            </View>
            <CustomButton 
                label='로그인' 
                size='large' 
                onPress={handleSubmit}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 30,
    },
    inputContainer: {
        gap: 20,
        marginBottom: 30,
    }
});

export default LoginScreen;