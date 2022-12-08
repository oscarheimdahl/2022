import { assertEquals } from 'https://deno.land/std@0.166.0/testing/asserts.ts';
import { getSolutionPart1, getSolutionPart2 } from './index.ts';

const input = ['30373', '25512', '65332', '33549', '35390'];
// '3 0 3 7 3'
// '2 5 5 1 2'
// '6 5 3 3 2'
// '3 3 5 4 9'
// '3 5 3 9 0'

// Part 1

Deno.test('Test input should be 21', () => {
  const res = getSolutionPart1(input);
  assertEquals(res, 21);
});

// Part 2

Deno.test('Test input should be 21', () => {
  const res = getSolutionPart2(input);
  assertEquals(res, 8);
});
