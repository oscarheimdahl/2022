import { assertEquals } from 'https://deno.land/std@0.166.0/testing/asserts.ts';
import { getSolutionPart1, getSolutionPart2 } from './index.ts';

const input = ['R 5', 'U 8', 'L 8', 'D 3', 'R 17', 'D 10', 'L 25', 'U 20'];

// Part 1

// Deno.test('Test input should be 21', () => {
//   getSolutionPart1(input);
// });

// Part 2

Deno.test('Test input should be 21', () => {
  const res = getSolutionPart2(input);
  assertEquals(res, 36);
});
