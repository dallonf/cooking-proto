import * as React from 'react';
import formatEffect from './formatEffect';
import { Meal } from '../types';

const MealModal = ({ meal, onConfirm }: { meal: Meal, onConfirm: () => void }) => (
  <div>
    <h2>{meal.name}</h2>
    <ul>
      <li>Heals {meal.hearts} hearts</li>
      { meal.effects.map((e, i) => 
        <li key={i}>{formatEffect(e)}</li>
      ) }
    </ul>
    <p>
      {meal.description}
    </p>
    <button onClick={onConfirm}>OK</button>
  </div>
);
export default MealModal;