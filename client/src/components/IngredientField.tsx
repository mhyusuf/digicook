import React, { ChangeEventHandler } from 'react';
import { RouteComponentProps } from 'react-router-dom';



interface IngredientFieldProps extends RouteComponentProps {
  idx: number;
  onChange: ChangeEventHandler<any>;
  value: {
    name: string;
    quantity: string;
  }
  onRemove: (idx: number) => void;
}

function IngredientField({ idx, onChange, value, onRemove }: IngredientFieldProps) {
  return (
    <>
      {idx === 0 && (
        <div data-test="IngredientFieldComponent-conditional" className="field">
          <label>Ingredients</label>
        </div>
      )}
      <div data-test="IngredientFieldComponent" className="fields">
        <div className="eight wide field">
          <input
            placeholder="Ingredient"
            type="text"
            data-idx={idx}
            onChange={onChange}
            name="name"
            value={value.name}
          />
        </div>
        <div className="seven wide field">
          <input
            placeholder="Quantity"
            type="text"
            data-idx={idx}
            onChange={onChange}
            name="quantity"
            value={value.quantity}
          />
        </div>
        <button
          className={`ui button`}
          disabled={idx === 0 ? true : false}
          onClick={e => {
            e.preventDefault();
            onRemove(idx);
          }}
        >
          Remove
        </button>
      </div>
    </>
  );
}

export default IngredientField;
