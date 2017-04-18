import * as React from 'react';
import styled from 'styled-components';
import { Ingredient } from '../types';
import * as colors from './colors';

const Header = styled.h2`
  text-align: center;
  font-weight: normal;
  font-size: 16px;
  margin: 0;
  margin-top: 18px;
`;

const HR = styled.hr`
  border: ${colors.LINE} 1px solid;
  margin: 18px 32px;
`;

const List = styled.ul`
  display: flex;
  flex-flow: row wrap;
  margin-left: 49px;
  width: 587px;
`;

interface IngredientBoxProps {
  disabled?: boolean;
}
const IngredientBox = styled.li`
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 4px;
  cursor: ${ (props: IngredientBoxProps) => props.disabled ? 'default' : 'pointer' };
  opacity: ${ (props: IngredientBoxProps) => props.disabled ? 0.6 : 1 };

  width: 82px;
  height: 82px;
  overflow: hidden;
  background: rgba(0,0,0,0.8);
  box-shadow: 0 0 0 1px ${colors.LINE}, 0 0 1px 3px rgba(0,0,0,0.8);
  margin-right: 15px;
  margin-bottom: 15px;

  ${ (props: IngredientBoxProps) => !props.disabled ? `
    &:hover {
      box-shadow: 0 0 0 1px white,
        0 0 4px 2px rgba(255,255,255,0.6), 0 0 4px 0 rgba(255,255,255,0.6) inset,
        0 0 10px 4px rgba(255,255,255,0.4);
    }
  ` : ''}
`;

const IngredientList = ({ ingredients, onClickIngredient, canHoldMore }: {
    ingredients: Ingredient[],
    selectedIngredientKey: string | null,
    onClickIngredient: (ingredient: Ingredient) => (e: React.MouseEvent<HTMLLIElement>) => void,
    canHoldMore: boolean,
  }) => (
  <div>
    <Header>Ingredients</Header>
    <HR />
    <List>
      {ingredients.map(i => (
        <IngredientBox key={i.key} onClick={canHoldMore ? onClickIngredient(i) : undefined} disabled={!canHoldMore}>
          {i.name}
        </IngredientBox>
      ))}
    </List>
  </div>
);
export default IngredientList;