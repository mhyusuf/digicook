import React, { FunctionComponent, useState } from 'react';
import { withRouter, match, RouteComponentProps } from 'react-router-dom';

import { RecipeValues } from '../interfaces/inputs';
import FormField from '../components/FormInput';
import IngredientField from '../components/IngredientField';
import { CATEGORY_OPTIONS } from '../categoryOptions';
import { RecipeFormState } from '../interfaces/forms';

interface Params {
  id: string;
}

interface RecipeFormProps extends RouteComponentProps {
  initialState: RecipeFormState;
  submitHandler: (values: RecipeValues) => void;
  match: match<Params>;
}

const RecipeForm: FunctionComponent<RecipeFormProps> = (props) => {
  const { initialState, submitHandler, match } = props;
  const [formValues, setFormValues] = useState(initialState);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const { name, category, image, ingredients, instructions } = formValues;
    const imageData = new FormData();
    imageData.append('image', image);
    submitHandler({
      name,
      category,
      imageData,
      ingredients,
      instructions,
      collection: match.params.id,
    });
    setFormValues({
      name: '',
      category: '',
      image: '',
      ingredients: [{ name: '', quantity: '' }],
      instructions: '',
    });
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

  function addIngredientField(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setFormValues((formValues) => ({
      ...formValues,
      ingredients: [...formValues.ingredients, { name: '', quantity: '' }],
    }));
  }

  function handleIngredientChange(e: React.ChangeEvent<HTMLInputElement>) {
    const idx = e.target.dataset.idx;
    const updatedIngredients = formValues.ingredients.map((ingredient, i) => {
      if (idx && +idx === i) {
        return { ...ingredient, [e.target.name]: e.target.value };
      }
      return ingredient;
    });
    setFormValues({ ...formValues, ingredients: updatedIngredients });
  }

  function removeIngredientField(idx: number) {
    const updatedIngredients = formValues.ingredients.filter(
      (ingredient, i) => {
        return i !== idx;
      },
    );
    setFormValues({ ...formValues, ingredients: updatedIngredients });
  }

  return (
    <div className="ui attached segment RecipeForm">
      <form className="ui form" onSubmit={handleSubmit}>
        <FormField
          label="Recipe name"
          name="name"
          type="text"
          value={formValues.name}
          onChange={handleChange}
        />
        <FormField
          label="Category"
          name="category"
          type="select"
          value={formValues.category}
          onChange={handleChange}
        >
          <option value=""></option>
          {CATEGORY_OPTIONS.map((category) => {
            return (
              <option key={category} value={category}>
                {category}
              </option>
            );
          })}
        </FormField>
        {formValues.ingredients &&
          formValues.ingredients.map((ingredient, i) => {
            return formValues.ingredients ? (
              <IngredientField
                key={i}
                idx={i}
                onChange={handleIngredientChange}
                value={formValues.ingredients[i]}
                onRemove={removeIngredientField}
              />
            ) : (
              <div />
            );
          })}
        <button className="ui button" onClick={addIngredientField}>
          Add ingredient
        </button>
        <FormField
          label="Instructions"
          name="instructions"
          type="textarea"
          onChange={handleChange}
          value={formValues.instructions}
        />
        <FormField
          label="Upload Image"
          name="image"
          type="file"
          onChange={handleImageChange}
        />
        <button className="ui submit button">Submit</button>
      </form>
    </div>
  );
};

export default withRouter(RecipeForm);
