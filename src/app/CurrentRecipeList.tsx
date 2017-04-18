import * as React from 'react';
import styled from 'styled-components';
import { Ingredient } from '../types';
import * as styles from './styles';

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
      <h2>Holding</h2>
      <ul>
        {ingredients.map((i, n) => (
          <li key={n}>
            {i.name}
          </li>
        ))}
      </ul>
      <ButtonContainer>
        <Button onClick={onStopHolding}>Stop Holding</Button>
        <Button onClick={onCookMeal}>Cook</Button>
      </ButtonContainer>
    </div>
  ) : <div />;
export default CurrentRecipeList;