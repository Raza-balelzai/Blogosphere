import validator from "validator";

export let authValidators = {
  global: {
    /**
     * Validates an email address.
     * @param {string} email - The email address to be validated.
     * @returns {Object} An object with a success flag and a message.
     *                  success is true if the email is valid, false otherwise.
     *                  message is an empty string if success is true, an error message otherwise.
     */
    email: (email) => {
      if (!validator.isEmail(email)) {
        return {
          success: false,
          message: "Invalid email address.",
        };
      }
      return { success: true, message: "" };
    },
    /**
     * Validates a password.
     * @param {string} password - The password to be validated.
     * @returns {Object} An object with a success flag and a message.
     *                  success is true if the password is valid, false otherwise.
     *                  message is an empty string if success is true, an error message otherwise.
     */
    password: (password) => {
       // Check minimum length
  if (!validator.isLength(password, { min: 8 })) {
    return {
      success: false,
      message: "Password must be at least 8 characters long.",
    };
  }

  // Check for at least one uppercase letter
  if (!/[A-Z]/.test(password)) {
    return {
      success: false,
      message: "Password must contain at least one uppercase letter.",
    };
  }

  // Check for at least one lowercase letter
  if (!/[a-z]/.test(password)) {
    return {
      success: false,
      message: "Password must contain at least one lowercase letter.",
    };
  }

  // Check for at least one special character
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return {
      success: false,
      message: "Password must contain at least one special character.",
    };
  }

  return { success: true, message: "" };
    },
    /**
     * Validates a name.
     * @param {string} name - The name to be validated.
     * @returns {Object} An object with a success flag and a message.
     *                  success is true if the name is valid, false otherwise.
     *                  message is an empty string if success is true, an error message otherwise.
     */
    name: (name) => {
      if (!validator.isLength(name, { min: 1 })) {
        return {
          success: false,
          message: "Name must be at least 1 characters long.",
        };
      }
      return { success: true, message: "" };
    },
    /**
     * Validates a username.
     * @param {string} username - The username to be validated.
     * @returns {Object} An object with a success flag and a message.
     *                  success is true if the username is valid, false otherwise.
     *                  message is an empty string if success is true, an error message otherwise.
     */
    username: (username) => {
      // if (!validator.isAlphanumeric(username) || username.length < 3) {
      //   return {success:false,message:"Username must be at least 3 characters long and contain only letters and numbers."};
      // }
      // return {success:true,message:null};

      if (!username || typeof username !== 'string') {
        return { success: false, message: "Username is required and must be a string." };
      }
      if (!/^[A-Za-z]/.test(username)) {
        return { success: false, message: "Username must start with a letter." };
      }
      
      if (!validator.isAlphanumeric(username)) {
        return { success: false, message: "Username must contain only letters and numbers." };
      }
      
      if (username.length < 3) {
        return { success: false, message: "Username must be at least 3 characters long." };
      }
      
      return { success: true, message: null };
    },
  },
  /** 
   * Validates a login form.
   * @param {Object} obj - The object containing the username and password.
   * @param {string} obj.username - The username to be validated.
   * @param {string} obj.password - The password to be validated.
   * @returns {{success: boolean, message: string}} An object with a success flag and a message.
   *                  success is true if the form is valid, false otherwise.
   *                  message is an empty string if success is true, an error message otherwise.
   */
  isLoginFormValid: ({ username, password }) => {
    // let isEmailValid = authValidators.global.email(email);
    let isValidUsername = authValidators.global.username(username);
    let isPasswordValid = authValidators.global.password(password);

    // if (!isEmailValid.success) {
    //   return isPasswordValid;
    // }
    if (!isValidUsername.success) {
      return isValidUsername;
    }

    if (!isPasswordValid.success) {
      return isPasswordValid;
    }
    return { success: true, message: null };
  },
  /**
   * Validates a register form.
   * @param {Object} obj - The object containing the name, email, password and conform password.
   * @returns {{success: boolean, message: string}} An object with a success flag and a message.
   *                  success is true if the form is valid, false otherwise.
   *                  message is an empty string if success is true, an error message otherwise.
   */
  isRegisterFormValid: ({ name, email, password, cPassword }) => {
    const isNameValid = authValidators.global.name(name);
    let isEmailValid = authValidators.global.email(email);
    let isPasswordValid = authValidators.global.password(password);

    if (!isNameValid.success) {
      return isNameValid;
    }
    if (!isEmailValid.success) {
      return isEmailValid;
    }
    if (!isPasswordValid.success) {
      return isPasswordValid;
    }
    if (password !== cPassword) {
      return {
        success: false,
        message: "Password and conform password are not same!",
      };
    }
    return { success: true, message: null };
  },
/**
 * Validates a forgot password form.
 * 
 * @param {Object} obj - The object containing the email.
 * @param {string} obj.email - The email to be validated.
 * @returns {{success: boolean, message: string}} An object with a success flag and a message.
 *                  success is true if the email is valid, false otherwise.
 *                  message is an empty string if success is true, an error message otherwise.
 */
  isForgotPasswordFormValid: ({ email }) => {
    let isEmailValid = authValidators.global.email(email);

    if (!isEmailValid.success) {
      return isEmailValid;
    }
    return { success: true, message: null };
  },
  /**
   * Validates the reset password form.
   * 
   * @param {Object} obj - The object containing the password and confirmation password.
   * @param {string} obj.password - The new password to be validated.
   * @param {string} obj.cPassword - The confirmation password to check against the new password.
   * @returns {{success: boolean, message: string}} An object with a success flag and a message.
   *                  success is true if the passwords are valid and match, false otherwise.
   *                  message is an empty string if success is true, an error message otherwise.
   */
  isResetPasswordFormValid: ({ password, cPassword }) => {
    let isEmailValid = authValidators.global.password(password);
    if (!isEmailValid.success) {
      return isEmailValid;
    }
    if (password !== cPassword) {
      return {
        success: false,
        message: "Password and conform password are not same!",
      };
    }
    return { success: true, message: null };
  },
};
