import * as React from 'react';
import styled from 'styled-components';
import { Ingredient, Meal } from '../types';
import cookMeal from '../cooking/cooking';
import { ingredientForKey, ingredientListForKeyList, default as allIngredients } from '../cooking/all-ingredients';
import formatEffect from './formatEffect';
import IngredientList from './IngredientList';
import IngredientDetailPanel from './IngredientDetailPanel';
import CurrentRecipeList from './CurrentRecipeList';
import './App.css';

const AppLayout = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: stretch;
`;
const LeftColumn = styled.div`
  width: 670px;
`;
const RightColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Spacer = styled.div` flex: 1; `;

interface AppState {
  ingredients: string[];
  hoverIngredientKey: string | null;
  holding: string[];
  cookedMeal: Meal | null;
}

class App extends React.Component<null, AppState> {
  state: AppState = {
    ingredients: [...allIngredients.map(i => i.key)],
    hoverIngredientKey: 'rockSalt',
    holding: ['rockSalt', 'octorokTentacle', 'duck', 'apple'],
    cookedMeal: null,
  };

  handleIngredientClick = (ingredient: Ingredient) => (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    this.setState(state => ({
      holding: [...state.holding, ingredient.key]
    }));
  }

  handleHoverIngredient = (ingredient: Ingredient) => this.setState({
    hoverIngredientKey: ingredient.key,
  })

  // tslint:disable-next-line no-empty
  handleHoverEnd = () => {};

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
    const { holding, cookedMeal, hoverIngredientKey } = this.state;

    if ( cookedMeal ) {
      return (
        <div>
          <h2>{cookedMeal.name}</h2>
          <ul>
            <li>Heals {cookedMeal.hearts} hearts</li>
            { cookedMeal.effects.map((e, i) => 
              <li key={i}>{formatEffect(e)}</li>
            ) }
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
      <AppLayout>
        <LeftColumn>
          <IngredientList
            ingredients={ingredients}
            hoverIngredientKey={hoverIngredientKey}
            onClickIngredient={this.handleIngredientClick}
            canHoldMore={canHoldMore}
            onHoverIngredient={this.handleHoverIngredient}
            onHoverEnd={this.handleHoverEnd}
          />
        </LeftColumn>
        <RightColumn>
          <CurrentRecipeList
            ingredients={ingredientListForKeyList(holding)}
            onCookMeal={this.cookMeal}
            onStopHolding={this.stopHolding}
          />
          <Spacer />
          <IngredientDetailPanel ingredient={hoverIngredientKey ? ingredientForKey(hoverIngredientKey) : null} />
        </RightColumn>
      </AppLayout>
    );
  }
}

export default App;
