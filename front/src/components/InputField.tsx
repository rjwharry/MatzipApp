/* eslint-disable react/display-name */
import React, { ForwardedRef, forwardRef, useRef } from 'react';
import { Dimensions, Pressable, StyleSheet, TextInput, TextInputProps, View } from 'react-native';
import { Text } from 'react-native-gesture-handler';
import { colors } from '../constants';
import { mergeRefs } from '../utils';

interface InputFieldProps extends TextInputProps {
    disabled?: boolean; 
    error?: string;
    touched?: boolean

}

const deviceHeight = Dimensions.get('screen').height

const InputField = forwardRef(({disabled = false, error, touched, ...props }: InputFieldProps, ref: ForwardedRef<TextInput>) => {
    const innerRef = useRef<TextInput | null>(null);

    const handlePressInput = () => {
        innerRef.current?.focus();
    }
    return (
        <Pressable onPress={handlePressInput}>
            <View style={[
                styles.container, 
                disabled && styles.disabled, 
                touched && Boolean(error) && styles.inputError
            ]}>
                <TextInput
                    ref={ref ? mergeRefs(innerRef, ref) : innerRef}
                    editable={!disabled}
                    style={[styles.input]} 
                    placeholderTextColor={colors.GRAY_500}
                    autoCapitalize='none'
                    spellCheck={false}
                    autoCorrect={false}
                    {...props}
                />
                {touched && Boolean(error) && <Text style={styles.errorText}>{error}</Text>}
            </View>
        </Pressable>
    );
});

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: colors.GRAY_200,
        padding: deviceHeight > 700 ? 15: 10,
    },
    input: {
        fontSize: 16,
        color: colors.BLACK,
        padding: 0,
    },
    disabled: {
        backgroundColor: colors.GRAY_200,
        color: colors.GRAY_700,
    },
    inputError: {
        borderWidth: 1,
        borderColor: colors.RED_300,
    },
    errorText: {
        color: colors.RED_500,
        fontSize: 12,
    }
})

export default InputField;