import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Text, Button, Alert } from 'react-native';
import TextField from './TextField';
import DateField from './DateField';
import RadioField from './RadioField';
import DrawingField from './DrawingField';

const FormRenderer = ({ fields }) => {
  const [formValues, setFormValues] = useState({});

  const handleFieldChange = (id, value) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
  };

  const handleSubmit = () => {
    Alert.alert('Form Data', JSON.stringify(formValues, null, 2));
    console.log('Form Submitted:', formValues);
  };

  if (!fields || fields.length === 0) {
    return (
      <View style={styles.errorContainer}>
        <Text>No fields to display</Text>
      </View>
    );
  }

  const renderField = (field) => {
    const { type, id, label, options } = field;

    switch (type) {
      case 'text':
        return <TextField key={id} id={id} label={label} onChange={handleFieldChange} />;
      case 'date':
        return <DateField key={id} id={id} label={label} onChange={handleFieldChange} />;
      case 'radio':
        return <RadioField key={id} id={id} label={label} options={options} onChange={handleFieldChange} />;
      case 'drawing':
        return <DrawingField key={id} id={id} label={label} onChange={handleFieldChange} />;
      default:
        return null;
    }
  };

  return (
    <ScrollView>
      {fields.map(renderField)}
      <Button title="Submit" onPress={handleSubmit} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  errorContainer: {
    padding: 20,
    alignItems: 'center',
  },
});

export default FormRenderer;
