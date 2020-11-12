import React, { useState } from 'react';
import { connect } from 'react-redux';

import FormField from './FormField';
import { createCollection } from '../actions';

function CollectionCreate({ createCollection }) {
  const [formValues, setFormValues] = useState({ name: '', description: '', image: '' });

  function handleSubmit(e) {
    e.preventDefault();
    const { name, description, image } = formValues;
    const imageData = new FormData();
    imageData.append('image', image);
    createCollection({ name, description, imageData });
  };

  function handleChange (e) {
    setFormValues(formValues => ({ ...formValues, [e.target.name] : e.target.value }));
  };

  function handleImageChange (e) {
    setFormValues(formValues => ({ ...formValues, image: e.target.files[0] }))
  }

  return (
    <>
      <h3 className="ui top attached header">Create collection</h3>
      <div className="ui attached segment">
        <form className="ui form" onSubmit={handleSubmit}>
          <FormField label="Collection name" name="name" type="text" value={formValues.name} onChange={handleChange}/>
          <FormField label="Description" name="description" type="textarea" value={formValues.description} onChange={handleChange}/>
          <FormField label="Upload Image" name="image" type="file" onChange={handleImageChange}/>
        <button className="ui submit button">Submit</button>
        </form>
      </div>
    </>
  );
}

export default connect(null, { createCollection })(CollectionCreate);