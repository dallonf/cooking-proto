import { Ingredient, Meal } from '../types';

export default function cook(ingredients: Ingredient[]): Meal {
  const hearts = ingredients.reduce((prev, next) => prev + next.hearts, 0);
  let name;
  if (hearts > 0) {
    name = 'A Meal';
  } else {
    name = 'Dubious Food';
  }
  return {
    name,
    hearts,
  };
}