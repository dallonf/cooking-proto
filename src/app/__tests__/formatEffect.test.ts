import formatEffect from '../formatEffect';
import { BuffEffect } from '../../types';

it('should format a low-level buff', function() {
  const effect: BuffEffect = {
    type: 'buff',
    buffType: 'stealth',
    duration: 90,
    level: 1
  };
  expect(formatEffect(effect)).toEqual('A low-level stealth increase for 1:30');
});

it('should format a medium-level buff with a complex type name', function() {
  const effect: BuffEffect = {
    type: 'buff',
    buffType: 'coldResist',
    duration: 42,
    level: 2,
  };
  expect(formatEffect(effect)).toEqual('A medium-level cold resistance for 0:42');
});