interface UserInformation {
    email: string;
    password: string;
}

const validateLogin = (values: UserInformation) => {
    const errors: Record<string, string> = { email: '', password: '' };
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        errors.email = '유효한 이메일을 입력해주세요';
    }
    if (!(values.password.length > 8 && values.password.length < 20)) {
        errors.password = '비미번호는 8자 이상 20자 이하로 입력해주세요'
    }
    return errors;
}

export {validateLogin}