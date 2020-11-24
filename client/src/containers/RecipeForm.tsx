import React, { FunctionComponent, useState } from 'react';
import { withRouter, match, RouteComponentProps } from 'react-router-dom';

import FormField from '../components/FormInput';
import IngredientField from '../components/IngredientField';
import { CATEGORY_OPTIONS } from '../categoryOptions';


interface MatchInterface {
  collectionId: string;
  recipeId: string;
}

interface RecipeFormProps extends RouteComponentProps {
  initialState: any;
  submitHandler: any;
  match: match<MatchInterface>
}

const RecipeForm: FunctionComponent<RecipeFormProps> = (props) => {
  const { initialState, submitHandler, match, history } = props;
  const [formValues, setFormValues] = useState(initialState);
  console.log(match.params.collectionId);

  function handleSubmit(e: any) {
    e.preventDefault();
    const { name, category, image, ingredients, instructions } = formValues;
    const imageData = new FormData();
    imageData.append('image', image);
    submitHandler(
      {
        name,
        category,
        imageData,
        ingredients,
        instructions,
        collection: match.params.collectionId
      },
      history
    );
    setFormValues({
      name: '',
      category: '',
      image: '',
      ingredients: [{ name: '', quantity: '' }],
      instructions: ''
    });
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

  function addIngredientField(e: any) {
    e.preventDefault();
    setFormValues((formValues: any) => {
      return {
        ...formValues,
        ingredients: [...formValues.ingredients, { name: '', quantity: '' }]
      };
    });
  }

  function handleIngredientChange(e: any) {
    const updatedIngredients = [...formValues.ingredients];
    updatedIngredients[e.target.dataset.idx][e.target.name] = e.target.value;
    setFormValues({ ...formValues, ingredients: updatedIngredients });
  }

  function removeIngredientField(idx: number) {
    const updatedIngredients = formValues.ingredients.filter(
      (ingredient: any, i: number) => {
        return i !== idx;
      }
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
          {CATEGORY_OPTIONS.map(category => {
            return (
              <option key={category} value={category}>
                {category}
              </option>
            );
          })}
        </FormField>
        {formValues.ingredients.map((ingredient: any, i: number) => {
          return (
            <IngredientField
              key={i}
              idx={i}
              onChange={handleIngredientChange}
              value={formValues.ingredients[i]}
              onRemove={removeIngredientField}
            />
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
}

export default withRouter(RecipeForm);
