/**
 * Extract form fields from parsed XML
 * @param {Object} parsedXML - Parsed XML object
 * @returns {Array} - Array of field objects
 */
export const extractFormFields = (parsedXML) => {
  try {
    if (!parsedXML.form || !parsedXML.form.field) {
      return [];
    }

    // Convert to array if single field
    const fields = Array.isArray(parsedXML.form.field) 
      ? parsedXML.form.field 
      : [parsedXML.form.field];

    return fields.map(field => {
      const baseField = {
        type: field.$.type,
        id: field.$.id,
        label: field.$.label,
      };

      // Add options for radio fields
      if (field.$.type === 'radio' && field.option) {
        const options = Array.isArray(field.option) 
          ? field.option 
          : [field.option];
        
        baseField.options = options.map(option => ({
          value: option.$.value,
          label: option._,
        }));
      }

      return baseField;
    });
  } catch (error) {
    console.error('Error extracting form fields:', error);
    return [];
  }
};