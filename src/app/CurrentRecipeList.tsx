import * as React from 'react';
import styled from 'styled-components';
import { TagCollectionForIngredient } from './Tags';
import { Ingredient } from '../types';
import * as styles from './styles';

const HoldingList = styled.ul`
  list-style: none;
  padding: 0;
`;
const HeldIngredient = styled.li`
  padding: 8px;
  background: ${styles.PANEL_BG_COLOR};
  box-shadow: ${styles.PANEL_OUTLINE_SHADOW};
  margin-bottom: 8px;

  display: flex;
  flex-direction: row;
  align-items: center;
`;
const IngredientName = styled.span`
  font-size: 16px;
  font-weight: bold;
  flex: 1;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
`;
const Button = styled.button`
  flex: 1;
  background: ${styles.PANEL_BG_COLOR};
  border: none;
  box-shadow: ${styles.PANEL_OUTLINE_SHADOW};
  font-size: 20px;
  height: 60px;
  color: white;
  font-family: 'Source Sans Pro', sans-serif;
  font-style: italic;
  cursor: pointer;
  ${styles.TRANSITION}

  &:first-child {
    margin-right: 8px;
  }

  &:hover, &:focus {
    box-shadow: ${styles.PANEL_HIGHLIGHT_SHADOW};
  }
  &:active {
    background: rgba(255,255,255,0.8);
  }
`;


const CurrentRecipeList = (
  { 
    ingredients,
    onStopHolding,
    onCookMeal,
  }: {
    ingredients: Ingredient[],
    onStopHolding: () => void,
    onCookMeal: () => void,
  }) =>
  ingredients.length > 0 ? (
    <div>
      <styles.Header>Holding ({ingredients.length}/5)</styles.Header>
      <HoldingList>
        {ingredients.map((i, n) => (
          <HeldIngredient key={n}>
            <IngredientName>{i.name}</IngredientName>
            <TagCollectionForIngredient ingredient={i} />
          </HeldIngredient>
        ))}
      </HoldingList>
      <ButtonContainer>
        <Button onClick={onStopHolding}>Stop Holding</Button>
        <Button onClick={onCookMeal}>Cook</Button>
      </ButtonContainer>
    </div>
  ) : <div />;
export default CurrentRecipeList;