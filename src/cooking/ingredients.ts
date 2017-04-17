import { makeIngredients, MakeIngredientInput } from '../types';

const rockSalt: MakeIngredientInput = {
    name: 'Rock Salt',
    hearts: 1,
};
const octorokTentacle: MakeIngredientInput = {
    name: 'Octorok Tentacle',
    hearts: 5,
    cuisine: 'zoran',
    foodTypes: 'protein'
};
const duck: MakeIngredientInput = {
    name: 'Duck',
    hearts: 5,
    cuisine: 'zoran',
    foodTypes: 'protein',
};
const bread: MakeIngredientInput = {
    name: 'Bread',
    hearts: 2,
    cuisine: 'hylian',
    foodTypes: 'carb',
};
const buttermilk: MakeIngredientInput = {
    name: 'Buttermilk',
    hearts: 1,
    cuisine: 'hylian',
    foodTypes: 'dairy',
    flavorProfiles: 'acidic',
};
const creme: MakeIngredientInput = {
    name: 'Créme',
    hearts: 2,
    cuisine: 'rito',
    foodTypes: 'dairy',
    flavorProfiles: 'sweet',
};
const artichoke: MakeIngredientInput = {
    name: 'Artichoke',
    hearts: 4,
    cuisine: 'rito',
    foodTypes: 'produce',
    flavorProfiles: 'tart'
};
const tortilla: MakeIngredientInput = {
    name: 'Tortilla',
    description: 'A flat bread that forms the base of many Gerudo dishes.' + 
      'Combining it with other Gerudo ingredients will make you a better, sneakier thief!',
    hearts: 2,
    cuisine: 'gerudo',
    foodTypes: 'carb',
    primaryAttribute: {
      effect: {
        type: 'buff',
        buffType: 'stealth',
        duration: 90,
        level: 1,
      },
      trigger: (recipe) => recipe.filter(i => i.cuisine === 'gerudo').length >= 2,
    },
};
const pepper: MakeIngredientInput = {
    name: 'Hot Pepper',
    hearts: 4,
    cuisine: 'gerudo',
    foodTypes: 'produce',
    flavorProfiles: 'spicy',
    primaryAttribute: {
      trigger: () => true,
      effect: {
        type: 'buff',
        buffType: 'coldResist',
        level: 1,
        duration: 24
      }
    }
};

const ingredientsMap = makeIngredients({
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

export default ingredientsMap;