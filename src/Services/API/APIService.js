// import axios from 'axios';
// import AuthService from '../Tag/AuthService';

// let localRoutes = {
//   auth: '/login',
// }
// /**
//  * The APIService class is a singleton class that provides an Axios instance
//  * with a base URL and default headers. It also provides functions for
//  * navigation, Redux dispatch, and interceptor status.
//  */
// class APIService {
// /**
//  * Initializes a new instance of the APIService class.
//  * Sets up an Axios instance with a base URL and default headers.
//  * Initializes properties for navigation, Redux dispatch, and interceptor status.
//  */
//   constructor() {
//     this.api = axios.create({
//       // @ts-ignore
//       baseURL: import.meta.env.VITE_API_URL,
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       withCredentials: true, // Enable this for Laravel Sanctum cookies
//     });

//     this.navigate = null; // Navigation function
//     this.dipatch = null; // Redux dispatch function
//     this.interceptorsAlreadyInitialized = false;

//   }

//   // Function to set up Axios interceptors
  
//   /**
//    * Sets up Axios interceptors for request and response handling.
//    * 
//    * This method initializes request and response interceptors for the Axios instance.
//    * It adds an authorization token to request headers if available, and handles
//    * unauthorized access or token expiry in response handling by potentially redirecting
//    * to the login page.
//    * 
//    * @param {function} navigate - A function to navigate to different routes.
//    * @param {function} dispatch - A Redux dispatch function for dispatching actions.
//    */
//   setupInterceptors(navigate, dispatch) {

//     if (this.interceptorsAlreadyInitialized) return

//     this.navigate = navigate;
//     this.dispatch = dispatch;

//     // Request Interceptor - Adds Authorization token to headers
//     this.api.interceptors.request.use(
//       (config) => {

//         const token = AuthService.getToken();

//         if (token) {
//           config.headers['Authorization'] = `Bearer ${token}`;
//         }

//         return config;
//       },
//       (error) => {
//         return Promise.reject(error);
//       }
//     );

//     // Response Interceptor - Handles token expiry or unauthorized access
//     this.api.interceptors.response.use(
//       (response) => response,
//       (error) => {
//         // if (error.response && error.response.status === 401) {
//         //   sessionStorage.removeItem('access_token'); // Remove invalid token
//         //   navigate(localRoutes.auth); // Redirect to login on unauthorized
//         // }
//         return Promise.reject(error);
//       }
//     );
//   }

//   // Singleton instance function
  
//   /**
//    * Returns the singleton instance of the APIService class.
//    * If the instance doesn't already exist, it will be created first.
//    * @returns {APIService} The singleton instance of the APIService class
//    */
//   static APIService() {
//     if (!this.instance) {
//       this.instance = new APIService();
//     }
//     return this.instance;
//   }

//  /**
//  * Returns the error message from the error object, or a default message if the error object does not contain a message.
//  * @param {Object} error - The error object
//  * @param {string} [error.message] - The error message from the error object
//  * @param {object} [error.response] - The response object from the error
//  * @param {object} [error.response.data] - The data object from the response
//  * @param {string} [error.response.data.message] - The error message from the data object
//  * @param {string} [error.response.data.error] - The error message from the data object
//  * @param {string} [defaultMsg='An error occurred'] - The default message to return if no error message is found
//  * @returns {any} The error message
//  */
//   static getErrorMessage(error, defaultMsg = 'An error occurred') {
//     if (error.response) {
//       return error.response.data?.message || error.response.data?.error || error.response.data || defaultMsg;
//     }
//     return error.message;
//   }

//   // GET request with an AbortController
  
//   /**
//    * Performs a GET request to the given URL with the given parameters.
//    * @param {string} url - The URL to request
//    * @param {Object} [params={}] - The request parameters
//    * @param {AbortController} [abortController=null] - The AbortController to use to cancel the request
//    * @returns {Promise} The Promise of the request
//    */
//   async get(url, params = {}, abortController = null) {
//     const config = { params };
//     if (abortController) {
//       config.signal = abortController.signal; // Attach the abort controller's signal to the request
//     }
//     return this.api.get(url, config);
//   }

//   // POST request
  
//   /**
//    * Performs a POST request to the given URL with the given data.
//    * @param {string} url - The URL to send the request to.
//    * @param {Object} data - The data to be sent as the request body.
//    * @param {AbortController} [abortController=null] - The AbortController to use to cancel the request.
//    * @param {import('axios').AxiosRequestConfig<any>} [iconfig={}] - Additional configuration options for the request.
//    * @returns {Promise} The Promise of the request.
//    */
//   async post(url, data, abortController = null, iconfig = {}) {
//     const config = {};
//     if (abortController) {
//       config.signal = abortController.signal;
//     }

//     //join the congif object with the passed config object
//     Object.assign(config, iconfig);

//     return this.api.post(url, data, config);
//   }

//   // PUT request
  
//   /**
//    * Performs a PUT request to the given URL with the given data.
//    * @param {string} url - The URL to send the request to.
//    * @param {Object} data - The data to be sent as the request body.
//    * @param {AbortController} [abortController=null] - The AbortController to use to cancel the request.
//    * @returns {Promise} The Promise of the request.
//    */
//   async put(url, data, abortController = null) {
//     const config = {};
//     if (abortController) {
//       config.signal = abortController.signal;
//     }
//     return this.api.put(url, data, config);
//   }

//   // DELETE request
  
//   /**
//    * Performs a DELETE request to the given URL.
//    * @param {string} url - The URL to send the request to.
//    * @param {AbortController} [abortController=null] - The AbortController to use to cancel the request.
//    * @returns {Promise} The Promise of the request.
//    */
//   async delete(url, abortController = null) {
//     const config = {};
//     if (abortController) {
//       config.signal = abortController.signal;
//     }
//     return this.api.delete(url, config);
//   }
// } 

// export default APIService;
