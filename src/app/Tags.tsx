import * as React from 'react';
import styled from 'styled-components';
import * as styles from './styles';
import { Ingredient, FoodType, FlavorProfile } from '../types';

const TagCollection = styled.div`
`;

export const Tag = styled.div`
  display: inline-block;
  background: ${styles.PANEL_BG_COLOR};
  box-shadow: ${styles.PANEL_OUTLINE_SHADOW};
  padding: 4px;
  font-style: normal;
  font-size: 16px;
  margin-right: 4px;
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

export const TagCollectionForIngredient = ({ ingredient }: { ingredient: Ingredient }) => (
  <TagCollection>
    {ingredient.cuisine && <Tag>{formatCusine(ingredient)}</Tag>}
    {ingredient.flavorProfiles.map(profile => (<Tag key={profile}>{formatFlavorProfile(profile)}</Tag>))}
    {ingredient.foodTypes.map(type => (<Tag key={type}>{formatFoodType(type)}</Tag>))}
  </TagCollection>
);