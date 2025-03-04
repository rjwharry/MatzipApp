import Calendar from '@/components/calendar/Calendar';
import { colors } from '@/constants';
import { getMonthYearDetails, getNewMonthYear } from '@/utils';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const CalendarHomeScreen: React.FC = () => {
  const currentMonthYear = getMonthYearDetails(new Date());
  const [monthYear, setMonthYear] = useState(currentMonthYear);
  const [selectedDate, setSelectedDate] = useState(0);

  const handlePressDate = (date: number) => {
    setSelectedDate(date);
  };

  const handleUpdatedMonth = (increment: number) => {
    setMonthYear((prev) => getNewMonthYear(prev, increment));
  };
  return (
    <SafeAreaView style={styles.container}>
      <Calendar
        monthYear={monthYear}
        onChangeMonth={handleUpdatedMonth}
        onPressDate={handlePressDate}
        selectedDate={selectedDate}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
});

export default CalendarHomeScreen;
