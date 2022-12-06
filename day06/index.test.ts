import { assertEquals } from 'https://deno.land/std@0.166.0/testing/asserts.ts';
import { getSolutionPart1, getSolutionPart2 } from './index.ts';

// Part 1

Deno.test('bvwbjplbgvbhsrlpgdmjqwftvncz should be 5', () => {
  const res = getSolutionPart1(['bvwbjplbgvbhsrlpgdmjqwftvncz']);
  assertEquals(res, 5);
});
