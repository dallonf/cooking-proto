import * as React from 'react';
import styled from 'styled-components';
import { TagCollectionForIngredient } from './Tags';
import { Ingredient } from '../types';
import * as styles from './styles';

const HoldingList = styled.ul`
  list-style: none;
  padding: 0;
`;
interface HeldIngredientProps { highlighted?: boolean; }
const HeldIngredient = styled.li`
  padding: 8px;
  background: ${styles.PANEL_BG_COLOR};
  box-shadow: ${(props: HeldIngredientProps) =>
    props.highlighted ? styles.PANEL_HIGHLIGHT_SHADOW : styles.PANEL_OUTLINE_SHADOW
  };
  margin-bottom: 8px;
  ${styles.TRANSITION}

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
const Button = styled(styles.Button)` flex: 1; `;

const CurrentRecipeList = (
  { 
    ingredients,
    hoverIndex,
    onStopHolding,
    onCookMeal,
    onHoverItem,
  }: {
    ingredients: Ingredient[],
    hoverIndex: number | null,
    onStopHolding: () => void,
    onCookMeal: () => void,
    onHoverItem: (index: number) => void,
  }) =>
  ingredients.length > 0 ? (
    <div>
      <styles.Header>Holding ({ingredients.length}/5)</styles.Header>
      <HoldingList>
        {ingredients.map((i, n) => (
          <HeldIngredient key={n} onMouseEnter={() => onHoverItem(n)} highlighted={hoverIndex === n}>
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