import {Ingredient} from '../types';

export const matchIngredients = (selector: (ingredient: Ingredient) => boolean, minMatching = 2) =>
  (recipe: Ingredient[]) => recipe.filter(selector).length >= minMatching;