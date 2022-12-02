import { assertEquals } from 'https://deno.land/std@0.166.0/testing/asserts.ts';
import { getSolutionPart1, getSolutionPart2 } from './index.ts';

// Part 1

Deno.test('Should get one big over many small', () => {
  const lines = ['1', '1', '1', '1', '1', '1', '1', '', '10'];
  const max = getSolutionPart1(lines);
  assertEquals(max, 10);
});

Deno.test('Should get biggest in increasing sequence', () => {
  const lines = ['1', '', '2', '', '3', '', '4'];
  const max = getSolutionPart1(lines);
  assertEquals(max, 4);
});

Deno.test('Should get biggest in decreasing sequence', () => {
  const lines = ['4', '', '3', '', '2', '', '1'];
  const max = getSolutionPart1(lines);
  assertEquals(max, 4);
});

// Part 2

Deno.test('Should get one big over many small', () => {
  const lines = ['1', '1', '1', '1', '1', '1', '1', '', '10'];
  const max = getSolutionPart2(lines);
  assertEquals(max, 17);
});

Deno.test('Should get biggest in increasing sequence', () => {
  const lines = ['1', '', '2', '', '3', '', '4'];
  const max = getSolutionPart2(lines);
  assertEquals(max, 9);
});

Deno.test('Should get biggest in decreasing sequence', () => {
  const lines = ['4', '', '3', '', '2', '', '1'];
  const max = getSolutionPart2(lines);
  assertEquals(max, 9);
});
