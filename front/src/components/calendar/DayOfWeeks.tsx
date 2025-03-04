import { colors } from '@/constants';
import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';

const DayOfWeeks = () => {
  return (
    <View style={styles.container}>
      {['일', '월', '화', '수', '목', '금', '토'].map((day, i) => (
        <View key={i} style={styles.item}>
          <Text
            style={[
              styles.text,
              day === '토' && styles.saturdayStyle,
              day === '일' && styles.sundayStyle,
            ]}
          >
            {day}
          </Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  item: {
    width: Dimensions.get('screen').width / 7,
    alignItems: 'center',
  },
  text: {
    fontSize: 15,
    color: colors.BLACK,
  },
  saturdayStyle: {
    color: colors.BLUE_500,
  },
  sundayStyle: {
    color: colors.PINK_500,
  },
});

export default DayOfWeeks;
