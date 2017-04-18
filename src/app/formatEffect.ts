import { Effect } from '../types';
import * as _ from 'lodash';

const formatTime = (duration: number) => {
  const minutes = Math.floor(duration / 60);
  const seconds = Math.floor(duration % 60);
  return `${minutes}:${_.padStart(seconds.toString(), 2, '0')}`;
}

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

    return `A ${level} ${buffType} for ${formatTime(effect.duration)}`;
  } else if (effect.type === 'buffDurationIncrease') {
    return `Increases other effects by ${formatTime(effect.amount)}`;
  } else if (effect.type === 'hearts') {
    if (effect.amount > 0) {
      return `Recovers ${effect.amount} additional hearts`;
    } else {
      return `Takes away ${Math.abs(effect.amount)} hearts`;
    }
  } else {
    throw new Error(`Unexpected effect type "${(effect as Effect).type}"`);
  }
}