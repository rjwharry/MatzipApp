import CustomButton from '@/components/common/CustomButton';
import InputField from '@/components/common/InputField';
import useAuth from '@/hooks/queries/useAuth';
import useForm from '@/hooks/useForm';
import { validateSignup } from '@/utils';
import React, { useRef } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SignupScreen: React.FC = () => {
  const { loginMutation, signupMutation } = useAuth();
  const passwordRef = useRef<TextInput | null>(null);
  const passwordConfirmRef = useRef<TextInput | null>(null);
  const signup = useForm({
    initialValues: {
      email: '',
      password: '',
      passwordConfirm: '',
    },
    validate: validateSignup,
  });
  const handleSubmit = () => {
    const { email, password } = signup.values;
    signupMutation.mutate(
      { email, password },
      {
        onSuccess: () => {
          loginMutation.mutate({ email, password });
        },
      }
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <InputField
          placeholder="이메일"
          error={signup.errors.email}
          inputMode="email"
          touched={signup.touched.email}
          autoFocus={true}
          returnKeyType="next"
          // submitBehavior='newline'
          onSubmitEditing={() => {
            passwordRef.current?.focus();
          }}
          {...signup.getTextInputProps('email')}
        />
        <InputField
          ref={passwordRef}
          placeholder="비밀번호"
          textContentType="oneTimeCode"
          error={signup.errors.password}
          secureTextEntry
          touched={signup.touched.password}
          returnKeyType="next"
          // submitBehavior='newline'
          onSubmitEditing={() => {
            passwordConfirmRef.current?.focus();
          }}
          {...signup.getTextInputProps('password')}
        />
        <InputField
          ref={passwordConfirmRef}
          placeholder="비밀번호 확인"
          textContentType="oneTimeCode"
          error={signup.errors.passwordConfirm}
          secureTextEntry
          touched={signup.touched.passwordConfirm}
          returnKeyType="join"
          onSubmitEditing={handleSubmit}
          {...signup.getTextInputProps('passwordConfirm')}
        />
      </View>
      <CustomButton label="회원가입" onPress={handleSubmit} />
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
  },
});

export default SignupScreen;
