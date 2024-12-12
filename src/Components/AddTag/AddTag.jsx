import React, { useState } from "react";
import {ToastContainer } from "react-toastify";
// import {toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../Styles/FormStyles.css"
import apiInstance from "../../Services/API/MyApi";

function AddTag() {
  const [tagName, setTagName] = useState("");
  const [tagDisplayName, setTagDisplayName] = useState("");

  const AddTagApi = import.meta.env.VITE_API_CREATE_TAG_URL;

  const handleSubmit = async(e)=>{
    e.preventDefault()
    apiInstance.PostApi(AddTagApi,{
         name: tagName,
        displayName: tagDisplayName,
       })
      setTagName("");
      setTagDisplayName("");
      }

  return (
  <>
    <ToastContainer />
   <div className="container">
      <div className="col-md-4 pt-4">
    <div className="card">
    <div className="card2">
      <form className="form" onSubmit={handleSubmit}>
        <p id="heading">Add a New Tag</p>
        {/* Tag Name Field */}
        <div className="field">
          <svg
            viewBox="0 0 16 16"
            fill="currentColor"
            height="16"
            width="16"
            xmlns="http://www.w3.org/2000/svg"
            className="input-icon"
          >
            <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zM3 9v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9H3z" />
          </svg>
          <input
            type="text"
            className="input-field"
            value={tagName}
            onChange={(e) => setTagName(e.target.value)}
            placeholder="Enter tag name"
            required
          />
        </div>
        {/* Tag Display Name Field */}
        <div className="field">
          <svg
            viewBox="0 0 16 16"
            fill="currentColor"
            height="16"
            width="16"
            xmlns="http://www.w3.org/2000/svg"
            className="input-icon"
          >
            <path d="M2 3h12v2H2zM2 7h12v2H2zM2 11h12v2H2z" />
          </svg>
          <input
            type="text"
            className="input-field"
            value={tagDisplayName}
            onChange={(e) => setTagDisplayName(e.target.value)}
            placeholder="Enter display name"
            required
          />
        </div>
        {/* Submit Button */}
        <div className="btn">
          <button type="submit" className="button1">
            Add Tag
          </button>
        </div>
      </form>
    </div>
  </div>
  </div>
  </div>
  </>
);
}


export default AddTag;
