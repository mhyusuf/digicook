import React, { FunctionComponent, useState } from 'react';

import FormField from '../components/FormInput';
import StatusRadio from '../components/StatusRadio';
import { ICollectionValues } from '../interfaces/inputs';
import { History } from 'history';
import { useHistory } from 'react-router-dom';

interface CollectionFormProps {
  submitHandler: (updates: ICollectionValues, history: History<any>) => void;
  initialState: ICollectionValues;
}

export const CollectionForm: FunctionComponent<CollectionFormProps> = (props) => {
  const { initialState, submitHandler} = props;
  const history = useHistory();
  const [formValues, setFormValues] = useState(initialState);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const { name, description, image, isPrivate } = formValues;
    // The FormData type is why we later use the 'multer' library
    const imageData = new FormData();
    imageData.append('image', image);
    submitHandler({ name, description, isPrivate, imageData }, history);
    setFormValues({ name: '', description: '', image: '', isPrivate: false });
  }


  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormValues((formValues: ICollectionValues) => ({
      ...formValues,
      [e.target.name]: e.target.value
    }));
  }

  
  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {

    setFormValues((formValues: ICollectionValues) => ({
      ...formValues,
      image: e.target.files && e.target.files[0]
    }));
  }

  function handleStatusChange(status: boolean) : void {
    setFormValues((formValues: ICollectionValues) => ({
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

export default CollectionForm;
