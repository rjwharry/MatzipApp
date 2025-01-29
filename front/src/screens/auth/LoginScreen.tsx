import React, { useRef } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../../components/CustomButton';
import InputField from '../../components/InputField';
import useForm from '../../hooks/useForm';
import { validateLogin } from '../../utils';



const LoginScreen = () => {
    const passwordRef = useRef<TextInput | null>(null);
    const login = useForm({
        initialValues: {
            email: '',
            password: ''
        },
        validate: validateLogin,
    });

    const handleSubmit = () => {
        console.log('values', login.values);
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.inputContainer}>
                <InputField 
                    autoFocus={true}
                    placeholder='이메일'
                    error={login.errors.email}
                    inputMode='email'
                    touched={login.touched.email} 
                    returnKeyType='next'
                    onSubmitEditing={() => {
                        passwordRef.current?.focus();
                    }}
                    {...login.getTextInputProps('email')}
                />
                <InputField 
                    ref={passwordRef}
                    placeholder='비밀번호' 
                    textContentType='oneTimeCode'
                    error={login.errors.password}
                    secureTextEntry
                    touched={login.touched.password}
                    onSubmitEditing={handleSubmit}
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