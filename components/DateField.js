import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DateField = ({ id, label, value, onChange }) => {
  const [selectedDate, setSelectedDate] = useState(value ? new Date(value) : new Date());

  const handleChange = (date) => {
    setSelectedDate(date);
    onChange(id, date.toISOString().split('T')[0]);  // Save the date in YYYY-MM-DD format
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <DatePicker
        selected={selectedDate}
        onChange={handleChange}
        dateFormat="yyyy-MM-dd"
        className="react-datepicker"
        wrapperClassName="date-picker-wrapper"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '500',
  },
});

export default DateField;
