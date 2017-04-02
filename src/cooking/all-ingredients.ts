import ingredientsMap from './ingredients';
import { Ingredient } from '../types';

export interface IngredientInList extends Ingredient {
  readonly key: string;
}

export function ingredientForKey(key: string): Ingredient {
  const result = ingredientsMap[key];
  if (!result) {
    throw new Error(`Ingredient ${key} does not exist`);
  }
  return result;
}
export function ingredientListForKeyList(keys: string[]): IngredientInList[] {
  return keys.map(key => ({...ingredientForKey(key), key}));
}

function makeList(ingredients: { [key: string]: Ingredient | undefined }): IngredientInList[] {
  return ingredientListForKeyList(Object.keys(ingredients));
}
export default makeList(ingredientsMap);