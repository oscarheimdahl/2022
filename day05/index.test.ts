import { assertEquals } from 'https://deno.land/std@0.166.0/testing/asserts.ts';
import { getSolutionPart1, getSolutionPart2 } from './index.ts';

// Part 1
Deno.test('Test input should be 157', () => {
  const input = ['2-4,6-8', '2-3,4-5', '5-7,7-9', '2-8,3-7', '6-6,4-6', '2-6,4-8'];
  const res = getSolutionPart1(input);
  assertEquals(res, 2);
});

Deno.test('Edges should count', () => {
  const input = ['1-1,1-100', '1-100,1-1', '100-100,1-100', '1-100,100-100'];
  const res = getSolutionPart1(input);
  assertEquals(res, 4);
});

Deno.test('Big overlap should not count', () => {
  const input = ['1-10,2-11', '1-100,2-101', '91-99,90-98', '101-120,100-119'];
  const res = getSolutionPart1(input);
  assertEquals(res, 0);
});

Deno.test('Small overlap should not count', () => {
  const input = ['9-10,10-11', '1-100,2-101', '91-99,90-98', '101-120,100-119'];
  const res = getSolutionPart1(input);
  assertEquals(res, 0);
});

//Part 2
// Deno.test('Test input should be 70', () => {
//   const res = getSolutionPart2(input);
//   assertEquals(res, 70);
// });
