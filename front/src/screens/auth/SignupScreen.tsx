import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../../components/CustomButton';
import InputField from '../../components/InputField';
import useForm from '../../hooks/useForm';
import { validateSignup } from '../../utils';

const SignupScreen: React.FC = () => {
    const signup = useForm({
        initialValues: {
            email: '',
            password: '',
            passwordConfirm: '',
        },
        validate: validateSignup
    })
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.inputContainer}>
                <InputField 
                    placeholder='이메일'
                    error={signup.errors.email}
                    inputMode='email'
                    touched={signup.touched.email} 
                    {...signup.getTextInputProps('email')}
                />
                <InputField 
                    placeholder='비밀번호' 
                    error={signup.errors.password}
                    secureTextEntry
                    touched={signup.touched.password}
                    {...signup.getTextInputProps('password')}
                />
                <InputField 
                    placeholder='비밀번호 확인' 
                    error={signup.errors.passwordConfirm}
                    secureTextEntry
                    touched={signup.touched.passwordConfirm}
                    {...signup.getTextInputProps('passwordConfirm')}
                />
            </View>
            <CustomButton label='회원가입'/>
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

export default SignupScreen;