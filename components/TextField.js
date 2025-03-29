import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const TextField = ({ id, label, value, onChange }) => {
  const [text, setText] = useState(value || '');

  const handleChange = (newText) => {
    setText(newText);
    if (onChange) {
      onChange(id, newText);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={handleChange}
        placeholder={label}
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
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    fontSize: 16,
  },
});

export default TextField;