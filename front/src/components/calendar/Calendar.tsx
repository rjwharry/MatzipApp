import { colors } from '@/constants';
import { isSameAsCurrentDate, MonthYear } from '@/utils';
import Iconicons from '@react-native-vector-icons/ionicons';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import React from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import DateBox from './DateBox';
import DayOfWeeks from './DayOfWeeks';

interface CalendarProps {
  monthYear: MonthYear;
  selectedDate: number;
  onPressDate: (date: number) => void;
  onChangeMonth: (increment: number) => void;
}
const Calendar = ({ monthYear, selectedDate, onPressDate, onChangeMonth }: CalendarProps) => {
  const { month, year, lastDate, firstDayOfWeek } = monthYear;
  return (
    <>
      <View style={styles.headerContainer}>
        <Pressable style={styles.monthButtonContainer} onPress={() => onChangeMonth(-1)}>
          <Iconicons name="arrow-back" size={25} color={colors.BLACK} />
        </Pressable>
        <Pressable style={styles.monthYearContainer}>
          <Text style={styles.titleText}>
            {year}년 {month}월
          </Text>
          <MaterialIcons name="keyboard-arrow-down" size={20} color={colors.GRAY_500} />
        </Pressable>
        <Pressable style={styles.monthButtonContainer} onPress={() => onChangeMonth(1)}>
          <Iconicons name="arrow-forward" size={25} color={colors.BLACK} />
        </Pressable>
      </View>
      <DayOfWeeks />
      <View style={styles.bodyContainer}>
        <FlatList
          data={Array.from({ length: lastDate + firstDayOfWeek }, (_, i) => ({
            id: i,
            date: i - firstDayOfWeek + 1,
          }))}
          renderItem={({ item }) => (
            <DateBox
              date={item.date}
              selectedDate={selectedDate}
              onPressDate={onPressDate}
              isToday={isSameAsCurrentDate(year, month, item.date)}
            />
          )}
          keyExtractor={(item) => String(item.id)}
          numColumns={7}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 25,
    marginVertical: 15,
  },
  monthYearContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  monthButtonContainer: {
    padding: 10,
  },
  titleText: {
    fontSize: 18,
    fontWeight: '500',
    color: colors.BLACK,
  },
  bodyContainer: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.GRAY_300,
    backgroundColor: colors.GRAY_100,
  },
});

export default Calendar;
