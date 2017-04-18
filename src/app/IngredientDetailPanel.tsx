import * as React from 'react';
import styled from 'styled-components';
import { Ingredient, FoodType, FlavorProfile, IngredientAttribute } from '../types';
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

const TagCollection = styled.div`
`;

const Tag = styled.div`
  display: inline-block;
  background: ${styles.PANEL_BG_COLOR};
  box-shadow: ${styles.PANEL_OUTLINE_SHADOW};
  padding: 4px;
  font-style: normal;
  font-size: 16px;
  margin-right: 4px;
`;

const Description = styled.p`
  margin-top: 4px;
  font-size: 16px;
`;

const formatCusine = (ingredient: Ingredient) => {
  switch (ingredient.cuisine) {
    case 'gerudo':
      return 'Gerudo';
    case 'hylian': 
      return 'Hylian';
    case 'rito':
      return 'Rito';
    case 'zoran':
      return 'Zoran';
    default:
      return ingredient.cuisine;
  }
};

const formatFoodType = (foodType: FoodType) => {
  switch (foodType) {
    case 'carb':
      return 'Carb';
    case 'dairy':
      return 'Dairy';
    case 'produce':
      return 'Produce';
    case 'protein':
      return 'Protein';
    default:
      return foodType;
  }
};

const formatFlavorProfile = (flavorProfile: FlavorProfile) => {
  switch (flavorProfile) {
    case 'acidic':
      return 'Acidic';
    case 'aromatic':
      return 'Aromatic';
    case 'spicy':
      return 'Spicy';
    case 'sweet':
      return 'Sweet';
    case 'tart':
      return 'Tart';
    default:
      return flavorProfile;
  }
}

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
      <TagCollection>
        {ingredient.cuisine && <Tag>{formatCusine(ingredient)}</Tag>}
        {ingredient.flavorProfiles.map(profile => (<Tag key={profile}>{formatFlavorProfile(profile)}</Tag>))}
        {ingredient.foodTypes.map(type => (<Tag key={type}>{formatFoodType(type)}</Tag>))}
      </TagCollection>
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

