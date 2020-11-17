import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

import FormField from '../components/FormField';
import StatusRadio from '../components/StatusRadio';

function CollectionForm({ initialState, submitHandler, history }) {
  const [formValues, setFormValues] = useState(initialState);

  function handleSubmit(e) {
    e.preventDefault();
    const { name, description, image, isPrivate } = formValues;
    const imageData = new FormData();
    imageData.append('image', image);
    submitHandler({ name, description, isPrivate, imageData }, history);
    setFormValues({ name: '', description: '', image: '', isPrivate: false });
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

  function handleStatusChange(status) {
    setFormValues((formValues) => ({
      ...formValues,
      isPrivate: status
    }));
  }

  return (
    <form className="ui form CollectionForm" onSubmit={handleSubmit}>
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
      <StatusRadio
        value={formValues.isPrivate}
        onStatusChange={handleStatusChange}
      />
      <button className="ui submit button">Submit</button>
    </form>
  );
}

export default withRouter(CollectionForm);
