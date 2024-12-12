import React from "react";
import PropTypes from 'prop-types';

/**
 * GenericForm component to render a reusable form with dynamic fields.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.title - The title displayed at the top of the form.
 * @param {Array} props.fields - Array of field objects to dynamically render input fields.
 * @param {Object[]} props.fields[] - Each field object contains configuration for an input field.
 * @param {string} props.fields[].type - The type of the input field (e.g., "text", "email", "password").
 * @param {string} props.fields[].value - The current value of the input field.
 * @param {function} props.fields[].onChange - Callback function called when the input value changes.
 * @param {string} props.fields[].placeholder - Placeholder text displayed in the input field.
 * @param {boolean} [props.fields[].required=false] - Specifies whether the field is required (default is false).
 * @param {string} [props.fields[].icon] - SVG path data for an optional icon displayed inside the input field.
 * @param {function} props.onSubmit - Callback function triggered when the form is submitted.
 * @param {string} props.buttonText - Text displayed on the submit button.
 *
 * @returns {JSX.Element} The rendered form component.
 */
const GenericForm = ({ title, fields, onSubmit, buttonText }) => {
  return (
    <div className="card">
      <div className="card2">
        <form className="form" onSubmit={onSubmit}>
          <p id="heading">{title}</p>
          {/* Render form fields dynamically */}
          {fields.map((field, index) => (
            <div className="field" key={index}>
              {field.icon && (
                <svg
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  height="16"
                  width="16"
                  xmlns="http://www.w3.org/2000/svg"
                  className="input-icon"
                >
                  <path d={field.icon} />
                </svg>
              )}
              <input
                type={field.type}
                className="input-field"
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
                placeholder={field.placeholder}
                required={field.required}
              />
            </div>
          ))}
          {/* Submit Button */}
          <div className="btn">
            <button type="submit" className="button1">
              {buttonText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

GenericForm.propTypes = {
  title: PropTypes.string.isRequired, // Form title
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string.isRequired, // Input type (e.g., text, email, password)
      placeholder: PropTypes.string.isRequired, // Input placeholder
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired, // Input value
      onChange: PropTypes.func.isRequired, // Handler for value change
      required: PropTypes.bool, // Whether the field is required
      icon: PropTypes.string, // SVG path for the input icon
    })
  ).isRequired, // Array of field objects
  onSubmit: PropTypes.func.isRequired, // Submit handler
  buttonText: PropTypes.string.isRequired, // Text for the submit button
};

export default GenericForm;
