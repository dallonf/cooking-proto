import { Effect } from '../types';
import * as _ from 'lodash';

export default function formatEffect(effect: Effect) {
  if (effect.type === 'buff') {
    let level: string;
    if (Math.abs(effect.level) === 1) {
      level = 'low-level';
    } else if (Math.abs(effect.level) === 2) {
      level = 'medium-level';
    } else if (Math.abs(effect.level) >= 3) {
      level = 'high-level';
    } else {
      throw new Error('Unexpected buff level ' + effect.level);
    }

    const isDebuff = effect.level < 0;
    let buffType: string;
    switch (effect.buffType) {
      case 'attackUp':
        buffType = isDebuff ? 'attack penalty' : 'attack increase';
        break;
      case 'coldResist':
        buffType = isDebuff ? 'cold sensitivity' : 'cold resistance';
        break;
      case 'defenseUp':
        buffType = isDebuff ? 'defense penalty' : 'defense increase';
        break;
      case 'heatResist':
        buffType =  isDebuff ? 'heat sensitivity' : 'heat resistance';
        break;
      case 'stealth':
        buffType = isDebuff ? 'stealth penalty' : 'stealth increase';
        break;
      case 'speed':
        buffType = isDebuff ? 'slow-down' : 'speed boost';
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