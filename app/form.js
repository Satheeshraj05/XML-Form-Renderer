import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ActivityIndicator,
  Alert,
  ScrollView,
  Button
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import FormRenderer from '../components/FormRenderer';
import { parseXML, validateFormXML } from '../utils/xmlParser';
import { extractFormFields } from '../utils/formGenerator';

export default function FormScreen() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const { xmlContent, source, fileName } = params;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formFields, setFormFields] = useState([]);
  const [formData, setFormData] = useState({}); // To store form data

  useEffect(() => {
    const processXML = async () => {
      try {
        setLoading(true);

        if (!xmlContent) {
          throw new Error('No XML content provided');
        }

        // Decode the XML content
        const decodedXML = decodeURIComponent(xmlContent);

        // Parse the XML content
        const parsedXML = await parseXML(decodedXML);

        // Validate the XML structure
        if (!validateFormXML(parsedXML)) {
          throw new Error('Invalid XML format for form rendering');
        }

        // Extract form fields
        const fields = extractFormFields(parsedXML);
        setFormFields(fields);
      } catch (err) {
        console.error('Error processing XML:', err);
        setError(err.message);
        Alert.alert(
          'Error',
          `Failed to process XML: ${err.message}`,
          [{ text: 'OK', onPress: () => router.back() }]
        );
      } finally {
        setLoading(false);
      }
    };

    processXML();
  }, [xmlContent, source, fileName, router]);

  // Handle form submission and display entered data
  const handleFormSubmit = () => {
    console.log('Form Data:', formData);
    Alert.alert('Form Submitted', JSON.stringify(formData, null, 2));
  };

  const handleFieldChange = (id, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [id]: value
    }));
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#2196F3" />
        <Text style={styles.loadingText}>Loading Form...</Text>
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
    <ScrollView style={styles.container}>
      <View style={styles.formContainer}>
        <FormRenderer fields={formFields} onChange={handleFieldChange} />
        <Button title="Submit Form" onPress={handleFormSubmit} />
      </View>
    </ScrollView>
  );
}

// ✅ Fixing the missing `styles` object
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  formContainer: {
    padding: 16,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
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

