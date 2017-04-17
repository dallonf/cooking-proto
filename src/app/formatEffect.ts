import { Effect } from '../types';
import * as _ from 'lodash';

export default function formatEffect(effect: Effect) {
  if (effect.type === 'buff') {
    let level: string;
    if (effect.level === 1) {
      level = 'low-level';
    } else if (effect.level === 2) {
      level = 'medium-level';
    } else if (effect.level >= 3) {
      level = 'high-level';
    } else {
      throw new Error('Unexpected buff level ' + effect.level);
    }

    let buffType: string;
    switch (effect.buffType) {
      case 'attackUp':
        buffType = 'attack increase';
        break;
      case 'coldResist':
        buffType = 'cold resistance';
        break;
      case 'defenseUp':
        buffType = 'defense increase';
        break;
      case 'heatResist':
        buffType = 'heat resistance';
        break;
      case 'stealth':
        buffType = 'stealth increase';
        break;
      default:
        throw new Error(`Unrecognized buff type ${effect.buffType}`);
    }
    //  = effect.buffType;

    const minutes = Math.floor(effect.duration / 60);
    const seconds = Math.floor(effect.duration % 60);

    return `A ${level} ${buffType} for ${minutes}:${_.padStart(seconds.toString(), 2, '0')}`;
  } else {
    throw new Error(`Unexpected effect type "${effect.type}"`);
  }
}