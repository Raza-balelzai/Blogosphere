import { toast } from "react-toastify";

/**
 * A class for making API requests.
 */
class myApi {
  /**
   * Sends a DELETE request to the specified API URL to delete a resource.
   * 
   * @async
   * @param {string} url - The API endpoint for the DELETE request.
   * @param {number|string} id - The ID of the resource to be deleted.
   * @throws Will display a toast notification for success or failure.
   * @example
   * const api = new myApi();
   * api.DeleteApi("https://api.example.com/tags", 1);
   */
  async DeleteApi(url, id) {
    try {
      const response = await fetch(`${url}/${id}`, { method: "DELETE" });
      const data = await response.json();

      if (response.ok) {
        toast.success(data.message, { autoClose: 2000 });
        console.log("Deleted tag details:", data.tag);
      } else {
        toast.error(data.message, { autoClose: 2000 });
      }
    } catch (error) {
      console.error("Error deleting tag:", error);
      toast.error("An unexpected error occurred.", { autoClose: 2000 });
    }
  }

  /**
   * Sends a POST request to the specified API URL with the provided payload.
   * 
   * @async
   * @param {string} url - The API endpoint to send the POST request to.
   * @param {Object} [payload={}] - The data to be sent in the body of the POST request.
   * @throws Will display a toast notification for success or failure.
   * @example
   * const api = new myApi();
   * api.PostApi("https://api.example.com/tags", { name: "New Tag" });
   */
  async PostApi(url, payload = {}) {
    try {
      // Send a POST request to the API
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        // If the response is successful, parse and show success message
        const result = await response.json();
        toast.success(`${result.name} added successfully.`, {
          position: "top-right",
          autoClose: 3000,
        });
      } else {
        // If there's an error, parse and show the error message
        const errorMessage = await response.json();
        const errorData = Object.entries(errorMessage).map(([key, value]) => `${key}: ${value}`).join(", ");
        toast.error(`Error: ${errorData}`, {
          position: "top-right",
          autoClose: 3000,
        });
        console.error(errorMessage); // Log error for debugging
      }
    } catch (error) {
      // Handle network or other unexpected errors
      toast.error(`Error! ${error.message}`, {
        position: "top-right",
        autoClose: 2000,
      });
    }
  }

  /**
   * Fetches all items from the given API URL.
   * 
   * @async
   * @param {string} url - The endpoint to fetch data from.
   * @returns {Promise<any>} - A promise resolving to the fetched data.
   * @throws Will display a toast notification if the fetch fails.
   * @example
   * const api = new myApi();
   * const tags = await api.GetAllApi("https://api.example.com/tags");
   */
  async GetAllApi(url) {
    try {
      const response = await fetch(url, {
        method: "GET", // HTTP method
        headers: {
          "Content-Type": "application/json", // Set headers to expect JSON
        },
      });

      // Check if the response is successful
      if (!response.ok) {
        toast.error(`Sorry! Unable to fetch tags. Error! ${response.status}`, {
          position: "top-right",
          autoClose: 2000,
        });
      }

      // Parse and return the JSON data
      return await response.json();
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Error fetching data:", {
        position: "top-right",
        autoClose: 2000,
      });
      throw error; // Rethrow the error to handle it in the caller function
    }
  }
}

const apiInstance = new myApi();
export default apiInstance;
