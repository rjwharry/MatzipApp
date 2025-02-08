interface UserInformation {
  email: string;
  password: string;
}

const validateUser = (values: UserInformation) => {
  const errors: Record<string, string> = { email: '', password: '' };
  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = '유효한 이메일을 입력해주세요';
  }
  if (!(values.password.length > 8 && values.password.length < 20)) {
    errors.password = '비밀번호는 8자 이상 20자 이하로 입력해주세요';
  }
  return errors;
};

const validateLogin = (values: UserInformation) => {
  return validateUser(values);
};

const validateSignup = (values: UserInformation & { passwordConfirm: string }) => {
  const errors = validateUser(values);
  const signupErrors: Record<string, string> = { ...errors, passwordConfirm: '' };
  if (values.password !== values.passwordConfirm) {
    signupErrors.passwordConfirm = '비밀번호가 일치하지 않습니다';
  }
  return signupErrors;
};

const validatePost = (values: { title: string }) => {
  const errors = {
    title: '',
    description: '',
  };
  if (values.title.trim() === '') {
    errors.title = '제목은 1~30자 이내로 입력해주세요.';
  }
  return errors;
};

export { validateLogin, validatePost, validateSignup };
