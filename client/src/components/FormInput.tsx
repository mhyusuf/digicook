import React, { ChangeEventHandler } from 'react';
import { RouteComponentProps } from 'react-router-dom';

interface FormInputProps extends RouteComponentProps {
  label: string;
  name: string;
  type: string;
  onChange: ChangeEventHandler<any>;
  value: string;
  children: JSX.Element[];
}

function FormInput(props: FormInputProps) {
  const { label, name, type, onChange, value, children } = props;

  function renderInput() {
    switch (type) {
      case 'textarea':
        return (
          <textarea data-test="FormFieldInput textarea" name={name} rows={2} value={value} onChange={onChange} />
        );
      case 'select':
        return (
          <select data-test="FormFieldInput select" name={name} value={value} onChange={onChange}>
            {children}
          </select>
        );
      default:
        return (
          <input
            data-test="FormFieldInput default"
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
    <div data-test="FormFieldComponent" className="field">
      <label htmlFor={name}>{label}</label>
      {renderInput()}
    </div>
  );
}

export default FormInput;
