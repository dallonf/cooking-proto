import * as React from 'react';
import styled from 'styled-components';
import { Ingredient, Meal } from '../types';
import cookMeal from '../cooking/cooking';
import { ingredientForKey, ingredientListForKeyList, default as allIngredients } from '../cooking/all-ingredients';
import MealModal from './MealModal';
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
  hoverIngredientKey: { type: 'key', value: string } | { type: 'heldIndex', value: number } | null;
  holding: string[];
  cookedMeal: Meal | null;
}

class App extends React.Component<null, AppState> {
  state: AppState = {
    ingredients: [...allIngredients.map(i => i.key)],
    hoverIngredientKey: null,
    holding: [],
    cookedMeal: null,
  };

  handleIngredientClick = (ingredient: Ingredient) => (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    this.setState(state => ({
      holding: [...state.holding, ingredient.key]
    }));
  }

  handleHoverIngredient = (ingredient: Ingredient) => this.setState({
    hoverIngredientKey: {
      type: 'key',
      value: ingredient.key
    },
  })

  // tslint:disable-next-line no-empty
  handleHoverEnd = () => {};

  handleHoverHeldItem = (index: number) => this.setState({
    hoverIngredientKey: {
      type: 'heldIndex',
      value: index,
    },
  })

  stopHolding = () => {
    this.setState((prevState: AppState) => {
      const update: Partial<AppState> = { holding: [] };
      if (prevState.hoverIngredientKey && prevState.hoverIngredientKey.type === 'heldIndex') {
        update.hoverIngredientKey = null;
      }
      return update;
    });
  }

  cookMeal = () => {
    this.setState((state: AppState) => {
      const cookedMeal = cookMeal(ingredientListForKeyList(state.holding));
      const update: Partial<AppState> = { cookedMeal, holding: [] };
      if (state.hoverIngredientKey && state.hoverIngredientKey.type === 'heldIndex') {
        update.hoverIngredientKey = null;
      }
      return update;
    });
  }

  confirmMeal = () => this.setState(state => ({ cookedMeal: null }));

  getHighlightedIngredient() {
    const { hoverIngredientKey, holding } = this.state;
    if (!hoverIngredientKey) return null;
    if (hoverIngredientKey.type === 'key') {
      return ingredientForKey(hoverIngredientKey.value);
    } else if (hoverIngredientKey.type === 'heldIndex') {
      const key = holding[hoverIngredientKey.value];
      return ingredientForKey(key);
    } else {
      return null;
    }
  }

  render() {
    const { holding, cookedMeal, hoverIngredientKey } = this.state;

    if ( cookedMeal ) {
      return (
        <MealModal meal={cookedMeal} onConfirm={this.confirmMeal} />
      );
    }

    const ingredients = ingredientListForKeyList(this.state.ingredients);
    const canHoldMore = holding.length < 5;
    return (
      <AppLayout>
        <LeftColumn>
          <IngredientList
            ingredients={ingredients}
            hoverIngredientKey={
              hoverIngredientKey && hoverIngredientKey.type === 'key' ? hoverIngredientKey.value : null
            }
            onClickIngredient={this.handleIngredientClick}
            canHoldMore={canHoldMore}
            onHoverIngredient={this.handleHoverIngredient}
            onHoverEnd={this.handleHoverEnd}
          />
        </LeftColumn>
        <RightColumn>
          <CurrentRecipeList
            ingredients={ingredientListForKeyList(holding)}
            hoverIndex={hoverIngredientKey && hoverIngredientKey.type === 'heldIndex' ? hoverIngredientKey.value : null}
            onHoverItem={this.handleHoverHeldItem}
            onCookMeal={this.cookMeal}
            onStopHolding={this.stopHolding}
          />
          <Spacer />
          <IngredientDetailPanel ingredient={this.getHighlightedIngredient()} />
        </RightColumn>
      </AppLayout>
    );
  }
}

export default App;
