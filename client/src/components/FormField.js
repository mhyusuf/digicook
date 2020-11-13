import React from 'react';

function FormInput(props) {
  const { label, name, type, onChange, value, children } = props;

  function renderInput() {
    switch (type) {
      case 'textarea':
        return (
          <textarea name={name} rows="2" value={value} onChange={onChange} />
        );
      case 'select':
        return (
          <select name={name} value={value} onChange={onChange}>
            {children}
          </select>
        );
      default:
        return (
          <input
            id={name}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
          />
        );
    }
  }

  return (
    <div className="field">
      <label htmlFor={name}>{label}</label>
      {renderInput()}
    </div>
  );
}

export default FormInput;
