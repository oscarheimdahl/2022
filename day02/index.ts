const lines = Deno.readTextFileSync('input.txt').split('\n');

const movesA = {
  rock: 'A',
  paper: 'B',
  scissors: 'C',
};

const movesB = {
  rock: 'X',
  paper: 'Y',
  scissors: 'Z',
};

const moveToScore = {
  X: 1,
  Y: 2,
  Z: 3,
};

export function getSolutionPart1(lines: string[]) {
  console.log(lines);
}

export function getSolutionPart2(lines: string[]) {}

const part = Deno.env.get('part') || 'part1';

if (part === 'part1') console.log(getSolutionPart1(lines));
else console.log(getSolutionPart2(lines));
