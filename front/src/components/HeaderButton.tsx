import { colors } from '@/constants';
import React, { ReactNode } from 'react';
import { Pressable, PressableProps, StyleSheet } from 'react-native';
import { Text } from 'react-native-gesture-handler';

interface HeaderButtonProps extends PressableProps {
  labelText?: string;
  icon?: ReactNode;
  hasError?: boolean;
}

// Screen Header에 버튼을 생성할 때 사용하는 공통 컴포넌트
const HeaderButton = ({ labelText, icon, hasError = false, ...props }: HeaderButtonProps) => {
  return (
    <Pressable disabled={hasError} style={styles.container} {...props}>
      {!labelText && icon}
      {!icon && labelText && (
        <Text style={[styles.text, hasError && styles.textError]}>{labelText}</Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  text: {
    fontSize: 15,
    fontWeight: '500',
    color: colors.PINK_500,
  },
  textError: {
    color: colors.GRAY_200,
  },
});

export default HeaderButton;
