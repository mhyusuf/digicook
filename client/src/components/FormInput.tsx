import React, { ChangeEventHandler, FunctionComponent } from 'react';

interface FormInputProps {
  label: string;
  name: string;
  type: string;
  onChange: ChangeEventHandler<HTMLElement>;
  value?: string;
}

const FormInput: FunctionComponent<FormInputProps> = (props) => {
  const { label, name, type, onChange, value, children } = props;

  function renderInput() {
    switch (type) {
      case 'textarea':
        return (
          <textarea name={name} rows={2} value={value} onChange={onChange} />
        );
      case 'select':
        return (
          <select name={name} value={value} onChange={onChange}>
            {children ? children : <div />}
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
};

export default FormInput;
