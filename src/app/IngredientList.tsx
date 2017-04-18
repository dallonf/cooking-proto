import * as React from 'react';
import styled from 'styled-components';
import { Ingredient } from '../types';
import * as styles from './styles';

const HR = styled.hr`
  border: ${styles.LINE_COLOR} 1px solid;
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
  hover?: boolean;
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
  background: ${(props: IngredientBoxProps) => props.hover ? 'rgba(0,0,0,0.8)' : styles.PANEL_BG_COLOR};
  box-shadow: ${(props: IngredientBoxProps) =>
    props.hover ? styles.PANEL_HIGHLIGHT_SHADOW : styles.PANEL_OUTLINE_SHADOW
  };
  ${styles.TRANSITION}
  margin-right: 15px;
  margin-bottom: 15px;

  ${(props: IngredientBoxProps) => props.disabled ? '' : `
    &:active {
      background: rgba(255,255,255,0.8);
    }
  `}
`;

const IngredientList = ({
  ingredients,
  onClickIngredient,
  canHoldMore,
  hoverIngredientKey,
  onHoverIngredient,
  onHoverEnd }: {
    ingredients: Ingredient[],
    hoverIngredientKey: string | null,
    onClickIngredient: (ingredient: Ingredient) => (e: React.MouseEvent<HTMLLIElement>) => void,
    onHoverIngredient: (ingredient: Ingredient) => void,
    onHoverEnd: (ingredient: Ingredient) => void,
    canHoldMore: boolean,
  }) => (
  <div>
    <styles.Header>Ingredients</styles.Header>
    <HR />
    <List>
      {ingredients.map(i => (
        <IngredientBox 
          key={i.key}
          onClick={canHoldMore ? onClickIngredient(i) : undefined}
          disabled={!canHoldMore}
          onMouseEnter={() => onHoverIngredient(i)}
          onMouseLeave={() => onHoverEnd(i)}
          hover={hoverIngredientKey === i.key}
        >
          {i.name}
        </IngredientBox>
      ))}
    </List>
  </div>
);
export default IngredientList;