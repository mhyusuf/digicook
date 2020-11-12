import React from 'react';

function FormInput(props) {
  return (
    <div className="field">
      <label htmlFor={props.name} >{props.label}</label>
      {props.type === 'textarea'
        ? <textarea rows="2" {...props} />
        : <input id={props.name} {...props} />
      }

    </div>
  );
};

export default FormInput;