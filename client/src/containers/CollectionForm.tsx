import React, { EventHandler, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import FormField from '../components/FormInput';
import StatusRadio from '../components/StatusRadio';

interface CollectionFormProps {
  props: RouteComponentProps;
  submitHandler: EventHandler<any>;
  initialState: any;
}

export function CollectionForm({ initialState, submitHandler, ...props }: any) {
  const [formValues, setFormValues] = useState(initialState);

  function handleSubmit(e: any) {
    e.preventDefault();
    const { name, description, image, isPrivate } = formValues;
    // The FormData type is why we later use the 'multer' library
    const imageData = new FormData();
    imageData.append('image', image);
    submitHandler({ name, description, isPrivate, imageData }, props.history);
    setFormValues({ name: '', description: '', image: '', isPrivate: false });
  }

  function handleChange(e: any) {
    setFormValues((formValues: any) => ({
      ...formValues,
      [e.target.name]: e.target.value
    }));
  }

  function handleImageChange(e: any) {
    setFormValues((formValues: any) => ({
      ...formValues,
      image: e.target.files[0]
    }));
  }

  function handleStatusChange(status: boolean) : void {
    setFormValues((formValues: any) => ({
      ...formValues,
      isPrivate: status
    }));
  }

  return (
    <form data-test="CollectionFormComponent" className="ui form CollectionForm" onSubmit={handleSubmit}>
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
