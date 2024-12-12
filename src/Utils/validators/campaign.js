// import validator from "validator";

// // Campaign Validators
// /**
//  * A collection of validation functions for campaigns.
//  *
//  * @namespace campaignValidators
//  *
//  * @property {Object} global - Global validation functions.
//  * @property {Function} global.isValidAllFields - Checks if all fields in the input object are valid.
//  * @property {Function} global.isBeforeOrEqual - Checks if the start date is before or equal to the end date.
//  * @property {Function} global.isISO8601Date - Checks if a date is in ISO 8601 format.
//  * @property {Function} global.isLengthValid - Checks if a string's length is within a specified range.
//  *
//  * @property {Object} details - Validation functions for campaign details.
//  * @property {Function} details.name - Validates the campaign name.
//  * @property {Function} details.description - Validates the campaign description.
//  * @property {Function} details.date - Validates a date.
//  * @property {Function} details.dates - Validates a date range.
//  *
//  * @property {Object} colMapping - Validation functions for column mapping.
//  * @property {Function} colMapping.collectionName - Validates the collection name.
//  * @property {Function} colMapping.propertyName - Validates the property name.
//  *
//  * @property {Object} variables - Validation functions for variables.
//  * @property {Function} variables.name - Validates the variable name.
//  * @property {Function} variables.description - Validates the variable description.
//  * @property {Function} variables.type - Validates the variable type.
//  * @property {Function} variables.defaultValue - Validates the default value of a variable.
//  *
//  * @property {Object} auth - Validation functions for authentication.
//  * @property {Function} auth.email - Validates the email address.
//  * @property {Function} auth.password - Validates the password.
//  * @property {Function} auth.name - Validates the name.
//  *
//  */
// export const campaignValidators = {
//   global: {
//     /**
//      * Function to check if it's string or number and it's not empty
//      */
//     isNotEmpty: (value) => {
//       if (value === null || value === undefined || value === "") {
//         return {
//           success: false,
//           message: "Value cannot be empty.",
//         };
//       }
//       return { success: true, message: "" };
//     },

//     /**
//      * Checks if all fields in the input object are valid and updates their validation state.
//      *
//      * @param {Object.<string, {isValid: boolean, error: string}>} inputs - The input object with fields to be validated.
//      * @returns {{success: boolean, errors: Array<{field: string, error: string}>, updatedData: Object}} - An object containing a success flag, a list of errors for invalid fields, and updated field data with validation states.
//      *                  success is true if all fields are valid, false otherwise.
//      *                  errors is an array of objects with field names and error messages for invalid fields.
//      *                  updatedData contains the updated validation states for all fields, showing errors where applicable.
//      */
//     isValidAllFields: (inputs) => {
//       const errors = [];
//       let isFormValid = true;
//       let updatedData = {};

//       // Iterate over each field in the inputs object
//       for (const key in inputs) {
//         if (Object.prototype.hasOwnProperty.call(inputs, key)) {
//           const field = inputs[key];

//           // Update the validation state
//           if (!field.isValid) {
//             // errors[key] = field.error;
//             errors.push({ field: key, error: field.error }); // Collect error message for invalid field
//             isFormValid = false; // If any field is invalid, form is not valid
//             updatedData[key] = {
//               ...field,
//               isValid: false, // Set field as invalid
//               isShowError: true, // Show error message
//               error: field.error, // Set error message
//             };
//           }
//         }
//       }

//       // Combine the validation udated fields
//       updatedData = { ...inputs, ...updatedData };

//       return {
//         success: isFormValid,
//         errors, // Return all errors
//         /** Updated validations fields which contains the error messages and enable isShowError to true, so the respective fields can show the error messages */
//         updatedData,
//       };

//       // return Object.values(inputs).every((field) => field.isValid);
//     },
//     /**
//      * Checks if the start date is before or equal to the end date.
//      *
//      * @param {string} startDate - The start date to compare.
//      * @param {string} endDate - The end date to compare.
//      * @returns {Object} An object with a success flag and an error message.
//      *                  If the start date is after the end date, the success flag is false
//      *                  and the error message is "Start date must be before or equal to end date.".
//      *                  If the start date is before or equal to the end date, the success flag is true
//      *                  and the error message is an empty string.
//      */
//     isBeforeOrEqual: (startDate, endDate) => {
//       if (validator.isAfter(startDate, endDate)) {
//         return {
//           success: false,
//           message: "Start date must be before or equal to end date.",
//         };
//       }
//       return { success: true, message: "" };
//     },
//     /**
//      * Checks if the date is in ISO 8601 format (YYYY-MM-DD).
//      * @param {string} date - The date to validate.
//      * @returns {{success: boolean, message: string}} An object with a success flag and an error message.
//      *                  If the date is not in ISO 8601 format, the success flag is false
//      *                  and the error message is "Date must be in ISO 8601 format (YYYY-MM-DD)."
//      *                  If the date is in ISO 8601 format, the success flag is true
//      *                  and the error message is an empty string.
//      */
//     isISO8601Date: (date) => {
//       if (!validator.isISO8601(date)) {
//         return {
//           success: false,
//           message: "Date must be in ISO 8601 format (YYYY-MM-DD).",
//         };
//       }
//       return { success: true, message: "" };
//     },
//     /**
//      * Checks if a given string is between a min and max length (inclusive).
//      * @param {string} key - The key of the field to validate.
//      * @param {string} str - The string to validate.
//      * @param {number} min - The minimum length.
//      * @param {number} max - The maximum length.
//      * @returns {Object} An object with a success boolean and a message string.
//      *                  success is true if the string is valid, false otherwise.
//      *                  message contains an error message if the string is invalid.
//      */
//     isLengthValid: (key, str, min, max) => {
//       if (!validator.isLength(str, { min, max })) {
//         return {
//           success: false,
//           message: `${key} must be between ${min} and ${max} characters.`,
//         };
//       }
//       return { success: true, message: "" };
//     },
//     /**
//      * Validates that a given value does not contain any spaces.
//      *
//      * @param {string} label - The label for the value being validated.
//      * @param {string} value - The value to check for spaces.
//      * @returns {{success: boolean, message: string}} An object with a success flag and a message.
//      *                  success is true if the value does not contain spaces, false otherwise.
//      *                  message contains an error message if the value contains spaces.
//      */
//     noSpaces: (label, value) => {
//       // Check if the value contains spaces
//       if (/\s/.test(value)) {
//         return {
//           success: false,
//           message: `${label} must not contain spaces.`,
//         };
//       }
//       return { success: true, message: "" };
//     },
//     /**
//      * Always returns a valid response, regardless of the input.
//      * This is useful for cases where you want to ignore a validation.
//      * @param {function} validate - The validation function to ignore.
//      * @returns {{success: boolean, message: string}} An object with a success flag and a message.
//      *                  success is true if the value is valid, false otherwise.
//      *                  message contains an error message if the value is invalid.
//      */
//     alwaysValid: (validate) => {
//       return { success: true, message: "" };
//     },
//   },

//   details: {
//     /**
//      * Validates the name of the campaign.
//      * This will be the name of the campaign that the user will input for creating campaign.
//      * @param {string} name - The name of the campaign.
//      * @returns {Object} An object with a success flag and a message.
//      *                  success is true if the name is valid, false otherwise.
//      */
//     name: (name) =>
//       campaignValidators.global.isLengthValid("Name", name, 5, 100),
//     /**
//      * Validates the description of the campaign.
//      * This will be the description of the campaign that the user will input for creating campaign.
//      * @param {string} description - The description of the campaign.
//      * @returns {{success: boolean,message: string}} An object with a success flag and a message.
//      *                  success is true if the description is valid, false otherwise.
//      */
//     description: (description) =>
//       campaignValidators.global.isLengthValid(
//         "Description",
//         description,
//         0,
//         500
//       ),
//     /**
//      * Validates the date of the campaign.
//      * This will be the date of the campaign that the user will input for creating campaign.
//      * @param {string} date - The date of the campaign.
//      * @returns {{success: boolean, message: string}} An object with a success flag and a message.
//      *                  success is true if the date is valid, false otherwise.
//      */
//     date: (date) => campaignValidators.global.isISO8601Date(date),
//     /**
//      * Validate both start and end dates of a campaign.
//      *
//      * @function
//      * @param {string} startDate - The start date of the campaign.
//      * @param {string} endDate - The end date of the campaign.
//      * @returns {{success: boolean, message: string}} - Validation result.
//      */
//     dates: (startDate, endDate) => {
//       const startValidation =
//         campaignValidators.global.isISO8601Date(startDate);
//       if (!startValidation.success) return startValidation;

//       const endValidation = campaignValidators.global.isISO8601Date(endDate);
//       if (!endValidation.success) return endValidation;

//       return campaignValidators.global.isBeforeOrEqual(startDate, endDate);
//     },
//   },

//   colMapping: {
//     /**
//      * Validates the collection name.
//      *
//      * @param {string} collectionName - The collection name to validate.
//      * @returns {{success: boolean, message: string}} - The result of the validation.
//      */
//     collectionName: (collectionName) => {
//       let isValidLength = campaignValidators.global.isLengthValid(
//         "Collection name",
//         collectionName,
//         1,
//         50
//       );
//       if (isValidLength.success === false) return isValidLength;
//       let isValidNoSpaces = campaignValidators.global.noSpaces(
//         "Collection name",
//         collectionName
//       );
//       if (isValidNoSpaces.success === false) return isValidNoSpaces;
//       return { success: true, message: "" };
//     },

//     /**
//      * Validates the property name.
//      *
//      * @param {string} propertyName - The property name to validate.
//      * @returns {object} An object with a success flag and an error message.
//      */
//     propertyName: (propertyName) =>
//       campaignValidators.global.isLengthValid(
//         "Property Name",
//         propertyName,
//         1,
//         100
//       ),
//   },

//   variables: {
//     /**
//      * Validates the name of the variable entered by the user.
//      * This will be the name of the variable that the user will input for creating variable.
//      * @param {string} name - The name of the variable.
//      * @returns {Object} An object with a success flag and a message.
//      *                  success is true if the name is valid, false otherwise.
//      */
//     name: (name) =>
//       campaignValidators.global.isLengthValid("Name", name, 1, 100),
//     /**
//      * Validates the description of the variable entered by the user.
//      * This will be the description of the variable that the user will input for creating variable.
//      * @param {string} description - The description of the variable.
//      * @returns {{success: boolean,message: string}} An object with a success flag and a message.
//      *                  success is true if the description is valid, false otherwise.
//      */
//     description: (description) =>
//       campaignValidators.global.isLengthValid(
//         "Description",
//         description,
//         1,
//         250
//       ),

//     /**
//      * Validates the type selected by the user for variable.
//      * Based on this, the user can select the further default value.
//      * @param {string} type - The type selected by the user.
//      * @returns {Object} An object with a success flag and a message.
//      *                  success is true if the type is valid, false otherwise.
//      *                  message is an empty string if success is true, an error message otherwise.
//      */
//     type: (type) => {
//       const validTypes = [
//         "integer",
//         "amount",
//         "float",
//         "string",
//         "boolean",
//         "date",
//       ];
//       if (!validTypes.includes(type)) {
//         return {
//           success: false,
//           message: `Invalid type. Allowed types: ${validTypes.join(", ")}`,
//         };
//       }
//       return { success: true, message: "" };
//     },
//     /**
//      * Validates a default value based on its type.
//      * @param {any} defaultValue - The default value to be validated.
//      * @param {string} type - The type of the default value.
//      * @returns {Object} An object with a success flag and a message.
//      *                  success is true if the default value is valid, false otherwise.
//      *                  message is an empty string if success is true, an error message otherwise.
//      */
//     defaultValue: (defaultValue, type) => {
//       return { success: true, message: null };
//     },
//   },
//   entities: {
//     /**
//      * Validates the name of the rule entered by the user.
//      * This will be the name of the rule that the user will input for creating rule.
//      * @param {string} value - The name of the rule.
//      * @returns {{success: boolean, message: string}} An object with a success flag and a message.
//      *                  success is true if the name is valid, false otherwise.
//      *                  message is an empty string if success is true, an error message otherwise.
//      */
//     ruleName: (value) => {
//       let isValidLength = campaignValidators.global.isLengthValid(
//         "Rule Name",
//         value,
//         3,
//         100
//       );
//       if (isValidLength.success === false) return isValidLength;

//       return { success: true, message: "" };
//     },
//     /**
//      * Validates the description of the rule entered by the user.
//      * This will be the description of the rule that the user will input for creating rule.
//      * @param {string} value - The description of the rule.
//      * @returns {{success: boolean, message: string}} An object with a success flag and a message.
//      *                  success is true if the description is valid, false otherwise.
//      *                  message is an empty string if success is true, an error message otherwise.
//      */
//     ruleDescription: (value) => {
//       let isValidLength = campaignValidators.global.isLengthValid(
//         "Rule Description",
//         value,
//         0,
//         500
//       );
//       if (isValidLength.success === false) return isValidLength;

//       return { success: true, message: "" };
//     },
//     /**
//      * Validates the parameter of the action in the rule.
//      * This will be the parameter of the action that the user will input for creating rule.
//      * @param {string} value - The parameter of the action.
//      * @returns {{success: boolean, message: string}} An object with a success flag and a message.
//      *                  success is true if the parameter is valid, false otherwise.
//      *                  message is an empty string if success is true, an error message otherwise.
//      */
//     actionParameter: (value) => {
//       let isValidLength = campaignValidators.global.isLengthValid(
//         "Parameter ",
//         value,
//         3,
//         500
//       );
//       if (isValidLength.success === false) return isValidLength;

//       return { success: true, message: "" };
//     },
//   },
// };

// export default campaignValidators;
