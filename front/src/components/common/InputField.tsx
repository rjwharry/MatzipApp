/* eslint-disable react/display-name */
import { colors } from '@/constants';
import { mergeRefs } from '@/utils';
import React, { ForwardedRef, forwardRef, ReactNode, useRef } from 'react';
import { Dimensions, Pressable, StyleSheet, TextInput, TextInputProps, View } from 'react-native';
import { Text } from 'react-native-gesture-handler';

interface InputFieldProps extends TextInputProps {
  disabled?: boolean;
  error?: string;
  touched?: boolean;
  icon?: ReactNode;
}

const deviceHeight = Dimensions.get('screen').height;

const InputField = forwardRef(
  (
    { disabled = false, error, touched, icon = null, ...props }: InputFieldProps,
    ref: ForwardedRef<TextInput>
  ) => {
    const innerRef = useRef<TextInput | null>(null);

    const handlePressInput = () => {
      innerRef.current?.focus();
    };
    return (
      <Pressable onPress={handlePressInput}>
        <View
          style={[
            styles.container,
            disabled && styles.disabled,
            touched && Boolean(error) && styles.inputError,
            props.multiline && styles.multiline,
          ]}
        >
          <View style={Boolean(icon) && styles.innerContainer}>
            {icon}
            <TextInput
              ref={ref ? mergeRefs(innerRef, ref) : innerRef}
              editable={!disabled}
              style={[styles.input]}
              placeholderTextColor={colors.GRAY_500}
              autoCapitalize="none"
              spellCheck={false}
              autoCorrect={false}
              {...props}
            />
          </View>
          {touched && Boolean(error) && <Text style={styles.errorText}>{error}</Text>}
        </View>
      </Pressable>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: colors.GRAY_200,
    padding: deviceHeight > 700 ? 15 : 10,
  },
  input: {
    fontSize: 16,
    color: colors.BLACK,
    padding: 0,
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  disabled: {
    backgroundColor: colors.GRAY_200,
    color: colors.GRAY_700,
  },
  multiline: {
    paddingBottom: deviceHeight > 700 ? 45 : 30,
  },
  inputError: {
    borderWidth: 1,
    borderColor: colors.RED_300,
  },
  errorText: {
    color: colors.RED_500,
    fontSize: 12,
  },
});

export default InputField;
