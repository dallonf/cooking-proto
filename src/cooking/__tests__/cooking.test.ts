import cook from '../cooking';
import ingredients from '../ingredients';
import { Ingredient } from '../../types';

it('should cook a meal by summing the hearts of its ingredients', function() {
  const meal = cook([ ingredients.rockSalt, ingredients.duck ]);
  expect(meal.hearts).toBe(ingredients.rockSalt.hearts + ingredients.duck.hearts);
});

it('should keep track of what ingredients were used', () => {
  const meal = cook([ ingredients.rockSalt, ingredients.duck ]);
  expect(meal.ingredients).toEqual(['rockSalt', 'duck']);
});

describe('effects', () => {
  it('should activate an effect', function() {
    const dummyIngredient: Ingredient = {
      key: 'cheezWhiz',
      name: 'Cheez-Whiz',
      hearts: 2,
      cuisine: 'rito',
      foodTypes: ['dairy'],
      flavorProfiles: [],
      primaryAttribute: {
        trigger: (ingredients) => ingredients.filter(i => i.cuisine === 'rito').length >= 2,
        effect: {
          type: 'buff',
          buffType: 'defenseUp',
          duration: 30,
          level: 1,
        }
      }
    };
    const meal = cook([ dummyIngredient, ingredients.artichoke ]);
    expect(meal.effects).toContainEqual({
      type: 'buff',
      buffType: 'defenseUp',
      duration: 30,
      level: 1,
    });
  });

  it('should fail to activate an effect', function() {
    const dummyIngredient: Ingredient = {
      key: 'cheezWhiz',
      name: 'Cheez-Whiz',
      hearts: 2,
      cuisine: 'rito',
      foodTypes: ['dairy'],
      flavorProfiles: [],
      primaryAttribute: {
        trigger: () => false,
        effect: {
          type: 'buff',
          buffType: 'defenseUp',
          duration: 30,
          level: 1,
        }
      }
    };
    const meal = cook([ dummyIngredient, ingredients.artichoke ]);
    expect(meal.effects).toEqual([]);
  });

  it('should combine effects', function() {
    const dummyIngredient1: Ingredient = {
      key: 'cheezWhiz',
      name: 'Cheez-Whiz',
      hearts: 2,
      cuisine: 'rito',
      foodTypes: ['dairy'],
      flavorProfiles: [],
      primaryAttribute: {
        trigger: () => true,
        effect: {
          type: 'buff',
          buffType: 'attackUp',
          duration: 90,
          level: 1,
        }
      }
    };
    const dummyIngredient2: Ingredient = {
      key: 'twinkie',
      name: 'Twinkie',
      cuisine: 'hylian',
      hearts: 3,
      foodTypes: [],
      flavorProfiles: ['sweet'],
      primaryAttribute: {
        trigger: () => true,
        effect: {
          type: 'buff',
          buffType: 'attackUp',
          duration: 32,
          level: 2,
        },
      },
    };
    const meal = cook([ dummyIngredient1, dummyIngredient2 ]);
    expect(meal.effects).toContainEqual({
      type: 'buff',
      buffType: 'attackUp',
      duration: 122,
      level: 2,
    });
  });
});

describe('snapshots', function() {
  test('butterchoke', function() {
    const meal = cook([ ingredients.artichoke, ingredients.buttermilk ]);
    expect(meal).toMatchSnapshot();
  });
  test('roast duck', function() {
    const meal = cook([ ingredients.duck, ingredients.rockSalt ]);
    expect(meal).toMatchSnapshot();
  });
  test('veggie fajita', function() {
    const meal = cook([ ingredients.tortilla, ingredients.pepper, ingredients.artichoke ]);
    expect(meal).toMatchSnapshot();
  });
  test('mushroom and duck fajita', function() {
    const meal = cook([ ingredients.tortilla, ingredients.pepper, ingredients.duck, ingredients.silentShroom ]);
    expect(meal).toMatchSnapshot();
  });
});