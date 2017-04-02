import { makeIngredients } from '../types';

const ingredientsMap = makeIngredients({
  rockSalt: {
    name: 'Rock Salt',
    hearts: 1,
  },
  octorokTentacle: {
    name: 'Octorok Tentacle',
    hearts: 5,
    cuisine: 'zoran',
    foodTypes: 'protein'
  },
  duck: {
    name: 'Duck',
    hearts: 5,
    cuisine: 'zoran',
    foodTypes: 'protein',
  },
  bread: {
    name: 'Bread',
    hearts: 2,
    cuisine: 'hylian',
    foodTypes: 'carb',
  },
  buttermilk: {
    name: 'Buttermilk',
    hearts: 1,
    cuisine: 'hylian',
    foodTypes: 'dairy',
    flavorProfiles: 'acidic',
  },
  creme: {
    name: 'Créme',
    hearts: 2,
    cuisine: 'rito',
    foodTypes: 'dairy',
    flavorProfiles: 'sweet',
  },
  artichoke: {
    name: 'Artichoke',
    hearts: 4,
    cuisine: 'rito',
    foodTypes: 'produce',
    flavorProfiles: 'tart'
  },
  tortilla: {
    name: 'Tortilla',
    hearts: 2,
    cuisine: 'gerudo',
    foodTypes: 'carb',
  },
  pepper: {
    name: 'Hot Pepper',
    hearts: 4,
    cuisine: 'gerudo',
    foodTypes: 'produce',
    flavorProfiles: 'spicy',
  },
});

export default ingredientsMap;