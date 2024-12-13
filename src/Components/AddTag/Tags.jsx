import React, { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../Styles/FormStyles.css";
import apiInstance from "../../Services/API/MyApi";
import GenericForm from "../Form/GenericForm";
import Loading from "../Loading/Loading";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";

/**
 * Tags Component
 *
 * This component allows users to create new tags by submitting a form.
 * It uses a reusable `GenericForm` component for dynamic form rendering.
 * When the form is submitted, an API call is made to create the new tag.
 */
function Tags() {
  // API URL for Deleting tag (loaded from environment variables)
  const DeleteTagApi = import.meta.env.VITE_API_DELETE_TAG_URL;

  // API URL for creating tags (loaded from environment variables)
  const AddTagApi = import.meta.env.VITE_API_CREATE_TAG_URL;

  // API URL for getting all tags (loaded from environment variables)
  const GetAllTags = import.meta.env.VITE_API_GETALL_TAGS_URL;

  // API URL for updating a tag (loaded from environment variables)
  const UpdateTagApi = import.meta.env.VITE_API_UPDATE_TAG_URL;

  // API URL for Finding a tag (loaded from environment variables)
  const FindTagApi = import.meta.env.VITE_API_FIND_TAG_URL;

  // State to store the name of the tag
  const [tagName, setTagName] = useState("");

  // State to store the display name of the tag
  const [tagDisplayName, setTagDisplayName] = useState("");

  // Trigger useEffect when toggled
  const [refresh, setRefresh] = useState(false);

  // State to manage the loading indicator
  const [loading, setLoading] = useState(false);

  // State to store fetched tags
  const [tags, setTags] = useState([]);

  // State to store closing and opening of modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // state to store the fetched tag from the database for updation
  const [currentTag, setCurrentTag] = useState(null);

  /**
   * Fetch tags from the API when the component mounts or when the `refresh` state changes.
   */
  useEffect(() => {
    const fetchTags = async () => {
      setLoading(true);
      try {
        const result = await apiInstance.GetAllApi(GetAllTags);
        setTags(result);
      } catch (error) {
        console.error("Error fetching tags:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTags();
  }, [refresh]);

  /**
   * Handle opening the modal to update a tag.
   *
   * Fetches the details of the tag by ID and sets the current tag to be edited.
   *
   * @param {number} id - The ID of the tag to update.
   */
  const handleOpenModal = async (id) => {
    try {
      const result = await apiInstance.GetByIdApi(FindTagApi, id);
      const mappedTag = {
        id: result.id,
        name: result.name,
        displayName: result.displayName,
      };
      await setCurrentTag(mappedTag); // Ensure this is setting the current tag correctly
      console.log("mapped tag:", mappedTag); // You already have this log
      setIsModalOpen(true); // Ensure the modal is open after fetching the tag
    } catch (error) {
      console.error("Error fetching tag details:", error);
    }
  };

  /**
   * Updates the `currentTag` when it changes.
   */
  useEffect(() => {
    if (currentTag) {
      console.log("Updated current tag:", currentTag);
    }
  }, [currentTag]);

  /**
   * Handle the update operation for a tag.
   *
   * Sends the updated tag data to the API to update the tag and refreshes the tags list.
   *
   * @param {Object} updatedTag - The updated tag data.
   */
  const handleUpdate = async (updatedTag) => {
    setLoading(true);
    try {
      await apiInstance.PutApi(UpdateTagApi, updatedTag.id, updatedTag);
      setRefresh((prev) => !prev);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error updating tag:", error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle the form submission to create a new tag.
   *
   * Sends the tag data to the API to create a new tag and resets the form fields.
   *
   * @param {Event} e - The form submit event.
   */
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    setLoading(true); // Show the loading indicator

    // Make the API call to create a new tag
    await apiInstance.PostApi(AddTagApi, {
      name: tagName,
      displayName: tagDisplayName,
    });

    setLoading(false); // Hide the loading indicator

    // Reset the form fields
    setTagName("");
    setTagDisplayName("");
    setRefresh((prev) => !prev);
  };

  /**
   * Fields configuration for the GenericForm component.
   * Each field is configured with its properties like type, value, and onChange handler.
   */
  const fields = [
    {
      icon: "M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zM3 9v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9H3z",
      type: "text",
      value: tagName,
      onChange: setTagName, // Updates the `tagName` state when the input value changes
      placeholder: "Enter tag Name",
      required: true, // Makes this field required
    },
    {
      icon: "M2 3h12v2H2zM2 7h12v2H2zM2 11h12v2H2z",
      type: "text",
      value: tagDisplayName,
      onChange: setTagDisplayName, // Updates the `tagDisplayName` state when the input value changes
      placeholder: "Enter Display Name",
      required: true, // Makes this field required
    },
  ];

  /**
   * Handle the delete operation for a tag.
   *
   * Sends a request to the API to delete the tag and refreshes the tags list.
   *
   * @param {number} id - The ID of the tag to delete.
   */
  async function handleDelete(id) {
    setLoading(true);
    try {
      await apiInstance.DeleteApi(DeleteTagApi, id);
      // Additional logic, e.g., refreshing the list
    } catch (error) {
      console.error("Error in handleDelete:", error);
    }
    setLoading(false);
    setRefresh((prev) => !prev);
  }
  return (
    <>
    {/* Toast notifications for success/error messages */}
    <ToastContainer />
  
    <div className="row">
      {/* Show the Loading component when the `loading` state is true */}
      <div className="col-md-12">{loading && <Loading />}</div>
    </div>
  
    <div className="container">
      <div className="row pt-4">
        {/* Form container */}
        <div className="col-md-6 d-flex justify-content-center align-items-center">
          <div className="p-4 form-container">
            {/* Render the GenericForm component for adding a new tag */}
            <GenericForm
              title="Add new tag"
              fields={fields}  // Fields for the form
              onSubmit={handleSubmit}  // Submit handler
              buttonText="Create tag"  // Button text
            />
          </div>
        </div>
        {/* Table container */}
        <div className="col-md-6 pt-4 d-flex justify-content-center align-items-center">
          <div className="TableCss">
            <div className="table-container">
              <table className="table table-hover table-dark">
                <thead>
                  <tr>
                    {/* Table headers */}
                    <th scope="col">#</th>
                    <th scope="col">Tag Name</th>
                    <th scope="col">Display Name</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tags.length > 0 ? (
                    // Render each tag in the table if tags are available
                    tags.map((tag, index) => (
                      <tr key={tag.id}>
                        <th scope="row" className="align-middle">
                          {index + 1}
                        </th>
                        <td className="align-middle">{tag.name}</td>
                        <td className="align-middle">{tag.displayName}</td>
                        <td className="align-middle">
                          <div className="d-inline-flex gap-2">
                            {/* Button to open modal for updating the tag */}
                            <button
                              onClick={() => {
                                handleOpenModal(tag.id);  // Open modal for editing
                              }}
                              className="btn btn-sm btn-dark update-btn"
                            >
                              <FaEdit />
                            </button>
                            {/* Button to delete the tag */}
                            <button
                              onClick={() => handleDelete(tag.id)}  // Call handleDelete for the tag
                              className="btn btn-sm btn-dark delete-btn"
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    // Display a message when no tags are available
                    <tr>
                      <td colSpan="4" className="text-center">
                        <p className="text-warning">No tags added yet!</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  
    {/* Modal for updating a tag */}
    {isModalOpen && currentTag && (
      <div
        className="modal fade show"
        tabIndex="-1"
        aria-labelledby="modalLabel"
        aria-hidden="true"
        style={{
          display: "block",
          backdropFilter: "blur(5px)",  // Apply blur to the background
          backgroundColor: "rgba(0, 0, 0, 0.5)",  // Darken the background behind the modal
        }}
      >
        <div className="modal-dialog">
          <div className="modal-content" style={{ backgroundColor: "#333" }}> {/* Darken modal content */}
            <div className="modal-header">
              <h5 className="modal-title text-white" id="modalLabel">
                Update Tag
              </h5>
              {/* Close button for the modal */}
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => setIsModalOpen(false)}  // Close the modal
              ></button>
            </div>
            <div className="modal-body">
              {/* Render the GenericForm component for updating a tag */}
              <GenericForm
                title="Update Tag"
                fields={[
                  {
                    icon: "",
                    type: "text",
                    value: currentTag?.name || "",  // Set the current tag's name
                    onChange: (value) =>
                      setCurrentTag((prevState) => ({
                        ...prevState,
                        name: value,  // Update the name field in the current tag
                      })),
                    placeholder: "Enter tag Name",  // Placeholder for name field
                    required: true,  // Make the field required
                  },
                  {
                    icon: "",
                    type: "text",
                    value: currentTag?.displayName || "",  // Set the current tag's display name
                    onChange: (value) =>
                      setCurrentTag((prevState) => ({
                        ...prevState,
                        displayName: value,  // Update the displayName field in the current tag
                      })),
                    placeholder: "Enter Display Name",  // Placeholder for display name field
                    required: true,  // Make the field required
                  },
                ]}
                onSubmit={(e) => {
                  e.preventDefault();  // Prevent form from reloading the page
                  handleUpdate(currentTag);  // Pass the currentTag to handleUpdate
                }}
                buttonText="Update Tag"  // Button text
              />
            </div>
          </div>
        </div>
      </div>
    )}
  </>
  
  );
}

export default Tags;
