import React from 'react';
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
  );
};

export default DatePickerOption;
