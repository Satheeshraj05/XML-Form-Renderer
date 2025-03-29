import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Text, View, Platform, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import * as DocumentPicker from 'expo-document-picker';

const sampleXML = `<?xml version="1.0" encoding="UTF-8"?>
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

export default function HomeScreen() {
  const router = useRouter();
  const [isWeb] = useState(Platform.OS === 'web');
  const handleRenderFromFile = async () => {
    try {
      if (isWeb) {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.xml';
  
        input.onchange = (e: Event) => {
          const target = e.target as HTMLInputElement;
          if (!target.files || target.files.length === 0) return;
  
          const file = target.files[0];
          const reader = new FileReader();
  
          reader.onload = (event) => {
            const result = event.target?.result;
            if (typeof result !== 'string') {
              console.error('Invalid file content:', result);
              alert('Error reading XML file.');
              return;
            }
  
            router.push({
              pathname: '/form',
              params: {
                xmlContent: encodeURIComponent(result),
                source: 'file',
                fileName: file.name,
              },
            });
          };
  
          reader.readAsText(file);
        };
  
        input.click();
      }
    } catch (error) {
      console.error('Error picking or reading file:', error);
      alert('Error reading XML file.');
    }
  };
  

  const handleUseSampleXML = () => {
    router.push({
      pathname: '/form',
      params: {
        xmlContent: encodeURIComponent(sampleXML),
        source: 'sample',
        fileName: 'sample.xml',
      },
    });
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
        onPress={handleUseSampleXML}
      >
        <Text style={styles.buttonText}>Use Sample XML</Text>
      </TouchableOpacity>
    </View>
  );
}

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
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
});
