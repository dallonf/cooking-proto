import { makeIngredient, Ingredient } from '../types';

export const rockSalt = makeIngredient({
  name: 'Rock Salt',
  hearts: 1,
});
export const octorokTentacle = makeIngredient({
  name: 'Octorok Tentacle',
  hearts: 5,
  cuisine: 'zoran',
  foodTypes: 'protein'
});
export const duck = makeIngredient({
  name: 'Duck',
  hearts: 5,
  cuisine: 'zoran',
  foodTypes: 'protein',
});
export const bread = makeIngredient({
  name: 'Bread',
  hearts: 2,
  cuisine: 'hylian',
  foodTypes: 'carb',
});
export const buttermilk = makeIngredient({
  name: 'Buttermilk',
  hearts: 1,
  cuisine: 'hylian',
  foodTypes: 'dairy',
  flavorProfiles: 'acidic',
});
export const creme = makeIngredient({
  name: 'Créme',
  hearts: 2,
  cuisine: 'rito',
  foodTypes: 'dairy',
  flavorProfiles: 'sweet',
});
export const artichoke = makeIngredient({
  name: 'Artichoke',
  hearts: 4,
  cuisine: 'rito',
  foodTypes: 'produce',
  flavorProfiles: 'tart'
});
export const tortilla = makeIngredient({
  name: 'Tortilla',
  hearts: 2,
  cuisine: 'gerudo',
  foodTypes: 'carb',
});
export const pepper = makeIngredient({
  name: 'Hot Pepper',
  hearts: 4,
  cuisine: 'gerudo',
  foodTypes: 'produce',
  flavorProfiles: 'spicy',
});

interface IngredientInList extends Readonly<Ingredient> {
  key: string;
}

function makeList(ingredients: { [key: string]: Readonly<Ingredient> }): IngredientInList[] {
  return Object.keys(ingredients).map(key => ({...ingredients[key], key}));
}
export default makeList({
  rockSalt,
  octorokTentacle,
  duck,
  bread,
  buttermilk,
  creme,
  artichoke,
  tortilla,
  pepper,
});