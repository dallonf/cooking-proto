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
      key: 'cheezWiz',
      name: 'Cheez-Wiz',
      hearts: 2,
      cuisine: 'rito',
      foodTypes: ['dairy'],
      flavorProfiles: [],
      primaryAttribute: {
        trigger: (ingredients) => ingredients.filter(i => i.cuisine === 'rito').length >= 2,
        effect: {
          type: 'defenseUp',
          duration: 30,
          level: 1,
        }
      }
    };
    const meal = cook([ dummyIngredient, ingredients.artichoke ]);
    expect(meal.effects).toContainEqual({
      type: 'defenseUp',
      duration: 30,
      level: 1,
    });
  });

  it('should fail to activate an effect', function() {
    const dummyIngredient: Ingredient = {
      key: 'cheezWiz',
      name: 'Cheez-Wiz',
      hearts: 2,
      cuisine: 'rito',
      foodTypes: ['dairy'],
      flavorProfiles: [],
      primaryAttribute: {
        trigger: () => false,
        effect: {
          type: 'defenseUp',
          duration: 30,
          level: 1,
        }
      }
    };
    const meal = cook([ dummyIngredient, ingredients.artichoke ]);
    expect(meal.effects).toEqual([]);
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
  test('fajita', function() {
    const meal = cook([ ingredients.tortilla, ingredients.pepper, ingredients.artichoke ]);
    expect(meal).toMatchSnapshot();
  });
});