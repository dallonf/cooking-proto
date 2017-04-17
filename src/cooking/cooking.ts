import { Ingredient, Meal, BuffType, BuffEffect } from '../types';

export default function cook(ingredients: Ingredient[]): Meal {
  const hearts = ingredients.reduce((prev, next) => prev + next.hearts, 0);
  let name;
  if (hearts > 0) {
    name = 'A Meal';
  } else {
    name = 'Dubious Food';
  }

  let effects = ingredients
    .filter(i => i.primaryAttribute && i.primaryAttribute.trigger(ingredients))
    .map(i => i.primaryAttribute!.effect);

  // Combine buffs
  const nonBuffs = effects.filter(e => e.type !== 'buff');
  const combinedBuffsByType = effects
    .filter(e => e.type === 'buff')
    .reduce((map, e) => {
      const existing = map[e.buffType];
      if (!existing) {
        map[e.buffType] = e;
      } else {
        const combined: BuffEffect = {
          ...existing,
          // Use the maxium level
          level: Math.max(existing.level, e.level),
          // Sum durations
          duration: existing.duration + e.duration,
        };
        map[e.buffType] = combined;
      }
      return map;
    }, {} as { [key in BuffType]: BuffEffect | undefined });

  effects = [...nonBuffs, ...Object.keys(combinedBuffsByType).map(t => combinedBuffsByType[t])];

  return {
    name,
    hearts,
    ingredients: ingredients.map(i => i.key),
    effects,
  };
}