import * as React from 'react';
import styled from 'styled-components';
import { Tag, TagCollectionForIngredient } from './Tags';
import { Ingredient, IngredientAttribute } from '../types';
import formatEffect from './formatEffect';
import * as styles from './styles';

const Panel = styled.div`
  background: ${styles.PANEL_BG_COLOR};
  box-shadow: ${styles.PANEL_OUTLINE_SHADOW};
  margin-bottom: 40px;
  padding: 8px 24px;
`;

const Header = styled.h2`
  margin: 0;
  margin-bottom: 4px;
  padding-bottom: 8px;
  border-bottom: ${styles.LINE_COLOR} 1px solid;
`;

const EffectsPanel = styled.div`
  border-top: ${styles.LINE_COLOR} 1px solid;
  margin: 8px 0;
  padding-top: 8px;
`;

const Description = styled.p`
  margin-top: 4px;
  font-size: 16px;
`;

const EffectLine = ({ attribute, label }: { attribute?: IngredientAttribute, label: string }) =>
  attribute ? (
    <div style={{ marginBottom: 4 }}>
      <strong>{label}</strong>
      {attribute.triggerDescription &&
        <span> - {attribute.triggerDescription}</span>
      }
      &nbsp; &nbsp;
      <Tag>{formatEffect(attribute.effect)}</Tag>
    </div>) : <div />
;

const ingredientHasEffect = (ingredient: Ingredient) =>
  ingredient.commonAttribute || ingredient.specialAttribute || ingredient.negativeAttribute;

const IngredientDetailPanel = ({ ingredient }: { ingredient: Ingredient | null }) => (
  ingredient ? (
    <Panel>
      <Header>{ingredient.name}</Header>
      <TagCollectionForIngredient ingredient={ingredient} />
      <Description>{ingredient.description}</Description>
      {ingredientHasEffect(ingredient) && (
        <EffectsPanel>
          <EffectLine attribute={ingredient.commonAttribute} label="Common Effect" />
          <EffectLine attribute={ingredient.specialAttribute} label="Special Effect" />
          <EffectLine attribute={ingredient.negativeAttribute} label="Negative Effect" />
        </EffectsPanel>
      )}
    </Panel>
    ): <div />
);
export default IngredientDetailPanel;

