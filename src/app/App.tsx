import * as React from 'react';
import { ingredientListForKeyList, default as allIngredients, IngredientInList } from '../cooking/all-ingredients';
import './App.css';

interface AppState {
  ingredients: string[];
  holding: string[];
}

class App extends React.Component<null, AppState> {
  state: AppState = {
    ingredients: [...allIngredients.map(i => i.key)],
    holding: [],
  };

  handleIngredientClick = (ingredient: IngredientInList) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    this.setState(state => ({
      holding: [...state.holding, ingredient.key]
    }));
  }

  render() {
    const { holding } = this.state;
    const ingredients = ingredientListForKeyList(this.state.ingredients);
    return (
      <div>
        <h2>Ingredients</h2>
        <ul>
          {ingredients.map(i => (
            <li key={i.key}>
              <a href="#" onClick={this.handleIngredientClick(i)}>
                {i.name}
              </a>
            </li>
          ))}
        </ul>
        { Boolean(holding.length) && (
          <div>
            <h2>Holding</h2>
            <ul>
              {ingredientListForKeyList(holding).map((i, n) => (
                <li key={n}>
                    {i.name}
                </li>
              ))}
            </ul> 
          </div>
        )}
      </div>
    );
  }
}

export default App;
