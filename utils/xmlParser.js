import { parseString } from 'react-native-xml2js';

/**
 * Parse XML string to JavaScript object
 * @param {string} xmlString - XML string to parse
 * @returns {Promise} - Promise that resolves to parsed XML object
 */
export const parseXML = (xmlString) => {
  return new Promise((resolve, reject) => {
    parseString(xmlString, { explicitArray: false }, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

/**
 * Validate if the XML has the correct structure for form rendering
 * @param {Object} parsedXML - Parsed XML object
 * @returns {boolean} - True if valid, false otherwise
 */
export const validateFormXML = (parsedXML) => {
  try {
    // Check if form element exists
    if (!parsedXML.form) {
      return false;
    }

    // Check if fields exist
    if (!parsedXML.form.field) {
      return false;
    }

    // Convert to array if single field
    const fields = Array.isArray(parsedXML.form.field) 
      ? parsedXML.form.field 
      : [parsedXML.form.field];

    // Check if all fields have required attributes
    for (const field of fields) {
      if (!field.$ || !field.$.type || !field.$.id || !field.$.label) {
        return false;
      }

      // Check if field type is supported
      const supportedTypes = ['text', 'date', 'radio', 'drawing'];
      if (!supportedTypes.includes(field.$.type)) {
        return false;
      }

      // Check if radio field has options
      if (field.$.type === 'radio' && (!field.option || field.option.length === 0)) {
        return false;
      }
    }

    return true;
  } catch (error) {
    console.error('XML validation error:', error);
    return false;
  }
};