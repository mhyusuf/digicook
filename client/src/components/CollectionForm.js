import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

import FormField from './FormField';

function CollectionForm({ initialState, submitHandler, history }) {
  const [formValues, setFormValues] = useState(initialState);

  function handleSubmit(e) {
    e.preventDefault();
    const { name, description, image } = formValues;
    const imageData = new FormData();
    imageData.append('image', image);
    submitHandler({ name, description, imageData }, history);
    setFormValues({ name: '', description: '', image: '' });
  }

  function handleChange(e) {
    setFormValues((formValues) => ({
      ...formValues,
      [e.target.name]: e.target.value
    }));
  }

  function handleImageChange(e) {
    setFormValues((formValues) => ({
      ...formValues,
      image: e.target.files[0]
    }));
  }

  return (
    <form className="ui form" onSubmit={handleSubmit}>
      <FormField
        label="Collection name"
        name="name"
        type="text"
        value={formValues.name}
        onChange={handleChange}
      />
      <FormField
        label="Description"
        name="description"
        type="textarea"
        value={formValues.description}
        onChange={handleChange}
      />
      <FormField
        label="Upload Image"
        name="image"
        type="file"
        onChange={handleImageChange}
      />
      <button className="ui submit button">Submit</button>
    </form>
  );
}

export default withRouter(CollectionForm);
