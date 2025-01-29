import { useEffect, useState } from "react";

interface UseFormProps<T> {
    initialValues: T;
    validateLogin: (values: T) => Record<keyof T, string>;
}

const useForm = <T>({initialValues, validateLogin}: UseFormProps<T>) => {
    const [values, setValues] = useState(initialValues);
    const [touched, setTouched] = useState<Record<string, boolean>>({});
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleChangeText = (key: keyof T, value: string) => {
        setValues({
            ...values,
            [key]: value
        });
    }

    const handleBlur = (key: keyof T) => {
        setTouched({
            ...touched,
            [key]: true
        });
    }

    const getTextInputProps = (key: keyof T) => {
        return {
            value: values[key],
            onChangeText: (text: string) => handleChangeText(key, text),
            onBlur: () => handleBlur(key),
        }
    }

    useEffect(() => {
        const newErrors = validateLogin(values);
        setErrors(newErrors);
    }, [validateLogin, values])

    return {
        values,
        errors,
        touched,
        getTextInputProps,
    }
}

export default useForm;