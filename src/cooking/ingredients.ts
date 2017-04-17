import { makeIngredients, MakeIngredientInput } from '../types';
import { matchIngredients } from './triggers';

const rockSalt: MakeIngredientInput = {
    name: 'Rock Salt',
    description: 'Enhances the flavor of many dishes',
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
        level: 2,
      },
      trigger: matchIngredients(i => i.cuisine === 'gerudo'),
    },
};
const pepper: MakeIngredientInput = {
    name: 'Hot Pepper',
    description: 'A spicy pepper from the Gerudo Desert. ' +
      'When cooked into a meal, the firey flavor helps to fend off the cold.',
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
const silentShroom: MakeIngredientInput = {
  name: 'Silent Shroom',
  description: 'A mushroom favored by the Rito. When paired with another protein, it sharpens your ' +
    'senses and quiets your steps.',
  hearts: 3,
  cuisine: 'rito',
  foodTypes: ['produce', 'protein'],
  primaryAttribute: {
    trigger: matchIngredients(i => i.cuisine === 'gerudo'),
    effect: {
      type: 'buff',
      buffType: 'stealth',
      level: 1,
      duration: 50,
    },
  },
};

const ingredientsMap = makeIngredients({
  rockSalt,
  octorokTentacle,
  duck,
  bread,
  buttermilk,
  creme,
  artichoke,
  silentShroom,
  tortilla,
  pepper,
});

export default ingredientsMap;