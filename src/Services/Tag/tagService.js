
// import APIService from '../API/APIService'
// import endPoints from '../endPoints/EndPoints';
// import { Helpers } from './AuthService';
// // import { loginSuccess, logoutSuccess } from './AuthService';

// class tagServiceClass {


// /**
//  * Registers a new user with the given email, password, and name.
//  *
//  * This function sends a POST request to the registration endpoint
//  * with the provided user details. If the registration is successful,
//  * the user data is set and the response data is returned. In case of
//  * an error, an error message is returned.
//  *
//  * @param {string} email - The email of the user to register.
//  * @param {string} password - The password of the user to register.
//  * @param {string} name - The name of the user to register.
//  * @returns {Promise<{ success: boolean, data: any }>} The response data if successful, or an error message if failed.
//  */
//   async createTag(email, password, name) {
//     try {
//       const response = await APIService.getApiService().post(endPoints.auth.register, {
//         email,
//         password,
//         name,
//       });

//       // If not successfull then return
//       if (!response.data.success) return response.data

//       // We are here it means success
//       this._setData(response.data.data);

//       return response.data;

//     } catch (error) {

//       // @ts-ignore
//       return Helpers.returnObj(false, APIService.getErrorMessage(error, "Registration failed"));

//     }

//   }


//   /**
//    * Logs in a user with the given email and password.
//    *
//    * This function sends a POST request to the login endpoint
//    * with the provided email and password. If the login is successful,
//    * the user data is set and the response data is returned. In case of
//    * an error, an error message is returned.
//    *
//    * @param {string} email - The email of the user to login.
//    * @param {string} password - The password of the user to login.
//    * @returns {Promise<{ success: boolean, data: any }>} The response data if successful, or an error message if failed.
//    */
//   async login(email, password) {
//     try {

//       const response = await APIService.getApiService().post(endPoints.auth.login, { email, password });

//       // If not successfull then return
//       if (!response.data.success) return response.data

//       // Set data
//       this._setData(response.data.data);

//       return response.data;

//     } catch (error) {

//       return Helpers.returnObj(false, APIService.getErrorMessage(error, "Login failed"));
//     }
//   }

// /**
//  * Logs out the current user.
//  *
//  * This function removes the user's token and user data from session storage,
//  * dispatches a logout success action, and sends a POST request to the logout endpoint.
//  * In case of an error, it returns the error response data or a default logout failed message.
//  */
//   // async logout() {
//   //   try {

//   //     sessionStorage.removeItem('token'); // Remove the token from localStorage
//   //     sessionStorage.removeItem('user'); // Remove the user from localStorage

//   //     // Dispatch the logout success action
//   //     APIService.getApiService().dispatch(logoutSuccess());

//   //     APIService.getApiService().post(endPoints.auth.logout);

//   //   } catch (error) {

//   //     return error.response?.data || 'Logout failed';
//   //   }
//   // }


//   /**
//    * This will set the redux state if the user is logged in
//    */
  
// /**
//  * Initializes authentication state from session storage.
//  *
//  * This method retrieves the authentication token and user data
//  * from session storage. If both are available, it dispatches a
//  * login success action with the retrieved token and user data
//  * to update the Redux state accordingly.
//  */
// //   initAuth() {
// //     const token = sessionStorage.getItem('token');
// //     const user = sessionStorage.getItem('user');

// //     if (token && user) {
// //       APIService.getApiService().dispatch(loginSuccess({ token, user: JSON.parse(user) }));
// //     }
// //   }

//   /**
//    * Checks if the user is authenticated.
//    *
//    * This method retrieves the authentication token from session storage
//    * and returns true if the token exists, otherwise false.
//    *
//    * @returns {boolean} True if the user is authenticated, false otherwise
//    */

//    isAuthenticated() {
//     const token = sessionStorage.getItem('token');
//     return !!token; // Return true if the token exists
//   }

//   /**
//    * Retrieves the authentication token from session storage.
//    *
//    * @returns {string | null} The authentication token if it exists, null otherwise.
//    */
//    getToken() {
//     return sessionStorage.getItem('token');
//   }

//   /**
//    * Retrieves the user data object from session storage.
//    *
//    * This method retrieves the user data object from session storage
//    * and returns it as a parsed JSON object. If no user data exists,
//    * it returns null.
//    *
//    * @returns {Object | null} The user data object if it exists, null otherwise
//    */
//   getUserData() {
//     const user = sessionStorage.getItem('user');
//     return user ? JSON.parse(user) : null; // Parse the user object
//   }

//   /**
//    * Sets the authentication state with the given data and redirects to the given URL
//    * if provided.
//    *
//    * This method sets the authentication token and user data to session storage and
//    * dispatches a login success action with the provided data. If a redirect URL is
//    * provided, it navigates to that URL after setting the authentication state.
//    *
//    * @param {Object} data - The data object containing the authentication token and user data.
//    * @param {string} [redirect] - The URL to redirect to after setting the authentication state.
//    * @private
//    */
//   _setData(data, redirect = "/") {

//      // Set the token to the session storage
//      sessionStorage.setItem('access_token', data.token);
//      sessionStorage.setItem('user', JSON.stringify(data.user));

//      // Dispatch the login success action
//     //  APIService.getApiService().dispatch(loginSuccess(data));

//      if (redirect) {
//        APIService.getApiService().navigate(redirect);
//      }

//   }

// }


// const tagServiceObj = new tagServiceClass();

// export default tagServiceObj; // Export as a singleton instance


