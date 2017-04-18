import * as React from 'react';
import styled from 'styled-components';
import { Ingredient } from '../types';
import * as colors from './colors';

const Header = styled.h2`
  text-align: center;
  font-weight: normal;
`;

const List = styled.ul`
  display: flex;
  flex-flow: row wrap;
`;

const IngredientBox = styled.li`
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  width: 82px;
  height: 82px;
  overflow: hidden;
  background: rgba(0,0,0,0.8);
  box-shadow: 0 0 0 1px ${colors.LINE}, 0 0 1px 3px rgba(0,0,0,0.8);
  margin-right: 15px;
  margin-bottom: 15px;
`;

const IngredientList = ({ ingredients }: {
    ingredients: Ingredient[],
    selectedIngredientKey: string | null,
    onClickIngredient: (ingredient: Ingredient) => void,
    canHoldMore: boolean,
  }) => (
  <div>
    <Header>Ingredients</Header>
    <List>
      {ingredients.map(i => 
        <IngredientBox key={i.key}>{i.name}</IngredientBox>
      )}
    </List>
  </div>
);
export default IngredientList;