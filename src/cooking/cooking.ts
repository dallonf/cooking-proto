import { Ingredient, Meal, BuffType, BuffEffect, Effect, HeartEffect } from '../types';

export default function cook(ingredients: Ingredient[]): Meal {
  let hearts = ingredients.reduce((prev, next) => prev + next.hearts, 0);

  let effects = ingredients
    .map(i => {
      if (i.negativeAttribute && i.negativeAttribute.trigger(ingredients)) {
        return i.negativeAttribute.effect;
      } else if (i.primaryAttribute && i.primaryAttribute.trigger(ingredients)) {
        return i.primaryAttribute.effect;
      } else if (i.secondaryAttribute && i.secondaryAttribute.trigger(ingredients)) {
        return i.secondaryAttribute.effect;
      } else {
        return undefined; 
      }
    })
    .filter(e => e) as Effect[];

  // Combine buffs
  const nonBuffs = effects.filter(e => e.type !== 'buff');
  const combinedBuffsByType = effects
    .reduce((map, e) => {
      if (e.type !== 'buff') return map;
      const existing = map[e.buffType];
      if (!existing) {
        map[e.buffType] = e;
      } else {
        const combined: BuffEffect = {
          ...existing,
          // Use the maximum level - and the minimum sign
          level: Math.max(Math.abs(existing.level), Math.abs(e.level)) * Math.sign(Math.min(existing.level, e.level)),
          // Sum durations
          duration: existing.duration + e.duration,
        };
        map[e.buffType] = combined;
      }
      return map;
    }, {} as { [key in BuffType]: BuffEffect | undefined });

  effects = [...nonBuffs, ...Object.keys(combinedBuffsByType).map(t => combinedBuffsByType[t])];

  // Extend buffs
  const extendBuffsAmount = effects.map(e => e.type === 'buffDurationIncrease' ? e.amount : 0)
    .reduce((a, b) => a + b, 0);
  effects = effects
    .filter(e => e.type !== 'buffDurationIncrease')
    .map(e => {
      if (e.type === 'buff') {
        return {...e, duration: e.duration + extendBuffsAmount};
      } else { 
        return e;
      }
    });

  // Add heart effects to meal itself
  const heartEffects = (effects as ReadonlyArray<Effect>)
    .filter((e): e is HeartEffect => e.type === 'hearts');
  heartEffects.forEach(e => {
    hearts += e.amount;
  });
  effects = effects.filter(e => e.type !== 'hearts');

  let name;
  if (hearts > 0) {
    name = 'A Meal';
  } else {
    name = 'Dubious Food';
  }

  return {
    name,
    hearts,
    ingredients: ingredients.map(i => i.key),
    effects,
  };
}