import * as React from 'react';
import { ingredientListForKeyList, default as allIngredients } from '../cooking/all-ingredients';
// import * as ingredients from '../cooking/ingredients';
// import { Ingredient } from '../types';
import './App.css';

// const ingredientsList = ingredients.default;

interface AppState {
  ingredients: string[];
}

class App extends React.Component<null, AppState> {
  state: AppState = {
    ingredients: [...allIngredients.map(i => i.key)],
  };

  render() {
    const ingredients = ingredientListForKeyList(this.state.ingredients);
    return (
      <div>
        <h2>Ingredients</h2>
        <ul>
          {ingredients.map(i => <li key={i.key}>{i.name}</li>)}
        </ul>
      </div>
    );
  }
}

export default App;
