import { colors } from '@/constants';
import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import DatePicker from 'react-native-date-picker';

interface DatePickerOptionProps {
  isVisible: boolean;
  date: Date;
  onChangeDate: (date: Date) => void;
  onConfirmDate: (date: Date) => void;
  onCancelDate: () => void;
}
const DatePickerOption = ({
  isVisible,
  date,
  onChangeDate,
  onConfirmDate,
  onCancelDate,
}: DatePickerOptionProps) => {
  return (
    // <Modal visible={isVisible} transparent animationType="slide">
    <SafeAreaView style={styles.optionBackground}>
      <View style={styles.optionContainer}>
        <DatePicker
          modal
          open={isVisible}
          mode="date"
          date={date}
          confirmText="확인"
          onDateChange={onChangeDate}
          onConfirm={onConfirmDate}
          onCancel={onCancelDate}
          locale="ko"
        />
      </View>
    </SafeAreaView>
    // </Modal>
  );
};

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
    overflow: 'hidden',
  },
});

export default DatePickerOption;
