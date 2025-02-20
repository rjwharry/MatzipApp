import { colors } from '@/constants';
import React, { createContext, PropsWithChildren, ReactNode, useContext } from 'react';
import {
  GestureResponderEvent,
  Modal,
  ModalProps,
  Pressable,
  PressableProps,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

interface OptionContextValue {
  onClickOutside: (event: GestureResponderEvent) => void;
}

const OptionContext = createContext<OptionContextValue | undefined>(undefined);

interface OptionMainProps {
  children: ReactNode;
  isVisible: boolean;
  hideOption: () => void;
  animationType?: ModalProps['animationType'];
}

const OptionMain = ({
  children,
  isVisible,
  hideOption,
  animationType = 'slide',
}: OptionMainProps) => {
  const onClickOutside = (event: GestureResponderEvent) => {
    if (event.target == event.currentTarget) {
      hideOption();
    }
  };

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType={animationType}
      onRequestClose={hideOption}
    >
      <OptionContext.Provider value={{ onClickOutside }}>{children}</OptionContext.Provider>
    </Modal>
  );
};

const Background = ({ children }: PropsWithChildren) => {
  const optionContext = useContext(OptionContext);
  return (
    <SafeAreaView style={styles.optionBackground} onTouchEnd={optionContext?.onClickOutside}>
      {children}
    </SafeAreaView>
  );
};

const Container = ({ children }: PropsWithChildren) => {
  return <View style={styles.optionContainer}>{children}</View>;
};

interface ButtonProps extends PressableProps {
  children: ReactNode;
  isDanger?: boolean;
}

const Button = ({ children, isDanger = false, ...props }: ButtonProps) => {
  return (
    <Pressable
      style={({ pressed }) => [pressed && styles.optionButtonPressed, styles.optionButton]}
      {...props}
    >
      <Text style={[styles.optionText, isDanger && styles.dangerText]}>{children}</Text>
    </Pressable>
  );
};

const Title = ({ children }: PropsWithChildren) => {
  return (
    <View style={styles.titleContainer}>
      <Text style={styles.titleText}>{children}</Text>
    </View>
  );
};

const Divider = () => {
  return <View style={styles.border} />;
};

export const CompoundOption = Object.assign(OptionMain, {
  Background,
  Container,
  Button,
  Title,
  Divider,
});

const styles = StyleSheet.create({
  optionBackground: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0 0 0 / 0.5)',
  },
  optionContainer: {
    borderRadius: 15,
    marginHorizontal: 10,
    marginBottom: 10,
    backgroundColor: colors.GRAY_100,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    gap: 5,
    borderRadius: 15,
  },
  optionButtonPressed: {
    backgroundColor: colors.GRAY_200,
  },
  optionText: {
    fontSize: 17,
    color: colors.BLUE_500,
    fontWeight: '500',
  },
  dangerText: {
    color: colors.RED_500,
  },
  titleContainer: {
    alignItems: 'center',
    padding: 15,
  },
  titleText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.BLACK,
  },
  border: {
    borderBottomColor: colors.GRAY_200,
    borderBottomWidth: 1,
  },
});
