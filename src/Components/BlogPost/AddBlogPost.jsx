import React, { useState, useEffect } from "react";
import apiInstance from "../../Services/API/MyApi";
import { ToastContainer } from "react-toastify";
import "froala-editor/js/froala_editor.pkgd.min.js";
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/plugins/code_view.min.css";
import "froala-editor/css/plugins/colors.min.css";
import "froala-editor/css/plugins/image.min.css";
import "froala-editor/js/plugins/image.min.js";
import "froala-editor/css/plugins/image.min.css";
import FroalaEditor from "react-froala-wysiwyg";

function AddBlogPost() {
  const initialFormData = {
    heading: "",
    pageTitle: "",
    content: "",
    shortDescription: "",
    date: new Date().toISOString().split("T")[0],
    author: "",
    urlHandle: "",
    featuredImageUrl: "",
    visible: true,
    selectedTags: [], // Array to hold selected tag IDs
  };
  const [formData, setFormData] = useState(initialFormData);
  const [selectedTags, setSelectedTags] = useState([]); // Array to hold available tags
  const [loading, setLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [imgSrc, setImgSrc] = useState("");
  const GetAllTags = import.meta.env.VITE_API_GETALL_TAGS_URL;
  const CreateBlogApi = import.meta.env.VITE_API_CREATE_BLOG_POST_URL;

  // Fetch tags on component mount
  useEffect(() => {
    setLoading(true);
    const fetchTags = async () => {
      try {
        const result = await apiInstance.GetAllApi(GetAllTags);
        setSelectedTags(result);
      } catch (ex) {
        console.error("error fetching tags", ex);
      } finally {
        setLoading(false);
      }
    };
    fetchTags();
  },[]);

  // Update content with FroalaEditor
  const handleModelChange = (model) => {
    setFormData((prev) => ({ ...prev, content: model }));
  };

  // Handle file upload for featured image
  const uploadFeaturedImage = async (e) => {
    setLoading(true);
    try {
      const Data = new FormData();
      Data.append("img", e.target.files[0]);
      const result = await fetch(import.meta.env.VITE_API_UPLOAD_IMAGE_URL, {
        method: "POST",
        headers: {
          Accept: "*/*",
        },
        body: Data,
      });
      const response = await result.json();
      setFormData((prev) => ({ ...prev, featuredImageUrl: response.linkedList }));
      setImgSrc(response.linkedList);
    } catch (er) {
      console.error(er);
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setButtonLoading(true);
      await apiInstance.PostApi(CreateBlogApi, formData);

      return;
    } catch (e) {
      console.error("Error during submission:", e);
      alert("Something went wrong. Please try again.");
    } finally {
      setFormData(initialFormData)
      setImgSrc("")
      setFormData((prev) => ({ ...prev, featuredImageUrl:"" }));
      setButtonLoading(false);
    }
  };

  // Handle input changes for other form fields
  const handleChange = (e) => {
    const target = e.target;
    const name = target.name;
    let value;
    if (target.type === "checkbox") {
      value = target.checked;
    } else {
      value = target.value;
    }

    setFormData((prevFormData) => {
      const updatedFormData = { ...prevFormData };
      updatedFormData[name] = value;
      return updatedFormData;
    });
  };

  // Handle tag selection changes
  const handleTagChange = (e) => {
    const selectedOptions = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );

    setFormData((prev) => ({
      ...prev,
      selectedTags: [...new Set([...prev.selectedTags, ...selectedOptions])], // Avoid duplicates
    }));
  };
  return (
    <>
      <ToastContainer />
      <div className="bg-secondary bg-opacity-10 py-2">
        <div className="container d-sm-inline-flex justify-content-start">
          <h1>Add New Blog Post - Admin Functionality</h1>
        </div>
      </div>
      <div className="container py-5">
        <form onSubmit={handleSubmit} method="post">
          <div className="mb-3">
            <label className="form-label">Heading</label>
            <input
              type="text"
              name="heading"
              value={formData.heading}
              onChange={handleChange}
              className="form-control text-black"
              id="heading"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Page Title</label>
            <input
              type="text"
              name="pageTitle"
              value={formData.pageTitle}
              onChange={handleChange}
              className="form-control"
              id="pageTitle"
            />
          </div>
          <div className="form-group">
            <label htmlFor="content">Content</label>
            <FroalaEditor
              tag="textarea"
              id="content"
              config={{
                placeholderText: "Edit Your Content Here!",
                charCounterCount: true,
              }}
              model={formData.content}
              onModelChange={handleModelChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Short Description</label>
            <input
              type="text"
              value={formData.shortDescription}
              onChange={handleChange}
              className="form-control"
              id="shortDescription"
              name="shortDescription"
            />
          </div>

          {loading ? (
            <div className="d-flex justify-content-center">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <div className="mb-3">
              <label className="form-label">Featured Image Upload</label>
              <input
                type="file"
                onChange={uploadFeaturedImage}
                className="form-control"
                id="featuredImageUpload"
              />
              <img
                className="pt-3"
                src={imgSrc}
                style={{ width: "300px" }}
                id="featuredImageDisplay"
              />
            </div>
          )}

          <div className="mb-3">
            <label className="form-label">Featured Image URL</label>
            <input
              type="text"
              onChange={handleChange}
              value={formData.featuredImageUrl}
              readOnly
              name="featuredImageUrl"
              className="form-control"
              id="featuredImageUrl"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">URL Handle</label>
            <input
              type="text"
              onChange={handleChange}
              name="urlHandle"
              value={formData.urlHandle}
              className="form-control"
              id="urlHandle"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Published Date</label>
            {/*ERROR IN CHANGING THE DATE*/}
            <input
              type="date"
              value={formData.date}
              onChange={handleChange}
              className="form-control"
              id="publishedDate"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Author</label>
            <input
              type="text"
              value={formData.author}
              onChange={handleChange}
              name="author"
              className="form-control"
              id="author"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Tags</label>
            <select
              multiple
              value={formData.selectedTags}
              onChange={handleTagChange}
              className="form-select"
              aria-label="Multiple select tags"
            >
              {selectedTags.map((tag) => (
                <option key={tag.id} value={tag.id}>
                  {tag.name} {/* Adjust to match your tag's property */}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              checked={formData.visible}
              onChange={handleChange}
              name="visible"
              id="visible"
            />
            <label className="form-check-label" htmlFor="visible">
              Visible
            </label>
          </div>

          <div className="mb-3">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={buttonLoading}
            >
              {buttonLoading ? (
                <span className="spinner-border spinner-border-sm" />
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddBlogPost;
