export type Cuisine = 'hylian' | 'zoran' | 'gerudo' | 'rito';
export type FoodType = 'protein' | 'produce' | 'carb' | 'dairy';
export type FlavorProfile = 'aromatic' | 'acidic' | 'tart' | 'sweet' | 'spicy';

export interface Ingredient {
  readonly name: string;
  readonly cuisine?: Cuisine;
  readonly hearts: number;
  readonly foodTypes: FoodType[];
  readonly flavorProfiles: FlavorProfile[];
}
interface MakeIngredientInput { 
  name: string;
  cuisine?: Cuisine;
  hearts: number;
  foodTypes?: FoodType[] | FoodType;
  flavorProfiles?: FlavorProfile[] | FlavorProfile;
}
export function makeIngredient(input: MakeIngredientInput): Ingredient {
  return ({
    ...input,
    foodTypes: ensureArray<FoodType>(input.foodTypes),
    flavorProfiles: ensureArray<FlavorProfile>(input.flavorProfiles)
  });
};

export interface Meal {
  readonly name: string;
  readonly description?: string;
  readonly hearts: number;
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