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
    const dummyIngredient2: Ingredient = {
      key: 'popcorn',
      name: 'Popcorn',
      hearts: 3,
      cuisine: 'rito',
      foodTypes: [],
      flavorProfiles: [],
    };
    const meal = cook([ dummyIngredient, dummyIngredient2 ]);
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
    const meal = cook([ dummyIngredient ]);
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

  it('should prioritize negative effect over primary effect', function() {
    const dummyIngredient: Ingredient = {
      key: 'mw',
      name: 'Miracle Whip',
      hearts: 4,
      cuisine: 'zoran',
      flavorProfiles: [],
      foodTypes: ['dairy'],
      primaryAttribute: {
        trigger: () => true,
        effect: {
          type: 'buff',
          buffType: 'defenseUp',
          duration: 88,
          level: 1,
        },
      },
      negativeAttribute: {
        trigger: () => true,
        effect: {
          type: 'hearts',
          amount: -20,
        },
      },
    };
    const meal = cook([ dummyIngredient ]);
    expect(meal.name).toEqual('Dubious Food');
    expect(meal.effects).toEqual([]);
  });

  it('should prioritize primary effect over secondary effect', function() {
    const dummyIngredient: Ingredient = {
      key: 'marshmallow',
      name: 'Marshmallow',
      hearts: 8,
      flavorProfiles: ['sweet'],
      foodTypes: [],
      primaryAttribute: {
        trigger: () => true,
        effect: {
          type: 'hearts',
          amount: 8,
        },
      },
      secondaryAttribute: {
        trigger: () => true,
        effect: {
          type: 'buff',
          buffType: 'attackUp',
          level: 1,
          duration: 10,
        },
      },
    };
    const meal = cook([ dummyIngredient ]);
    expect(meal.hearts).toEqual(16);
    expect(meal.effects).toEqual([]);
  });

  it('should add secondary effect', function() {
    const dummyIngredient: Ingredient = {
      key: 'marshmallow',
      name: 'Marshmallow',
      hearts: 8,
      flavorProfiles: ['sweet'],
      foodTypes: [],
      primaryAttribute: {
        trigger: () => false,
        effect: {
          type: 'hearts',
          amount: 8,
        },
      },
      secondaryAttribute: {
        trigger: () => true,
        effect: {
          type: 'buff',
          buffType: 'attackUp',
          level: 1,
          duration: 10,
        },
      },
    };
    const meal = cook([ dummyIngredient ]);
    expect(meal.hearts).toEqual(8);
    expect(meal.effects).toContainEqual({
      type: 'buff',
      buffType: 'attackUp',
      level: 1,
      duration: 10,
    });
  });

  it('should combine debuffs', function() {
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
          level: -1,
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
      level: -2,
    });
  });

  it('should boost the duration of an effect', function() {
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
      key: 'salt',
      name: 'Salt',
      hearts: 1,
      foodTypes: [],
      flavorProfiles: [],
      primaryAttribute: {
        trigger: () => true,
        effect: {
          type: 'buffDurationIncrease',
          amount: 10,
        },
      },
    };
    const meal = cook([ dummyIngredient1, dummyIngredient2 ]);
    expect(meal.effects).toContainEqual({
      type: 'buff',
      buffType: 'attackUp',
      duration: 100,
      level: 1,
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
  test('dubious cream', function() {
    const meal = cook([ ingredients.creme, ingredients.buttermilk ]);
    expect(meal.name).toEqual('Dubious Food');
    expect(meal).toMatchSnapshot();
  });
  test('rito/zora fusion', function() {
    const meal = cook([ ingredients.octorokTentacle, ingredients.artichoke, ingredients.silentShroom ]);
    expect(meal).toMatchSnapshot();
  });
});