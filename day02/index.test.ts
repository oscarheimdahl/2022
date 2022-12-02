import { assertEquals } from 'https://deno.land/std@0.166.0/testing/asserts.ts';
import { getSolutionPart1, getSolutionPart2 } from './index.ts';

// Part 1

// Part 2

const win = 6; // Z
const draw = 3; // Y
const loss = 0; // X

const rock = 1; // A
const paper = 2; // B
const scissors = 3; // C

Deno.test('[Rock | Win] should win with paper', () => {
  const lines = ['A Z'];
  const score = getSolutionPart2(lines);
  assertEquals(score, win + paper);
});

Deno.test('[Rock | Draw] should draw with rock', () => {
  const lines = ['A Y'];
  const score = getSolutionPart2(lines);
  assertEquals(score, draw + rock);
});
