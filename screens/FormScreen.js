import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ActivityIndicator,
  Alert,
} from 'react-native';
import FormRenderer from '../components/FormRenderer';
import { parseXML, validateFormXML } from '../utils/xmlParser';
import { extractFormFields } from '../utils/formGenerator';

const FormScreen = ({ route, navigation }) => {
  const { xmlContent, source, fileName } = route.params;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formFields, setFormFields] = useState([]);

  useEffect(() => {
    const processXML = async () => {
      try {
        setLoading(true);
        
        // Parse the XML content
        const parsedXML = await parseXML(xmlContent);
        
        // Validate the XML structure
        if (!validateFormXML(parsedXML)) {
          throw new Error('Invalid XML format for form rendering');
        }
        
        // Extract form fields
        const fields = extractFormFields(parsedXML);
        setFormFields(fields);
        
        // Set screen title based on source
        if (fileName) {
          navigation.setOptions({ title: fileName });
        } else {
          navigation.setOptions({ 
            title: source === 'input' ? 'XML Input Form' : 'XML Form' 
          });
        }
      } catch (err) {
        console.error('Error processing XML:', err);
        setError(err.message);
        Alert.alert(
          'Error',
          `Failed to process XML: ${err.message}`,
          [{ text: 'OK', onPress: () => navigation.goBack() }]
        );
      } finally {
        setLoading(false);
      }
    };

    processXML();
  }, [xmlContent, source, fileName, navigation]);

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#2196F3" />
        <Text style={styles.loadingText}>Processing XML...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FormRenderer fields={formFields} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#555',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
  },
});

export default FormScreen;