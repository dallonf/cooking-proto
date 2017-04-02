import ingredientMap, * as ingredients from '../ingredients';

it('should export all ingredients in array', function() {
  const allKeys = Object.keys(ingredients).filter(k => k !== 'default' && k !== '__esModule').sort();
  expect(allKeys).toEqual(Object.keys(ingredientMap).sort());
});