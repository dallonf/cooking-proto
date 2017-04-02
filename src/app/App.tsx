import * as React from 'react';
import { Meal } from '../types';
import cookMeal from '../cooking/cooking';
import { ingredientListForKeyList, default as allIngredients, IngredientInList } from '../cooking/all-ingredients';
import './App.css';

interface AppState {
  ingredients: string[];
  holding: string[];
  cookedMeal: Meal | null;
}

class App extends React.Component<null, AppState> {
  state: AppState = {
    ingredients: [...allIngredients.map(i => i.key)],
    holding: [],
    cookedMeal: null,
  };

  handleIngredientClick = (ingredient: IngredientInList) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    this.setState(state => ({
      holding: [...state.holding, ingredient.key]
    }));
  }

  stopHolding = () => {
    this.setState({ holding: [] });
  }

  cookMeal = () => {
    this.setState((state: AppState) => {
      const cookedMeal = cookMeal(ingredientListForKeyList(state.holding));
      return {
        cookedMeal,
        holding: [],
      };
    });
  }

  confirmMeal = () => this.setState(state => ({ cookedMeal: null }));

  render() {
    const { holding, cookedMeal } = this.state;

    if ( cookedMeal ) {
      return (
        <div>
          <h2>{cookedMeal.name}</h2>
          <ul>
            <li>Heals {cookedMeal.hearts} hearts</li>
          </ul>
          <p>
            {cookedMeal.description}
          </p>
          <button onClick={this.confirmMeal}>OK</button>
        </div>
      );
    }

    const ingredients = ingredientListForKeyList(this.state.ingredients);
    const canHoldMore = holding.length < 5;
    return (
      <div>
        <h2>Ingredients</h2>
        <ul>
          {ingredients.map(i => (
            <li key={i.key}>
              {canHoldMore
                ? (
                  <a href="#" onClick={this.handleIngredientClick(i)}>
                    {i.name}
                  </a>
                )
                : i.name
              }
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
            <button onClick={this.stopHolding}>Stop Holding</button>
            <button onClick={this.cookMeal}>Cook</button>
          </div>
        )}
      </div>
    );
  }
}

export default App;