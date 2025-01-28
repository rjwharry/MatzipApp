import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import InputField from '../../components/InputField';

const LoginScreen: React.FC = () => {
    const [values, setValues] = useState({
        email: '',
        password: ''
    });

    const [touched, setTouched] = useState({
        email: false,
        password: false
    });

    const handleChangeText = (key: string, value: string) => {
        setValues({
            ...values,
            [key]: value
        });
    }

    const handleBlur = (key: string) => {
        setTouched({
            ...touched,
            [key]: true
        });
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.inputContainer}>
                <InputField 
                    placeholder='이메일'
                    error="이메일을 입력해주세요" 
                    inputMode='email'
                    touched={touched.email} 
                    value={values.email}
                    onChangeText={(text) => handleChangeText('email', text)}
                    onBlur={() => handleBlur('email')}
                />
                <InputField 
                    placeholder='비밀번호' 
                    error='비밀번호를 입력해주세요'
                    secureTextEntry
                    touched={touched.password}
                    value={values.password}
                    onChangeText={(text) => handleChangeText('password', text)}
                    onBlur={() => handleBlur('password')}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 30,
    },
    inputContainer: {
        gap: 20
    }
});

export default LoginScreen;