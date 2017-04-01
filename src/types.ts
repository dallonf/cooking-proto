export type Cuisine = 'hylian' | 'zoran' | 'gerudo' | 'rito';
export type FoodType = 'protein' | 'produce' | 'carb' | 'dairy';
export type FlavorProfile = 'aromatic' | 'acidic' | 'tart' | 'sweet' | 'spicy';

export interface Ingredient {
  name: string;
  cuisine?: Cuisine;
  hearts: number;
  foodTypes: FoodType[];
  flavorProfiles: FlavorProfile[];
}
interface MakeIngredientInput { 
  name: string;
  cuisine?: Cuisine;
  hearts: number;
  foodTypes?: FoodType[] | FoodType;
  flavorProfiles?: FlavorProfile[] | FlavorProfile;
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

export function makeIngredient(input: MakeIngredientInput): Readonly<Ingredient> {
  return ({
    ...input,
    foodTypes: ensureArray<FoodType>(input.foodTypes),
    flavorProfiles: ensureArray<FlavorProfile>(input.flavorProfiles)
  });
};
