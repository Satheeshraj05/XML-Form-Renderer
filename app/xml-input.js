import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';

export default function XMLInputScreen() {
  const [xmlInput, setXmlInput] = useState('');
  const router = useRouter();

  const handleRenderForm = () => {
    if (!xmlInput.trim()) {
      Alert.alert('Error', 'Please enter XML content');
      return;
    }

    // Navigate to form screen with the XML input
    router.push({
      pathname: '/form',
      params: { 
        xmlContent: encodeURIComponent(xmlInput),
        source: 'input',
      }
    });
  };

  const handlePasteExample = () => {
    const exampleXML = `<?xml version="1.0" encoding="UTF-8"?>
<form>
  <field type="text" id="customerName" label="Customer Name" />
  <field type="text" id="forename" label="Forename" />
  <field type="date" id="date" label="Date" />
  <field type="radio" id="stage" label="Stage">
    <option value="1">Stage - 1</option>
    <option value="2">Stage - 2</option>
    <option value="3">Stage - 3</option>
  </field>
  <field type="drawing" id="signature" label="Signature" />
</form>`;
    
    setXmlInput(exampleXML);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter XML Content</Text>
      
      <ScrollView style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          multiline
          numberOfLines={10}
          value={xmlInput}
          onChangeText={setXmlInput}
          placeholder="Paste your XML here..."
        />
      </ScrollView>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.exampleButton}
          onPress={handlePasteExample}
        >
          <Text style={styles.exampleButtonText}>Paste Example</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.renderButton}
          onPress={handleRenderForm}
        >
          <Text style={styles.renderButtonText}>Render Form</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  inputContainer: {
    flex: 1,
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  input: {
    padding: 12,
    fontSize: 16,
    textAlignVertical: 'top',
    minHeight: 300,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  exampleButton: {
    backgroundColor: '#9E9E9E',
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginRight: 8,
    alignItems: 'center',
  },
  exampleButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  renderButton: {
    backgroundColor: '#2196F3',
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginLeft: 8,
    alignItems: 'center',
  },
  renderButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
});