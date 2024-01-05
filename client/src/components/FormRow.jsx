const FormRow = ({ type, name, labelText, defaultValue }) => {
  return (
    <div className="form-row">
      <label htmlFor="{name}" className="form-label">
        {labelText || name}
      </label>
      {/* default value to help testing */}
      <input
        type={type}
        id={name}
        name={name}
        className="form-input"
        defaultValue={defaultValue || ''}
        required
      />
    </div>
  );
};
export default FormRow;
