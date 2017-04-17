import { makeIngredients, MakeIngredientInput } from '../types';
import { matchIngredients } from './triggers';

const rockSalt: MakeIngredientInput = {
    name: 'Rock Salt',
    description: 'Enhances the flavor of many dishes',
    hearts: 1,
    primaryAttribute: {
      trigger: () => true,
      effect: {
        type: 'buffDurationIncrease',
        amount: 180,
      }
    }
};
const octorokTentacle: MakeIngredientInput = {
    name: 'Octorok Tentacle',
    description: 'A controversial subject among Zora. ' +
      'Some love the boosted defense it provides when paired with some salt, ' +
      'but honestly it\'s just nasty if you don\'t include another meat.',
    hearts: 5,
    cuisine: 'zoran',
    foodTypes: 'protein',
    primaryAttribute: {
      trigger: matchIngredients(i => i.key === 'rockSalt', 1),
      effect: {
        type: 'buff',
        buffType: 'defenseUp',
        duration: 30,
        level: 2,
      },
    },
    negativeAttribute: {
      trigger: recipe => recipe
        .filter(i => i.foodTypes.indexOf('protein') !== -1 && i.key !== 'octorokTentacle').length < 1,
      effect: {
        type: 'hearts',
        amount: -15,
      },
    }
};
const duck: MakeIngredientInput = {
    name: 'Duck',
    description: 'Zora love the flavor of this water fowl.' + 
      'They insist that with some fruits or veggies, it makes them swim faster. ' +
      'But you don\'t think it would mix well with Rito cuisine for some reason...',
    hearts: 5,
    cuisine: 'zoran',
    foodTypes: 'protein',
    primaryAttribute: {
      trigger: matchIngredients(i => i.foodTypes.indexOf('produce') !== -1, 1),
      effect: {
        type: 'buff',
        buffType: 'speed',
        level: 1,
        duration: 500,
      },
    },
    negativeAttribute: {
      trigger: matchIngredients(i => i.cuisine === 'rito', 1),
      effect: {
        type: 'buff',
        buffType: 'stealth',
        level: -1,
        duration: 200,
      },
    },
};
const bread: MakeIngredientInput = {
    name: 'Bread',
    description: 'Hylians love this stuff. ' +
      'Pair it with other Hylian ingredients for a speed boost, ' +
      'but if you add some meat, it will increase your defense!',
    hearts: 2,
    cuisine: 'hylian',
    foodTypes: 'carb',
    primaryAttribute: {
      trigger: matchIngredients(i => i.cuisine === 'hylian' && i.key !== 'bread', 1),
      effect: {
        type: 'buff',
        buffType: 'speed',
        level: 1,
        duration: 60,
      },
    },
    secondaryAttribute: {
      trigger: matchIngredients(i => i.foodTypes.indexOf('protein') !== -1, 1),
      effect: {
        type: 'buff',
        buffType: 'defenseUp',
        level: 2,
        duration: 120,
      },
    }
};
const apple: MakeIngredientInput = {
    name: 'Apple',
    description: 'Simple but delicious. Hylians plant apple trees all over Hyrule so they can have a snack whenever! '
      + 'You can cook many apples together to go really fast for a short time, '
      + 'or add them to a sweet dish for a more powerful attack.',
    hearts: 1,
    cuisine: 'hylian',
    foodTypes: ['produce'],
    flavorProfiles: ['sweet'],
    primaryAttribute: {
      trigger: matchIngredients(i => i.flavorProfiles.indexOf('sweet') !== -1 && i.key !== 'apple', 1),
      effect: {
        type: 'buff',
        buffType: 'attackUp',
        level: 3,
        duration: 50,
      }
    },
    secondaryAttribute: {
      trigger: matchIngredients(i => i.key === 'apple'),
      effect: {
        type: 'buff',
        buffType: 'speed',
        level: 3,
        duration: 20,
      },
    }
};
const buttermilk: MakeIngredientInput = {
    name: 'Buttermilk',
    description: 'A Hylian favorite dairy product from Lon Lon Ranch.' +
      'Its acidic flavor increases your attack strength - but you can mix it with something sweet to ' +
      'massively increase the duration of other effects.',
    hearts: 1,
    cuisine: 'hylian',
    foodTypes: 'dairy',
    flavorProfiles: 'acidic',
    primaryAttribute: {
      trigger: matchIngredients(i => i.flavorProfiles.indexOf('sweet') !== -1, 1),
      effect: {
        type: 'buffDurationIncrease',
        amount: 500,
      },
    },
    secondaryAttribute: {
      trigger: () => true,
      effect: {
        type: 'buff',
        buffType: 'attackUp',
        duration: 20,
        level: 1,
      }
    }, 
};
const creme: MakeIngredientInput = {
  name: 'Créme',
  description: 'A traditional Rito sweet cream. ' +
    'Increases attack power, but curdles if mixed with acidic ingredients.',
  hearts: 4,
  cuisine: 'rito',
  foodTypes: 'dairy',
  flavorProfiles: 'sweet',
  primaryAttribute: {
    trigger: () => true,
    effect: {
      type: 'buff',
      buffType: 'attackUp',
      level: 1,
      duration: 74
    }
  },
  negativeAttribute: {
    trigger: matchIngredients(i => i.flavorProfiles.indexOf('acidic') !== -1, 1),
    effect: {
      type: 'hearts',
      amount: -10,
    },
  },
};
const artichoke: MakeIngredientInput = {
    name: 'Plated Artichoke',
    description: 'A vegetable grown by the Rito. Its earthy flavor makes you feel impervious to harm, ' +
      'but it won\'t mix well with sweet flavors.',
    hearts: 4,
    cuisine: 'rito',
    foodTypes: 'produce',
    flavorProfiles: 'tart',
    primaryAttribute: {
      trigger: () => true,
      effect: {
        type: 'buff',
        buffType: 'defenseUp',
        level: 2,
        duration: 120,
      },
    },
    negativeAttribute: {
      trigger: matchIngredients(i => i.flavorProfiles.indexOf('sweet') !== -1, 1),
      effect: {
        type: 'hearts',
        amount: -10
      },
    },
};
const tortilla: MakeIngredientInput = {
    name: 'Tortilla',
    description: 'A flat bread that forms the base of many Gerudo dishes. ' + 
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
  description: 'A mushroom favored by the Rito that can substitute for meat in a pinch. ' +
    'When paired with another meat, it sharpens your ' +
    'senses and quiets your steps.',
  hearts: 3,
  cuisine: 'rito',
  foodTypes: ['produce', 'protein'],
  primaryAttribute: {
    trigger: matchIngredients(i => i.foodTypes.indexOf('protein') !== -1),
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
  apple,
  buttermilk,
  creme,
  artichoke,
  silentShroom,
  tortilla,
  pepper,
});

export default ingredientsMap;