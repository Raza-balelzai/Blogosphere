// import bcrypt from "bcryptjs";
// import dayjs from "dayjs";

/**
 * @typedef {import("../../../jsDocs/components/dashboard").InputField} Inputs
 */
export const Helpers = {
  /**
 * defaultValues:
 * This function takes an array of keys as input and returns an object with the same keys and default values.
 * @param {string[]} keys - An array of strings representing the keys of the object.
 * @param {{[key: string]: string}} values - An object containing the default values for the keys.
 * @param {string[]} optionalKeys - An array of strings representing the keys that are optional.
 * @returns {{[key: string]: FormField}} An object where each key maps to a FormField object
 * 
 * @typedef {Object} FormField
 * @property {string} value - The current value of the field
 *    - For text fields: the text content
 *    - For date fields: the selected date
 *    - Empty string ('') if no value is provided
 * 
 * @property {boolean} isValid - The validation state of the field
 *    - true if:
 *      - The field is optional (included in optionalKeys)
 *      - The field has a non-empty value
 *    - false if:
 *      - Required field is empty
 *      - Validation rules are not met
 * 
 * @property {string} error - The error message for the field
 *    - Contains "[fieldName] is required" for required fields
 *    - Empty string if field is valid
 *    - Custom error message based on validation rules
 * 
 * @property {boolean} isShowError - Controls error message visibility
 *    - true: Show the error message to the user
 *    - false: Hide the error message
 *    - Initially set to false and typically updated on blur or submit
 * 
 * @example
 * const fields = defaultValues(
 *   ['name', 'email', 'description'],
 *   { name: 'John' },
 *   ['description']
 * );
 * // Returns:
 * // {
 * //   name: {
 * //     value: 'John',
 * //     isValid: true,
 * //     error: 'name is required',
 * //     isShowError: false
 * //   },
 * //   email: {
 * //     value: '',
 * //     isValid: false,
 * //     error: 'email is required',
 * //     isShowError: false
 * //   },
 * //   description: {
 * //     value: '',
 * //     isValid: true, // true because it's optional
 * //     error: 'description is required',
 * //     isShowError: false
 * //   }
 * // }

   * */
  defaultValues: (keys, values = {}, optionalKeys = []) => {
    /**
     * @type {{[key: string]: Inputs}}
     */
    const returnObj = {};
    keys.forEach((key) => {
      // If value is not provided in values, use an empty string
      const value = values[key] || "";
      // Set isValid to true if the key is present in the validationFlags array
      const isValidFlag =
        optionalKeys.includes(key) || (value !== "" && value !== null);

      returnObj[key] = {
        value: value,
        isValid: isValidFlag,
        error: `${key} is required`,
        isShowError: false,
      };
    });

    return returnObj;
  },
  /**
   * returnObj:
   * This function takes two parameters, success and data, and returns an object with two properties, success and data.
   * The success property is a boolean indicating whether the operation was successful or not.
   * The data property can be any type of data, depending on the context of the function call.
   * @param {boolean} success - A boolean indicating whether the operation was successful or not.
   * @param {any} data - The data to be returned in the object.
   * @returns {{success: boolean, data: any}} - An object with success and data properties.
   */
  returnObj: (success, data) => {
    return {
      success,
      data,
    };
  },
  /**
   * returnValues:
   * This function takes an object of form input values (as returned by defaultValues) and
   * returns a new object with the same keys, but the values are the actual input values.
   * The 'isValid' and 'error' properties of the input object are ignored.
   *
   * @param {{[key: string]: FormField}} inputs - The input object with 'isValid', 'error', 'isShowError' & 'value' properties
   * @returns {{[key: string]: string}} - The output with key and value only
   */
  returnValues: (inputs) => {
    // her i want that remove the isvalidflag an error from the inputs and return the key and the value shoould be the values?
    /**
     * @type {{[key: string]: string}}
     */
    const returnObj = {};
    for (const [key, value] of Object.entries(inputs)) {
      returnObj[key] =
        typeof value.value === "string" ? value.value?.trim() : value.value;
    }
    return returnObj;
  },
  /**
   * returnValues:
   * This function takes an array object of columns and data format
   * returns a new array with the same but formated data by
   *
   * @param {{columns: Array.<Object>, data: Object.<string, string>}} inputs - The input object
   * @returns {Array.<Object.<string, string>>} - The output object
   */
  returnArrayValues: (inputs) => {
    // Loop through the arrays and return the values
    return inputs.map((item) =>
      Object.entries(item.data).reduce((acc, [key, value]) => {
        acc[key] = value; // Store the key-value pairs in the accumulator
        return acc;
      }, {})
    );
  },
  // createCampaignObjectCreator: (state, setType, path) => {},
  /**
   * nameIdGenerator
   *
   * Takes a string and returns a string with all spaces replaced with
   * underscores and all characters converted to uppercase. This is used
   * to generate a unique ID from a given name.
   *
   * @param {string} name - The string to convert.
   * @returns {string} - The converted string.
   */
  nameIdGenerator: (name) => {
    return name.toUpperCase().replace(/\s+/g, "_");
  },
  /**
   * idGenerator
   *
   * Takes a string and converts it based on specified case format and separator.
   * Also handles maximum length constraints and special character removal.
   *
   * @param {string} name - The string to convert
   * @param {"upper"| "lower" | "capitalize" | "camel" | "pascal" | "kebab" | "snake"} [caseFormat='upper'] - The case format to apply:
   *                                        'upper', 'lower', 'capitalize',
   *                                        'camel', 'pascal', 'kebab', 'snake'
   * @param {Object} [options={}] - Additional options
   * @param {string} [options.separator='_'] - Character to replace spaces with
   * @param {number} [options.maxLength=Infinity] - Maximum length of output
   * @param {boolean} [options.removeSpecialChars=true] - Remove special characters
   * @returns {string} - The converted string
   */
  // idGenerator: (name, caseFormat = "upper", options = {}) => {
  //   // Default options
  //   const {
  //     separator = "_",
  //     maxLength = Infinity,
  //     removeSpecialChars = true,
  //   } = options;

  //   if (!name) return "";

  //   // Remove special characters if specified
  //   let processedName = name;
  //   if (removeSpecialChars) {
  //     processedName = processedName.replace(/[^a-zA-Z0-9\s]/g, "");
  //   }

  //   // Replace multiple spaces with single space
  //   processedName = processedName.trim().replace(/\s+/g, " ");

  //   // Apply case formatting
  //   switch (caseFormat.toLowerCase()) {
  //     case "lower":
  //       processedName = processedName.toLowerCase();
  //       break;

  //     case "upper":
  //       processedName = processedName.toUpperCase();
  //       break;

  //     case "capitalize":
  //       processedName = processedName
  //         .toLowerCase()
  //         .split(" ")
  //         .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
  //         .join(" ");
  //       break;

  //     case "camel":
  //       processedName = processedName
  //         .toLowerCase()
  //         .split(" ")
  //         .map((word, index) =>
  //           index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
  //         )
  //         .join("");
  //       return processedName.substring(0, maxLength);

  //     case "pascal":
  //       processedName = processedName
  //         .toLowerCase()
  //         .split(" ")
  //         .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
  //         .join("");
  //       return processedName.substring(0, maxLength);

  //     case "kebab":
  //       processedName = processedName.toLowerCase();
  //       return processedName.replace(/\s+/g, "-").substring(0, maxLength);

  //     case "snake":
  //       processedName = processedName.toLowerCase();
  //       return processedName.replace(/\s+/g, "_").substring(0, maxLength);

  //     default:
  //       processedName = processedName.toUpperCase();
  //   }

  //   // Replace spaces with separator and apply max length
  //   return processedName.replace(/\s+/g, separator).substring(0, maxLength);
  // },
  /**
   * updateInputField
   *
   * Pass the name and the value and create the object of it along with other properties
   * @param {object} inputs - The input object
   * @param {{name: string, value: string, status: {success: boolean, error: string, message: string}}} update - The update object
   * @returns {object} - The updated object
   */
  idGenerator: (name, caseFormat = "upper", options = {}) => {
    // Default options
    const {
      separator = "_",
      maxLength = Infinity,
      removeSpecialChars = true,
    } = options;

    if (!name) return "";

    // Remove special characters if specified
    let processedName = name;
    if (removeSpecialChars) {
      processedName = processedName.replace(/[^a-zA-Z0-9\s]/g, "");
    }

    // Replace multiple spaces with single space
    processedName = processedName.trim().replace(/\s+/g, " ");

    // Apply case formatting
    switch (caseFormat.toLowerCase()) {
      case "lower":
        processedName = processedName.toLowerCase();
        break;

      case "upper":
        processedName = processedName.toUpperCase();
        break;

      // @change  Added return here to prevent the separator replacement at the end
      case "capitalize":
        return processedName
          .toLowerCase()
          .split(" ")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")
          .substring(0, maxLength);

      case "camel":
        processedName = processedName
          .toLowerCase()
          .split(" ")
          .map((word, index) =>
            index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
          )
          .join("");
        return processedName.substring(0, maxLength);

      case "pascal":
        processedName = processedName
          .toLowerCase()
          .split(" ")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join("");
        return processedName.substring(0, maxLength);

      case "kebab":
        processedName = processedName.toLowerCase();
        return processedName.replace(/\s+/g, "-").substring(0, maxLength);

      case "snake":
        processedName = processedName.toLowerCase();
        return processedName.replace(/\s+/g, "_").substring(0, maxLength);

      default:
        processedName = processedName.toUpperCase();
    }

    // Replace spaces with separator and apply max length
    return processedName.replace(/\s+/g, separator).substring(0, maxLength);
  },
  /**
   * updateInputField: This function is used to update the input field in the input object
   * @param {Inputs} inputs - The input object
   * @param {{name: string, value: string, status: {success: boolean, error: string, }}} update - The update object
   * @returns {Inputs} - The updated object
   */
  updateInputField: (
    inputs,
    { name, value, status = { success: true, error: "" } } // Changed default error to empty string
  ) => {
    return {
      ...inputs,
      [name]: {
        value,
        isValid: status.success,
        isShowError: !status.success,
        // Changed to default to empty string instead of null
        error:
          status.error !== undefined
            ? status.error
            : status.message !== undefined
              ? status.message
              : "",
      },
    };
  },
  /**
   * tabStatusColor: This function is used to return the color of the tab based on the status of the tab
   * @param {string} tabName - The name of the tab
   * @param {string[]} option - The option of the tab
   * @returns {string} - The color of the tab
   */
  tabStatusColor: (tabName, option) => {
    switch (tabName) {
      case "collectionMappings":
        return option && option.length > 0 ? "green" : "grey";
      case "persistentVariableDefinitions":
        return option && option.length > 0 ? "green" : "grey";
      case "localVariableDefinitions":
        return option && option.length > 0 ? "green" : "grey";
      case "entities":
        // Assuming there is some data for Entities & Rules section in campaign
        return option && option.length > 0 ? "green" : "grey";
      default:
        return "grey";
    }
  },
  handleAddNewItem: () => { },
  /**
   * The handle is the function that will be called when the user clicks the login button.
   * It takes an object as a parameter, which contains the username and password.
   * The function checks if the username and password are correct.
   * If they are correct, it will log the user in and redirect them to the home page.
   * If they are incorrect, it will display an error message.
   *
   * @param {object} data - The data object
   * @param {string} data.username - The username entered by the user
   * @param {string} data.password - The password entered by the user
   */
  handleLogin: ({ username, password }) => {
    // Hardcoded hashed credentials (replace these with the actual hashed values)

    const hardcodedCredentials = {
      username: "", // '', // Hashed username: ""
      password: "", // Hashed password: ""
    };

    // // Hash the user input for comparison
    // const hashedUsernameInput = bcrypt.hashSync(username, 10); // Hash the input username
    // const hashedPasswordInput = bcrypt.hashSync(password, 10); // Hash the input password

    // console.log(`Username Hash: ${hashedUsernameInput}`);
    // console.log(`Password Hash: ${hashedPasswordInput}`);

    // Compare with hardcoded hashed credentials
    const usernameMatch = bcrypt.compareSync(
      username,
      hardcodedCredentials.username
    );
    const passwordMatch = bcrypt.compareSync(
      password,
      hardcodedCredentials.password
    );

    // console.log(`Username Match: ${usernameMatch}`);
    // console.log(`Password Match: ${passwordMatch}`);
    // return { success: true, data: { isAuthenticated: true, token:"token",user:{username:"admin"} } };
    if (usernameMatch && passwordMatch) {
      // Create a session and store it locally
      // sessionStorage.setItem('user', JSON.stringify({ isLoggedIn: true,username, }));
      return {
        success: true,
        data: {
          isAuthenticated: true,
          token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzMyNzk3MjgzLCJleHAiOjE3NDMxNjUyODN9.Kecg52y93DRJv6kgxX4m4ltL-vSbGlbzbQtrql503Cg",
          user: { username: "admin" },
        },
      };
    } else {
      return { success: false, data: "Invalid username or password" };
    }
  },
  /**
   * Takes an array of entities and returns an array of objects with `value` and
   * `label` properties, suitable for use in a dropdown. The objects represent
   * the entities in the campaign.
   *
   * @param {Array<Object>} entities - The array of entities.
   * @returns {Array<{value: string, label: string}>} - Array of objects with `value` and `label` properties.
   */
  generateEntitiesOptions: (entities) => {
    let options = entities.map((entity) => {
      return {
        value: entity.entityId,
        label: entity.entityName,
      };
    });

    return options;
  },
  /**
   * Takes an entity object and returns an array of objects with `value` and
   * `label` properties, suitable for use in a dropdown. The objects represent
   * the transaction contexts associated with the given entity.
   *
   * @param {Object} entity - The entity object with `transactionContexts` property.
   * @returns {Array<Object>} - Array of objects with `value` and `label` properties.
   */
  generateContextOptions: (entity) => {
    if (!entity) {
      return [];
    }
    let options = entity.transactionContexts.map((context) => {
      return {
        value: context.contextId,
        label: context.contextName,
      };
    });

    return options;
  },
  /** Generate the options  from the variables array.
   *
   * @param {Array<Object>} variables - Array of variable objects with `variableId` and `name` properties.
   * @returns {Array<Object>} - Array of objects with `value` and `label` properties.
   */
  generateVariableDropdownOptions: (variables) => {
    return variables.map((item) => {
      return {
        label: item.name,
        value: item.variableId,
      };
    });
  },

  /**
   * It will return the function to handle the input change which we are using on many component
   * on which we have to update the state of the input field with propert object formating
   */
  handleInputChangeFactoryFn: (setData) => {
    return (e, status) => {
      let { name, value } = e.target;

      setData((prev) => ({
        ...prev, // Spread the previous state
        [name]: {
          value,
          isValid: status.success,
          error: status.success ? null : status.error,
          isShowError: !status.success,
        },
      }));
    };
  },

  /**
   * It will return the function to handle the dropdown change which we are using on many component
   * on which we have to update the state of the input field with propert object formating
   * @param {function(prevData) => void} setData - The setstate function to set the data
   * @param {function(name: string, value: string) => void} [callBackFn] - The callback function to be called after the state is updated
   */
  handleDropdownChangeFactoryFn: (setData, callBackFn = null) => {
    return (name, value) => {
      // Update state
      setData((prev) => {
        const updatedObj = {
          ...prev,
          [name]: {
            value,
            isValid: true,
            error: null,
            isShowError: false,
          },
        };

        return updatedObj;
      });

      // If callback function is provided, call it
      if (callBackFn) {
        callBackFn(name, value);
      }
    };
  },
  /**
   * Parses a datetime string and returns date, time, or both in the specified format.
   * @param {string} dateTimeStr - The ISO datetime string to be parsed.
   * @param {"time" | "date" | "both"} returnType - Optional. Specifies what to return: 'date', 'time', or 'both'. Default is 'both'.
   * @param {object} format - The date format object that contain the date & time format.
   * @param {string}  [format.date = "YYYY-MM-DD"] The date format. It is optional.
   * @param {string} [format.time = "HH:mm:ss"] The time format. It is optional.
   * @returns {string | object} The formatted date, time, or both.
   */
  parseDateTime: (
    dateTimeStr,
    returnType = "both",
    format = {
      date: "YYYY-MM-DD",
      time: "HH:mm:ss",
    }
  ) => {
    const dateTime = dayjs(dateTimeStr);

    switch (returnType) {
      case "date":
        return dateTime.format(format.date); // Format only date part
      case "time":
        return dateTime.format(format.time); // Format only time part
      case "both":
      default:
        return {
          date: dateTime.format(format.date),
          time: dateTime.format(format.time),
        };
    }
  },
  /**
   * Validates and prepares the campaign object to be saved in the database.
   * @param {object} campaign - The campaign object to be validated and prepared.
   * @param {"creating" | "updating"} [status="creating"] - The status object to be updated with the validation result.
   * @returns {object} The prepared campaign object or null if the campaign is not valid.
   */
  validateCampaign: (campaign, status = "creating") => {
    const errors = {};

    // Basic Fields
    if (!campaign.name || campaign.name.trim() === "") {
      errors.name = "Campaign name is required";
    }

    if (!campaign.description || campaign.description.trim() === "") {
      errors.description = "Campaign description is required";
    }

    // Validate Dates
    if (!campaign.startDateTime) {
      errors.startDateTime = "Start date is required";
    }

    if (!campaign.endDateTime) {
      errors.endDateTime = "End date is required";
    }

    // if (
    //   campaign.startDateTime &&
    //   campaign.endDateTime &&
    //   new Date(campaign.startDateTime) > new Date(campaign.endDateTime)
    // ) {
    //   errors.dateOrder = "End date must be after the start date";
    // }

    // // Validate Collection Mappings
    // if (
    //   !Array.isArray(campaign.collectionMappings) ||
    //   campaign.collectionMappings.length < 1
    // ) {
    //   errors.collectionMappings = "At least one collection mapping is required";
    // }

    // // Validate Persistent Variable Definitions
    // if (
    //   !Array.isArray(campaign.persistentVariableDefinitions) ||
    //   campaign.persistentVariableDefinitions.length < 1
    // ) {
    //   errors.persistentVariableDefinitions =
    //     "At least one persistent variable definition is required";
    // }

    // // Validate Local Variable Definitions
    // if (
    //   !Array.isArray(campaign.localVariableDefinitions) ||
    //   campaign.localVariableDefinitions.length < 1
    // ) {
    //   errors.localVariableDefinitions =
    //     "At least one local variable definition is required";
    // }

    // Validate Entities
    // if (!Array.isArray(campaign.entities) || campaign.entities.length < 1) {
    //   errors.entities = "At least one entity is required";

    // }

    let success = Object.keys(errors).length === 0 ? true : false;
    let data = success ? campaign : errors;

    return Helpers.returnObj(success, data);
  },
  /**
   * Prepares the campaign object for further processing or saving.
   * Currently, it returns the campaign object as-is.
   *
   * @param {object} campaign - The campaign object to be prepared.
   * @param {"creating" | "updating"} status - The status of the campaign.
   * @returns {object} - The prepared campaign object.
   */
  prepareCampaign: (campaign, status) => {
    let updatedCampaign = {
      ...campaign,
    };
    console.log(JSON.stringify(updatedCampaign), "updatedCampaign");
    if (status === "creating") {
      updatedCampaign.campaignId = Helpers.idGenerator(
        updatedCampaign.name,
        "pascal",
        {
          maxLength: 50,
        }
      );
      updatedCampaign.campaignVersion = 1;
      updatedCampaign.schemaVersion = "2.4.0";
      updatedCampaign.status = "ACTIVE"; //  "DRAFT", "ACTIVE", "PAUSED", "COMPLETED"
      /* Helpers.generateVersion({
        autoInitialize: true,
        incrementType: "patch",
      }) */
    }
    if (status === "updating") {
      updatedCampaign.campaignVersion++;
      /* Helpers.generateVersion({
        currentVersion: campaign.version,
        incrementType: "patch",
      }) */
    }
    // updatedCampaign.lastModifiedDateTime =
    //   new Date().toISOString()?.split(".")[0] + "Z"; // example: "2021-09-01T12:00:00.000Z"
    // updatedCampaign.startDateTime =
    //   updatedCampaign.startDateTime?.split(".")[0] + "Z";
    // updatedCampaign.endDateTime =
    //   updatedCampaign.endDateTime?.split(".")[0] + "Z";

    updatedCampaign.lastModifiedDateTime = Helpers.convertToISO8601();
    updatedCampaign.startDateTime = Helpers.convertToISO8601(
      updatedCampaign.startDateTime
    );
    updatedCampaign.endDateTime = Helpers.convertToISO8601(
      updatedCampaign.endDateTime
    );

    return updatedCampaign;
  },
  /**
   * Create the rows util factory function to be use inside the component for the management of the rows array
   * @param {[]} itemsArray
   * @param {function(Array): void} setItems
   * @param {string} label
   * @returns
   */
  createRowsUtil: function (itemsArray, setItems, label, Alert) {
    /** @type {Helpers} */
    const HelperClass = this;

    const labelId = HelperClass.nameIdGenerator(label);

    return {
      /** Handle the edit button click on the row */

      handleEditBtnClick: (itemIndex) => {
        const updatedData = itemsArray.map((item, index) => {
          if (index === itemIndex) {
            return {
              ...item,
              mode: "editing",
            };
          }
          return item;
        });

        setItems(() => updatedData);
      },

      /** Handler to add the new item */
      handleAddNewItem: () => {
        const defId = `new${labelId}`;

        // check if new item already exist
        let alreadyItem = itemsArray.find((item) => item.id === defId);

        if (alreadyItem) {
          return Alert(`Cannot add multiple new ${label}s`, "error");
        }
        // Add new item to the array
        const newItem = {
          id: defId,
          mode: "editing", // ["viewing", "editing"]
          columns: [{ content: `Create ${label}`, gridSize: 6 }],
          isEditable: true,
          isDeletable: true,
          isAllFieldsValid: false,
          validations: {},
          data: {
            type: "",
            parameter: "",
          },
        };

        setItems((prev) => [...prev, newItem]);
      },

      /** Handler to delete the item */
      handleDeleteItem: (itemIndex) => {
        const updatedData = itemsArray.filter(
          (_, index) => index !== itemIndex
        );
        setItems(() => updatedData);
      },

      /** Handler to save the the item */
      handleSaveFunc: (id, inputs) => {
        const updatedData = itemsArray.map((item) => {
          return item.id == id
            ? {
              ...inputs,
              variableId: Helpers.nameIdGenerator(inputs.name || "temp"),
            }
            : { ...HelperClass.returnValues(item.inputs) };
        });

        // const updatedData = itemsArray.map((item) => {
        //   return item.id === id
        //     ? { ...inputs, variableId: Helpers.nameIdGenerator(inputs.name) }
        //     : { ...HelperClass.returnValues(item.inputs) };
        // });

        setItems(() => updatedData);

        // Set the alert here if successful
        Alert(`${label.toUpperCase()} added successfully`, "success");
      },

      /** Handler to cancel the the item */
      handleCancelFunc: (id) => {
        setItems((prev) => {
          const updatedData = prev.map((item) => {
            return item.id === id ? { ...item, mode: "viewing" } : item;
          });

          return updatedData;
        });
      },

      isValidNumber: (value) => {
        return !isNaN(value) && value.trim() !== "" && isFinite(value);
      },
    };
  },
  /**
   * Create the columns util factory function to be use inside the component for the management of the columns array
   * @param {createColumnsUtil_Param_columns} columns
   */
  createColumnsUtil: function (columns) {
    return {
      /**
       * Columns of the section header
       */
      columnsOfSectionHeader: columns.map((column) => ({
        label: column.label,
        gridSize: column.gridSize,
      })),

      /**
       * Generate the item content columns
       */
      generateItemContentColumns: (item) => {
        item = item || {};

        return columns.map((column) => {
          let content = "";

          switch (column.content.type) {
            // If the type is the array length then get the length of the array
            case "arrayLength":
              content = item[column.content.key]
                ? item[column.content.key].length
                : column.content.def;
              break;
            default:
              // Get the value from the item object
              content = item[column.content.key] || column.content.def || "";
              break;
          }

          return {
            content: content,
            gridSize: column.gridSize,
          };
        });
      },
    };
  },
  /**
   * Version Generator
   *
   * Creates and manages version numbers with simple, predictable incrementation
   *
   * @param {Object} options - Configuration options for version generation
   * @param {string} [options.currentVersion] - Current version to increment
   * @param {'major'| 'minor'| 'patch'} [options.incrementType='patch'] - Type of version increment ('major', 'minor', 'patch')
   * @param {boolean} [options.autoInitialize=true] - Automatically initialize version if not provided
   * @returns {string} - Generated version string
   */
  generateVersion: (options = {}) => {
    const {
      currentVersion = null,
      incrementType = "patch",
      autoInitialize = true,
    } = options;

    // Regular expression for validating version numbers
    const versionRegex = /^(\d+)(?:\.(\d+))?(?:\.(\d+))?$/;

    /**
     * Validates and parses a version string
     * @param {string} version - Version string to parse
     * @returns {Object} Parsed version components
     */
    const parseVersion = (version) => {
      // If no version is provided and autoInitialize is true, start at 1.0.0
      if (!version && autoInitialize) {
        return { major: 1, minor: 0, patch: 0 };
      }

      // Validate version format
      const match = version ? version.match(versionRegex) : null;

      if (!match) {
        throw new Error(`Invalid version format: ${version}`);
      }

      return {
        major: parseInt(match[1] || 1),
        minor: parseInt(match[2] || 0),
        patch: parseInt(match[3] || 0),
      };
    };

    /**
     * Increments version based on increment type
     * @param {Object} version - Parsed version object
     * @param {string} type - Increment type
     * @returns {Object} Updated version object
     */
    const incrementVersion = (version, type) => {
      const newVersion = { ...version };

      switch (type.toLowerCase()) {
        case "major":
          newVersion.major += 1;
          newVersion.minor = 0;
          newVersion.patch = 0;
          break;
        case "minor":
          newVersion.minor += 1;
          newVersion.patch = 0;
          break;
        case "patch":
          newVersion.patch += 1;
          break;
        default:
          throw new Error(`Invalid increment type: ${type}`);
      }

      return newVersion;
    };

    /**
     * Formats version object into string
     * @param {Object} version - Version object
     * @returns {string} Formatted version string
     */
    const formatVersion = (version) => {
      return `${version.major}.${version.minor}.${version.patch}`;
    };

    try {
      // Parse the current version (or initialize if not provided)
      let version = parseVersion(currentVersion);

      // Increment the version if current version was provided
      if (currentVersion) {
        version = incrementVersion(version, incrementType);
      }

      return formatVersion(version);
    } catch (error) {
      console.error(`Error generating version: ${error.message}`);
      return "1.0.0"; // Fallback to default version
    }
  },
  /**
   * Converts a date string to ISO 8601 format with time
   * @param {string} dateString - The date string to convert
   * @returns {string} The ISO 8601 formatted date string
   */
  toISO8601WithTime: (dateString) => {
    const date = new Date(dateString);
    return date.toISOString(); // Converts to 'YYYY-MM-DDTHH:mm:ss.sssZ'
  },
  /**
   * This function checks if a variable is used in any entity. If it is used then return true else false
   * @param {string} variableId - The variable ID to check
   * @param {Array<Object>} entities - The array of entities to check
   * @returns {boolean} - True if the variable is used in any entity, else false
   */
  isVariableUsed: (variableId, entities) => {
    // Check if the variable is used in any entity
    return entities.some((entity) => {
      return entity.transactionContexts.some((context) => {
        return context.rules.some((rule) => {
          return rule.variableOperations.some((condition) => {
            return condition.variableId === variableId;
          });
        });
      });
    });
  },
  /**
   *  This function generates the transaction context properties for the dropdown based on the entity and context selected
   * @param {object} entities The entities array
   * @param {string} entityId The entity id
   * @param {string} contextId The context id
   * @param {boolean} encloseValInCurlyBrack Whether to enclose the value in curly brackets
   * @returns {{ value:string,label:string }[]} The properties options
   */
  // generateTransContextOptions: (
  //   entities,
  //   entityId,
  //   contextId,
  //   encloseValInCurlyBrack = false
  // ) => {
  //   let entity = entities.find((entity) => entity.entityId === entityId);
  //   let context = entity.transactionContexts.find(
  //     (context) => context.contextId === contextId
  //   );
  //   let propertiesOptions = context.properties.map((property) => {
  //     return {
  //       value: encloseValInCurlyBrack ? `{${property.name}}` : property.name,
  //       label: `${property.name}${
  //         property.description ? ` - ${property.description}` : ""
  //       }`,
  //     };
  //   });

  //   return propertiesOptions;
  // },
  /**
   * Function to generate the category dropdown category options
   * @param {Array.<{id: "localVariables" | "persistentVariables" | "transactionVariables" | "transactionContextProperties", label?: string, data: [] | {}}>} categories
   * @param {object} campaign - The campaign object
   * @param {boolean} [entities=false] - Supply the entitties array if the category id we want is transactionContextProperties
   * @param {boolean} [disableCustomValue=false] - Whether to disable the custom user input value
   * @returns
   */
  generateTransContextOptions: (
    entities,
    entityId,
    contextId,
    encloseValInCurlyBrack = false
  ) => {
    // Added null check for entity
    let entity = entities.find((entity) => entity.entityId === entityId);
    if (!entity) {
      return [];
    }

    // Added null check for context
    let context = entity.transactionContexts.find(
      (context) => context.contextId === contextId
    );
    if (!context) {
      return [];
    }
    let propertiesOptions = context.properties.map((property) => {
      return {
        value: encloseValInCurlyBrack ? `{${property.name}}` : property.name,
        label: `${property.name}${property.description ? ` - ${property.description}` : ""
          }`,
      };
    });

    return propertiesOptions;
  },
  // generateCategoryDropDownAllOptions(
  //   categories,
  //   campaign,
  //   entities = false,
  //   disableCustomValue = false
  // ) {
  //   const categoryOpyions = [];

  //   // Loop through the categories and generate the options
  //   categories.forEach((category) => {
  //     switch (category.id) {
  //       case "localVariables":
  //         categoryOpyions.push({
  //           value: category.id,
  //           label: category.label || "Local Variables",
  //         });
  //         break;

  //       default:
  //         break;
  //     }
  //   });
  // },
  /**
   * Converts a datetime string to the ISO 8601 format ("YYYY-MM-DDTHH:mm:ssZ").
   * If the input is already in the correct format, it returns the same string.
   * If no datetime string is provided, it returns the current date in ISO 8601 format.
   *
   * @param {string} [dateStr] - The datetime string to be converted. This can be in
   *                             various ISO 8601 formats, including milliseconds (e.g., "2024-11-21T19:00:00.000Z").
   *                             If not provided, the current date is used.
   * @returns {string} The datetime string in the format "YYYY-MM-DDTHH:mm:ssZ".
   * @throws {Error} If the provided date string is not a valid date.
   *
   * @example
   * // Returns "2024-11-21T19:00:00Z"
   * convertToISO8601("2024-11-21T19:00:00.000Z");
   *
   * @example
   * // Returns the current date in ISO 8601 format, e.g., "2024-11-14T13:45:00Z"
   * convertToISO8601();
   */
  generateCategoryDropDownAllOptions(
    categories,
    campaign,
    entities = false,
    disableCustomValue = false
  ) {
    // Initialize array to store category options
    const categoryOptions = [];

    // Added null check for categories
    if (!categories || !Array.isArray(categories)) {
      return categoryOptions;
    }

    // Loop through the categories and generate the options
    categories.forEach((category) => {
      switch (category.id) {
        case "localVariables":
          // Push local variables option with provided or default label
          categoryOptions.push({
            value: category.id,
            label: category.label || "Local Variables",
          });
          break;

        // Add default case to ignore unknown categories
        default:
          break;
      }
    });

    // Return the generated options
    return categoryOptions;
  },
  /**
   * Converts a given date string to ISO 8601 format (`YYYY-MM-DDTHH:mm:ssZ`).
   * If the input date string is already in ISO 8601 format, it is returned as-is.
   * If no date string is provided, the current date and time in UTC is returned in ISO 8601 format.
   *
   * @param {string} [dateStr] - Optional date string to convert. If omitted, the current date is used.
   *                             Acceptable date formats include any format compatible with JavaScript's Date constructor.
   *                             Example input: "2024-11-14" or "11/14/2024".
   *
   * @returns {string} The date in ISO 8601 format (e.g., "2024-11-14T13:07:12Z").
   *
   * @throws {Error} Throws an error if the input date string is invalid.
   *
   * @example
   * // Returns the current date in ISO 8601 format
   * convertToISO8601();
   *
   * @example
   * // Returns "2024-11-14T13:07:12Z" if `dateStr` is "2024-11-14T13:07:12Z"
   * convertToISO8601("2024-11-14T13:07:12Z");
   *
   * @example
   * // Converts "2024-11-14" to "2024-11-14T00:00:00Z"
   * convertToISO8601("2024-11-14");
   */
  convertToISO8601: (dateStr) => {
    // If dateStr is undefined, use the current date
    const date = dateStr ? new Date(dateStr) : new Date();

    // Check if the date is already in the correct format
    const iso8601Regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/;
    if (dateStr && iso8601Regex.test(dateStr)) {
      return dateStr; // Return as-is if already in the correct format
    }

    // Check if the date is valid
    if (isNaN(date.getTime())) {
      throw new Error("Invalid date format"); // Handle invalid dates
    }

    // Format the date to "YYYY-MM-DDTHH:mm:ssZ"
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const day = String(date.getUTCDate()).padStart(2, "0");
    const hours = String(date.getUTCHours()).padStart(2, "0");
    const minutes = String(date.getUTCMinutes()).padStart(2, "0");
    const seconds = String(date.getUTCSeconds()).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;
  },
  /**
   * Parses a UTC timestamp and returns detailed date and time information.
   *
   * @param {string} utcString - The UTC timestamp in ISO 8601 format (e.g., "2024-11-14T13:07:12Z").
   * @returns {{
   *  day: number, // Day of the month (1-31), e.g., 14
   *  dayNumeric: number, // Numeric day without leading zero, e.g., 14
   *  month: number, // Month of the year (1-12), e.g., 11
   *  monthNumeric: number, // Numeric month without leading zero, e.g., 11
   *  monthName: string, // Full name of the month, e.g., "November"
   *  year: number, // Full year, e.g., 2024
   *  hours: number, // Hour of the day in 24-hour format (0-23), e.g., 13
   *  minutes: number, // Minute of the hour (0-59), e.g., 7
   *  seconds: number, // Second of the minute (0-59), e.g., 12
   *  weekdayName: string, // Full name of the weekday, e.g., "Thursday"
   *  isoString: string, // Original UTC string, e.g., "2024-11-14T13:07:12Z"
   *  formattedDate: string, // Date in YYYY-MM-DD format, e.g., "2024-11-14"
   *  formattedTime: string // Time in HH:mm:ss UTC format, e.g., "13:07:12 UTC"
   * }} object An object containing detailed date and time information.
   */
  parseUTCDate: (utcString) => {
    const date = new Date(utcString);

    const day = date.getUTCDate(); // Day of the month (1-31)
    const dayNumeric = day; // Numeric day without leading zero
    const month = date.getUTCMonth() + 1; // Month (1-12)
    const monthNumeric = month; // Numeric month without leading zero
    const year = date.getUTCFullYear(); // Full year (e.g., 2024)
    const hours = date.getUTCHours(); // Hours (0-23)
    const minutes = date.getUTCMinutes(); // Minutes (0-59)
    const seconds = date.getUTCSeconds(); // Seconds (0-59)

    const monthName = date.toLocaleString("en-US", {
      month: "long",
      timeZone: "UTC",
    }); // Full name of the month (e.g., "November")

    const weekdayName = date.toLocaleString("en-US", {
      weekday: "long",
      timeZone: "UTC",
    }); // Full name of the weekday (e.g., "Thursday")

    return {
      day, // Day of the month (1-31), e.g., 14
      dayNumeric, // Numeric day without leading zero, e.g., 14
      month, // Month of the year (1-12), e.g., 11
      monthNumeric, // Numeric month without leading zero, e.g., 11
      monthName, // Full name of the month, e.g., "November"
      year, // Full year, e.g., 2024
      hours, // Hour of the day in 24-hour format (0-23), e.g., 13
      minutes, // Minute of the hour (0-59), e.g., 7
      seconds, // Second of the minute (0-59), e.g., 12
      weekdayName, // Full name of the weekday, e.g., "Thursday"
      isoString: utcString, // Original UTC string, e.g., "2024-11-14T13:07:12Z"
      formattedDate: `${year}-${String(month).padStart(2, "0")}-${String(
        day
      ).padStart(2, "0")}`, // e.g., "2024-11-14"
      formattedTime: `${String(hours).padStart(2, "0")}:${String(
        minutes
      ).padStart(2, "0")}:${String(seconds).padStart(2, "0")} UTC`, // e.g., "13:07:12 UTC"
    };
  },
  /**
   * Prepares analytics data by combining fields with their corresponding values and timestamps.
   *
   * @param {Array} fields - An array of field objects, each containing at least a 'name' property and optionally a 'prefix'.
   * @param {Array} data - An array of data entries, each containing a 'timestamp' and a 'values' array.
   * @returns {Array} - An array of objects, each containing 'values' (an array of field-value pairs) and 'timestamp'.
   */
  prepareAnalyticsFieldsData: (fields, data) => {
    const result = fields.map((field, index) => {
      // Sum all values for the current field across all data entries
      const totalValue = data.reduce((sum, entry) => {
        return sum + (entry.values[index] || 0);
      }, 0);

      return {
        ...field,
        value: totalValue, // Store the summed value for this field
      };
    });

    return [{ values: result }]; // Return the result in the expected format
  },

  /**
   * Organizes and structures analytics data fields into grouped arrays based on fields.
   *
   * This function takes an array of fields and an array of data points, where each data point contains
   * multiple values associated with each field. It organizes the data so that each field's data
   * is grouped together across timestamps.
   *
   * @param {Array} fields - Array of field objects that describe each metric.
   * @param {Array<{name: string, prefix?: string}>} fields - Array of field objects that describe each metric.
   * @param {Object[]} fields - Array of field objects that describe each metric.
   * @param {Object} fields[].prefix - The prefix for the metric (e.g., "$" for currency).
   * @param {Array} data - Array of data points, each with a timestamp and values corresponding to each field.
   * @param {object[]} data - Array of data points, each with a timestamp and values corresponding to each field.
   * @param {string} data[].timestamp - The timestamp for the data point in ISO 8601 format (e.g., "2024-11-01T13:07:12Z").
   * @param {Array<number>} data[].values - Array of numeric values, each corresponding to a field in `fields`.
   *
   * @returns {Array<Array<Object>>} - An array where each sub-array contains objects representing
   *                                   the values and metadata for a specific field across timestamps.
   *                                   Each object includes the field's name, prefix, timestamp, and value.
   *
   * @example
   * const fields = [
   *   { name: "Airtime Revenue", prefix: "$" },
   *   { name: "Transaction Count" }
   * ];
   * const data = [
   *   { timestamp: "2024-11-01T13:07:12Z", values: [1000, 500] },
   *   { timestamp: "2024-11-02T13:07:12Z", values: [1200, 550] }
   * ];
   *
   * const result = analyticsGraphFieldsOrganizer(fields, data);
   * // result:
   * // [
   * //   [
   * //     { name: "Airtime Revenue", prefix: "$", timestamp: "2024-11-01T13:07:12Z", value: 1000 },
   * //     { name: "Airtime Revenue", prefix: "$", timestamp: "2024-11-02T13:07:12Z", value: 1200 }
   * //   ],
   * //   [
   * //     { name: "Transaction Count", prefix: "", timestamp: "2024-11-01T13:07:12Z", value: 500 },
   * //     { name: "Transaction Count", prefix: "", timestamp: "2024-11-02T13:07:12Z", value: 550 }
   * //   ]
   * // ]
   */
  analyticsGraphFieldsOrganizer: (fields, data) => {
    let organizedData = data.map((item) => {
      return item.values.map((value, index) => {
        return {
          name: fields[index]?.name,
          prefix: fields[index].prefix,
          timestamp: item.timestamp,
          value: value,
        };
      });
    });

    let outerArray = [];
    organizedData.forEach((item) => {
      item.forEach((itm, indx) => {
        outerArray[indx] = outerArray[indx] || [];
        outerArray[indx].push(itm);
      });
    });

    return outerArray;
  },
  /**
   *
   * @param {{category: string, options: {value:string, label: string}[]}[]} options
   * @returns
   */
  wipeTheBracketsFromTheOptionsValue: (options) => {
    const newOptions = (iOptions) => {
      return iOptions.map((option) => {
        return {
          value: option.value.replace("{", "").replace("}", ""),
          label: option.label,
        };
      });
    };

    return options.map((option) => ({
      ...option,
      options: newOptions(option.options),
    }));
  },
  /**
   * Converts a given text to the specified case.
   *
   * @param {string} text - The text to convert.
   * @param {"pascal" | "upper" | "lower" | "capitalize" | "title"} caseType - The case type to convert to. Possible values:
   *  - "pascal" (e.g., "PascalCase")
   *  - "upper" (e.g., "UPPERCASE")
   *  - "lower" (e.g., "lowercase")
   *  - "capitalize" (e.g., "Capitalize First Letter")
   *  - "title" (e.g., "Title Case")
   * @returns {string} The text converted to the specified case.
   */
  convertCase: (text, caseType) => {
    if (!text || typeof text !== "string") {
      throw new Error("Invalid text input. Please provide a valid string.");
    }

    switch (caseType.toLowerCase()) {
      case "pascal":
        return text
          .split(/[\s_-]+/) // Split by spaces, underscores, or dashes
          .map(
            (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
          )
          .join("");

      case "upper":
        return text.toUpperCase();

      case "lower":
        return text.toLowerCase();

      case "capitalize":
        return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();

      case "title":
        return text
          .split(/[\s_-]+/) // Split by spaces, underscores, or dashes
          .map(
            (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
          )
          .join(" ");

      default:
        return "Error While Case Conversion"; // Return the original text if case type is not recognized
    }
  },
  /**
   * Aggregates data based on the specified period (daily, weekly, monthly, yearly).
   *
   * @param {Array} data - Array of data objects with name, timestamp, and value.
   * @param {string} period - The period to aggregate by ("daily", "weekly", "monthly", "yearly").
   * @returns {Array} Aggregated data for the specified period.
   */
  aggregateData: (data, period) => {
    console.log(period, "period here");

    // Helper function to get the start of the week (Monday) for a given date
    function getStartOfWeek(date) {
      const d = new Date(date);
      const day = d.getUTCDay();
      const diff = d.getUTCDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday (0)
      return new Date(d.setUTCDate(diff));
    }
    // Helper function to get the end of the week (Sunday) for a given date
    function getEndOfWeek(date) {
      const startOfWeek = getStartOfWeek(date);
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      return endOfWeek;
    }

    // Helper function to get the month name
    function getMonthName(date) {
      const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      return monthNames[date.getUTCMonth()];
    }

    const aggregatedData = {};

    data.forEach((entry) => {
      const date = new Date(entry.timestamp);
      let key, label, x_axis, y_axis;

      // Determine the aggregation key and label based on the selected period
      switch (period) {
        case "daily":
          x_axis = `${getMonthName(date)} ${date.getUTCDate()}`; // e.g., "Nov 25"
          key = date.toISOString().split("T")[0]; // "YYYY-MM-DD"
          break;

        case "weekly":
          const startOfWeek = getStartOfWeek(date);
          const endOfWeek = getEndOfWeek(date);
          key = startOfWeek.toISOString().split("T")[0]; // Start date of the week in "YYYY-MM-DD"
          x_axis = `${startOfWeek.getUTCDate()}-${getMonthName(
            startOfWeek
          )} to ${endOfWeek.getUTCDate()}-${getMonthName(endOfWeek)}`; // Format: "1-Nov-2024 to 7-Nov-2024"
          break;
        // case "weekly":
        //   const startOfWeek = getStartOfWeek(date);
        //   key = startOfWeek.toISOString().split("T")[0]; // Start date of the week in "YYYY-MM-DD"
        //   let newDate =
        //     date.getDay() +
        //     1 +
        //     "-" +
        //     getMonthName(date) +
        //     "-" +
        //     date.getFullYear(); // current format : 11-Nov-2024
        //   console.log(newDate, "newDate");
        //   // x_axis = `Week ${Math.ceil(date.getUTCDate() / 7)}`; // e.g., "Week 1", "Week 2"
        //   x_axis = newDate;
        //   break;
        // case "monthly":
        //   key = `${date.getUTCFullYear()}-${String(
        //     date.getUTCMonth() + 1
        //   ).padStart(2, "0")}`; // "YYYY-MM"
        //   x_axis = getMonthName(date); // e.g., "Jan", "Feb"
        //   break;
        case "monthly":
          key = `${date.getUTCFullYear()}-${String(
            date.getUTCMonth() + 1
          ).padStart(2, "0")}`; // "YYYY-MM"
          x_axis = `${getMonthName(date)} ${date.getUTCFullYear()}`; // e.g., "Nov 2024"
          break;
        case "yearly":
          key = `${date.getUTCFullYear()}`; // "YYYY"
          x_axis = key; // Year label, e.g., "2024"
          break;
        default:
          throw new Error(
            "Invalid period specified. Use 'daily', 'weekly', 'monthly', or 'yearly'."
          );
      }

      // Initialize the aggregation if the key does not exist
      if (!aggregatedData[key]) {
        aggregatedData[key] = {
          timestamp: key,
          x_axis: x_axis,
          label: label,
          name: entry.name,
          prefix: entry.prefix || "$",
          value: 0,
          count: 0,
        };
      }

      // Sum up the values for the specific metric
      aggregatedData[key].value += entry.value;
      aggregatedData[key].count += 1; // Track the number of entries for averaging if needed
    });

    // Convert aggregated data to an array and calculate averages if necessary
    let countIndex = 1; // To track the sequence count (weekCount, monthCount, yearCount, etc.)

    return Object.values(aggregatedData).map((entry) => {
      // Calculate average values for non-daily periods
      if (period !== "daily") {
        entry.value = entry.value / entry.count;
      }

      // Add sequence count based on the period type
      if (period === "weekly") {
        entry.weekCount = countIndex++;
      } else if (period === "monthly") {
        entry.monthCount = countIndex++;
      } else if (period === "yearly") {
        entry.yearCount = countIndex++;
      } else if (period === "daily") {
        entry.dayCount = countIndex++;
      }
      // Attach the prefix to the value if available
      entry.valueWithPrefix = entry.prefix
        ? `${entry.prefix}${Math.round(entry.value)}`
        : Math.round(entry.value);
      delete entry.count; // Remove the count property as it's no longer needed
      // entry.value = `${entry.prefix} ${entry.value}` // Round the value to the nearest whole number
      return entry;
    });
  },

  /**
   * Download the csv file by the blob object
   * @param {Blob} blob The blob object
   * @param {string} fileName 
   */
  downloadCsvFileByBlob: (blob, fileName) => {
    // Create a URL for the Blob
    const url = window.URL.createObjectURL(blob);

    // Create an anchor element
    const a = document.createElement("a");
    a.href = url; // Set the href to the Blob URL
    a.download = fileName; // Set the desired file name for the download

    // Append the anchor to the DOM
    document.body.appendChild(a);

    // Trigger the download by simulating a click
    a.click();

    // Clean up the anchor and Blob URL
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

  }
};

/**
 * @typedef {Object[]} createColumnsUtil_Param_columns
 * @property {string} label - The label of the column
 * @property {number} gridSize - The grid size of the column
 * @property {Object} content - The content of the column
 * @property {string} content.key - The key of the item object in the generateItemContentColumns function to get the content for the column
 * @property {string} [content.def] - The default value of the column if the key is not present in the item object or the value is empty/undefined/null
 * @property {"value" | "arrayLength"} [content.type] - (Optional): The type of the content to be displayed in the column. If it's array and we want the length then we can use arrayLength
 */
