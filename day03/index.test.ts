import { assertEquals } from 'https://deno.land/std@0.166.0/testing/asserts.ts';
import { getSolutionPart1, getSolutionPart2 } from './index.ts';

// https://adventofcode.com/2022/day/3
const input = [
  'vJrwpWtwJgWrhcsFMMfFFhFp',
  'jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL',
  'PmmdzqPrVvPwwTWBwg',
  'wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn',
  'ttgJtRGJQctTZtZT',
  'CrZsJsPPZsGzwwsLwLmpwMDw',
];

// Part 1
Deno.test('Test input should be 157', () => {
  const res = getSolutionPart1(input);
  assertEquals(res, 157);
});

//Part 2
Deno.test('Test input should be 70', () => {
  const res = getSolutionPart2(input);
  assertEquals(res, 70);
});
