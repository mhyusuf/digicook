import React, { FunctionComponent, useState } from 'react';

import FormField from '../components/FormInput';
import StatusRadio from '../components/StatusRadio';
import { CollectionValues } from '../interfaces/inputs';
import { CollectionFormState } from '../interfaces/forms';

interface CollectionFormProps {
  submitHandler: (updates: CollectionValues) => void;
  initialState: CollectionFormState;
}

export const CollectionForm: FunctionComponent<CollectionFormProps> = (
  props,
) => {
  const { initialState, submitHandler } = props;
  const [formValues, setFormValues] = useState(initialState);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const { name, description, image, isPrivate } = formValues;
    const imageData = new FormData();
    imageData.append('image', image);
    submitHandler({ name, description, isPrivate, imageData });
    setFormValues({ name: '', description: '', image: '', isPrivate: false });
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormValues((formValues) => ({
      ...formValues,
      [e.target.name]: e.target.value,
    }));
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormValues((formValues) => ({
      ...formValues,
      image: e.target.files && e.target.files[0],
    }));
  }

  function handleStatusChange(status: boolean): void {
    setFormValues((formValues) => ({
      ...formValues,
      isPrivate: status,
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
};

export default CollectionForm;
