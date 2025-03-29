import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';

const HomeScreen = ({ navigation }) => {
  const handleRenderFromFile = async () => {
    try {
      // Pick an XML file
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/xml',
        copyToCacheDirectory: true,
      });
      
      if (result.canceled) {
        return;
      }
      
      // Read the file content
      const fileUri = result.assets[0].uri;
      const xmlContent = await FileSystem.readAsStringAsync(fileUri);
      
      // Navigate to form screen with the XML content
      navigation.navigate('Form', { 
        xmlContent,
        source: 'file',
        fileName: result.assets[0].name,
      });
    } catch (error) {
      console.error('Error picking or reading file:', error);
      alert('Error reading XML file. Please try again.');
    }
  };

  const handleRenderFromInput = () => {
    // Navigate to form screen with input option
    navigation.navigate('XMLInput');
  };

  const handleRenderFromSample = async () => {
    try {
      // Read the sample XML file
      const xmlContent = await FileSystem.readAsStringAsync(
        FileSystem.documentDirectory + 'assets/sample.xml'
      );
      
      // Navigate to form screen with the sample XML content
      navigation.navigate('Form', { 
        xmlContent,
        source: 'sample',
        fileName: 'sample.xml',
      });
    } catch (error) {
      console.error('Error reading sample file:', error);
      alert('Error reading sample XML file. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>XML Form Renderer</Text>
      <Text style={styles.description}>
        This app renders forms based on XML input. Choose one of the options below:
      </Text>
      
      <TouchableOpacity 
        style={styles.button}
        onPress={handleRenderFromFile}
      >
        <Text style={styles.buttonText}>Render Form from XML File</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.button}
        onPress={handleRenderFromInput}
      >
        <Text style={styles.buttonText}>Render Form from XML Input</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[styles.button, styles.sampleButton]}
        onPress={handleRenderFromSample}
      >
        <Text style={styles.buttonText}>Use Sample XML</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    marginBottom: 32,
    textAlign: 'center',
    color: '#555',
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    alignItems: 'center',
  },
  sampleButton: {
    backgroundColor: '#4CAF50',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default HomeScreen;