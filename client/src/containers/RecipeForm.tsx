import React, { FunctionComponent, useState } from 'react';
import { withRouter, match, RouteComponentProps } from 'react-router-dom';
import { History } from 'history';
import { IRecipeValues } from '../interfaces/inputs';
import FormField from '../components/FormInput';
import IngredientField from '../components/IngredientField';
import { CATEGORY_OPTIONS } from '../categoryOptions';

interface MatchInterface {
  collectionId: string;
  recipeId: string;
}

interface RecipeFormProps extends RouteComponentProps {
  initialState: IRecipeValues;
  submitHandler: (values: IRecipeValues, history: History<any>) => void;
  match: match<MatchInterface>
}

const RecipeForm: FunctionComponent<RecipeFormProps> = (props) => {
  const { initialState, submitHandler, match, history } = props;
  const [formValues, setFormValues] = useState(initialState);
  console.log(match.params.collectionId);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
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

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormValues((formValues: IRecipeValues) => ({
      ...formValues,
      [e.target.name]: e.target.value
    }));
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormValues((formValues: IRecipeValues) => ({
      ...formValues,
      image: e.target.files && e.target.files[0]
    }));
  }

  function addIngredientField(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setFormValues((formValues: IRecipeValues) => {
      return formValues.ingredients ? {
        ...formValues,
        ingredients: [...formValues.ingredients, { name: '', quantity: '' }]
      } : {};
    });
  }

  function handleIngredientChange(e: React.ChangeEvent<HTMLInputElement>) {
    const updatedIngredients = formValues.ingredients ? [...formValues.ingredients] : [];
    const dataset = e.target && e.target.dataset;
    const index = dataset.idx ? parseInt(dataset.idx) : 0;
    Object.assign(updatedIngredients[index], { [e.target.name]: e.target.value });
    setFormValues({ ...formValues, ingredients: updatedIngredients });
  }

  function removeIngredientField(idx: number) {
    const updatedIngredients = formValues.ingredients ? formValues.ingredients.filter(
      (ingredient: {name: string, quantity: string }, i: number) => {
        return i !== idx;
      }
    ) : [];
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
        {formValues.ingredients && formValues.ingredients.map((ingredient: any, i: number) => {
          return formValues.ingredients ? (
            <IngredientField
              key={i}
              idx={i}
              onChange={handleIngredientChange}
              value={formValues.ingredients[i]}
              onRemove={removeIngredientField}
            />
          ) : <div />;
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
