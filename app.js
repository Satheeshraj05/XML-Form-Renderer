import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as FileSystem from 'expo-file-system';

import HomeScreen from './screens/HomeScreen';
import XMLInputScreen from './screens/XMLInputScreen';
import FormScreen from './screens/FormScreen';

const Stack = createStackNavigator();

export default function App() {
  // Copy sample XML to document directory on app start
  useEffect(() => {
    const copySampleXML = async () => {
      try {
        const assetDir = FileSystem.documentDirectory + 'assets';
        
        // Create assets directory if it doesn't exist
        const dirInfo = await FileSystem.getInfoAsync(assetDir);
        if (!dirInfo.exists) {
          await FileSystem.makeDirectoryAsync(assetDir, { intermediates: true });
        }
        
        // Sample XML content
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
        
        // Write sample XML to file
        await FileSystem.writeAsStringAsync(
          assetDir + '/sample.xml',
          sampleXML
        );
      } catch (error) {
        console.error('Error copying sample XML:', error);
      }
    };
    
    copySampleXML();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#2196F3',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'XML Form Renderer' }}
        />
        <Stack.Screen 
          name="XMLInput" 
          component={XMLInputScreen} 
          options={{ title: 'Enter XML' }}
        />
        <Stack.Screen 
          name="Form" 
          component={FormScreen} 
          options={{ title: 'Rendered Form' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}