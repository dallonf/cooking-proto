import ingredientList, * as ingredients from '../ingredients';

it('should export all ingredients in array', function() {
  const allKeys = Object.keys(ingredients).filter(k => k !== 'default' && k !== '__esModule');
  allKeys.sort();
  expect(allKeys).toEqual(ingredientList.map(k => k.key).sort());
});