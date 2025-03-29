import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const RadioField = ({ id, label, options, value, onChange }) => {
  const [selectedValue, setSelectedValue] = useState(value || null);

  const handleSelect = (optionValue) => {
    setSelectedValue(optionValue);
    if (onChange) {
      onChange(id, optionValue);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      
      {options && options.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={styles.optionContainer}
          onPress={() => handleSelect(option.value)}
        >
          <View style={styles.radioOuter}>
            {selectedValue === option.value && <View style={styles.radioInner} />}
          </View>
          <Text style={styles.optionLabel}>{option.label}</Text>
        </TouchableOpacity>
      ))}
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
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  radioOuter: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  radioInner: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: '#000',
  },
  optionLabel: {
    fontSize: 16,
  },
});

export default RadioField;