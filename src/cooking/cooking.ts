import { Ingredient, Meal } from '../types';

export default function cook(ingredients: Ingredient[]): Meal {
  const hearts = ingredients.reduce((prev, next) => prev + next.hearts, 0);
  let name;
  if (hearts > 0) {
    name = 'A Meal';
  } else {
    name = 'Dubious Food';
  }

  const effects = ingredients
    .filter(i => i.primaryAttribute && i.primaryAttribute.trigger(ingredients))
    .map(i => i.primaryAttribute!.effect);

  return {
    name,
    hearts,
    ingredients: ingredients.map(i => i.key),
    effects,
  };
}