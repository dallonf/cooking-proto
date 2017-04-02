import * as ingredients from '../ingredients';
import { ingredientListForKeyList, ingredientForKey } from '../all-ingredients';

describe('ingredientListForKeyList', () => {
  it('should convert keys to a list', () => {
    const list = ['rockSalt', 'octorokTentacle'];
    const result = ingredientListForKeyList(list);
    expect(result).toEqual([
      { ...ingredients.rockSalt, key: 'rockSalt' },
      { ...ingredients.octorokTentacle, key: 'octorokTentacle' },
    ]);
  });
});

describe('ingredientForKey', () => {
  it('should fetch an item for key', () => {
    expect(ingredientForKey('bread')).toBe(ingredients.bread);
  });

  it('should throw an error when getting an ingredient that doesn\'t exist', () => {
    expect(() => ingredientForKey('nopenopenope')).toThrow();
  });
});