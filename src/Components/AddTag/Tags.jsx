import React, { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
// import {toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../Styles/FormStyles.css";
import apiInstance from "../../Services/API/MyApi";
import GenericForm from "../Form/GenericForm";
import Loading from "../Loading/Loading";
import { Link } from "react-router-dom";
import { FaTrash, FaEdit } from "react-icons/fa";

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

  // Fetch tags when the component mounts or when the `refresh` state changes
  useEffect(() => {
    const fetchTags = async () => {
      setLoading(true);
      try {
        const result = await apiInstance.GetAllApi(GetAllTags);
        console.log("Fetched Tags:", result);
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
   * Handle the form submission.
   *
   * Sends the tag data to the API to create a new tag and resets the form fields.
   * Displays a loading indicator while the API call is in progress.
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
   * Fields for the GenericForm component.
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
  //   const handleDelete=async(tagId)=>{
  //     apiInstance.DeleteApi(DeleteTagApi,tagId)

  //  }
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
              <GenericForm
                title="Add new tag"
                fields={fields}
                onSubmit={handleSubmit}
                buttonText="Create tag"
              />
            </div>
          </div>
          {/* table container */}
          <div className="col-md-6 pt-4 d-flex justify-content-center align-items-center">
            <div className="TableCss">
              <div className="table-container">
                <table className="table table-hover table-dark">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Tag Name</th>
                      <th scope="col">Display Name</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
  {tags.length > 0 ? (
    tags.map((tag, index) => (
      <tr key={tag.id}>
        <th scope="row" className="align-middle">
          {index + 1}
        </th>
        <td className="align-middle">{tag.name}</td>
        <td className="align-middle">{tag.displayName}</td>
        <td className="align-middle">
          <div className="d-inline-flex gap-2">
            {/* Update Icon */}
            <Link
              to={`/update/${tag.name}`}
              className="btn btn-sm btn-dark update-btn"
            >
              <FaEdit /> {/* Edit icon */}
            </Link>
            {/* Delete Icon */}
            <Link
              onClick={() => handleDelete(tag.id)}
              className="btn btn-sm btn-dark delete-btn"
            >
              <FaTrash /> {/* Trash icon */}
            </Link>
          </div>
        </td>
      </tr>
    ))
  ) : (
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
    </>
  );
}

export default Tags;
