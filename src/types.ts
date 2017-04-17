export type Cuisine = 'hylian' | 'zoran' | 'gerudo' | 'rito';
export type FoodType = 'protein' | 'produce' | 'carb' | 'dairy';
export type FlavorProfile = 'aromatic' | 'acidic' | 'tart' | 'sweet' | 'spicy';
export type BuffType = 'attackUp' | 'defenseUp' | 'heatResist' | 'coldResist' | 'stealth';

export interface BuffEffect {
  type: 'buff';
  readonly buffType: BuffType;
  readonly level: number;
  readonly duration: number;
}
export type Effect = BuffEffect;

interface IngredientAttribute {
  readonly trigger: (recipe: Ingredient[]) => boolean;
  readonly effect: Effect;
}

export interface Ingredient {
  readonly key: string;
  readonly name: string;
  readonly description?: string;
  readonly cuisine?: Cuisine;
  readonly hearts: number;
  readonly foodTypes: FoodType[];
  readonly flavorProfiles: FlavorProfile[];

  readonly primaryAttribute?: IngredientAttribute;
}
interface MakeIngredientInput {
  name: string;
  description?: string;
  cuisine?: Cuisine;
  hearts: number;
  foodTypes?: FoodType[] | FoodType;
  flavorProfiles?: FlavorProfile[] | FlavorProfile;
  primaryAttribute?: IngredientAttribute;
};

export function makeIngredients<T extends { [key: string]: MakeIngredientInput }>(input: T):
  { [P in keyof T]: Ingredient } {
  const result: { [key: string]: Ingredient } = Object.keys(input)
    .reduce(
      (prev, k) => {
        const ingredientInput = input[k];
        return {...prev, [k]: {
          key: k,
          ...ingredientInput,
          foodTypes: ensureArray<FoodType>(ingredientInput.foodTypes),
          flavorProfiles: ensureArray<FlavorProfile>(ingredientInput.flavorProfiles)
        }};
      },
      {} as { [key: string]: Ingredient }
    );
  // we know where the keys are coming from, we can just assume this is OK at runtime
  // tslint:disable-next-line no-any
  return (result as any);
};

export interface Meal {
  readonly name: string;
  readonly description?: string;
  readonly hearts: number;
  readonly ingredients: string[];
  readonly effects: Effect[];
}

function ensureArray<T extends string>(input: T | T[] | undefined) {
  if (typeof input === 'string') {
    return [input];
  } else if (Array.isArray(input)) {
    return input;
  } else {
    return [];
  }
}