import cook from '../cooking';
import * as ingredients from '../ingredients';

it('should cook a meal by summing the hearts of its ingredients', function() {
  const meal = cook([ ingredients.rockSalt, ingredients.duck ]);
  expect(meal.hearts).toBe(ingredients.rockSalt.hearts + ingredients.duck.hearts);
});

describe('snapshots', function() {
  it('fajita', function() {
    const meal = cook([ ingredients.tortilla, ingredients.pepper, ingredients.artichoke ]);
    expect(meal).toMatchSnapshot();
  });
});