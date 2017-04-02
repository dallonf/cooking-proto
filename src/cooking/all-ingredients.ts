import ingredientsMap from './ingredients';
import { Ingredient } from '../types';

export function ingredientForKey(key: string): Ingredient {
  const result = (ingredientsMap as { [key: string]: Ingredient })[key];
  if (!result) {
    throw new Error(`Ingredient ${key} does not exist`);
  }
  return result;
}
export function ingredientListForKeyList(keys: string[]): Ingredient[] {
  return keys.map(key => ingredientForKey(key));
}

function makeList(ingredients: { [key: string]: Ingredient | undefined }): Ingredient[] {
  return ingredientListForKeyList(Object.keys(ingredients));
}
export default makeList(ingredientsMap);