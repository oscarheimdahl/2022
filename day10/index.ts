export function getSolutionPart1(lines: string[]) {
  let cycles = 1;
  let x = 1;
  let addx = 0;
  let nextCycle = 1;
  const signals: number[] = [];
  let i = 0;

  while (i < lines.length) {
    if (cycles === nextCycle) {
      if (addx) {
        x += addx;
        addx = 0;
      }
      const line = lines[i];
      if (line.startsWith('addx')) {
        addx = +line.split(' ')[1];
        nextCycle += 2;
      } else nextCycle++; // noop
      i++;
    }
    if ((cycles - 20) % 40 === 0) signals.push(x * cycles);
    cycles++;
  }
  return signals.reduce((acc, val) => acc + val, 0);
}

export function getSolutionPart2(lines: string[]) {
  let cycles = 1;
  let x = 1;
  let addx = 0;
  let nextCycle = 1;
  const signals: number[] = [];
  let i = 0;
  let buffer = '';

  function draw() {
    const drawX = (cycles - 1) % 40;
    if (Math.abs(x - drawX) < 2) buffer += '🔴';
    else buffer += '  ';
    if (drawX === 39) buffer += '\n';
  }

  while (i < lines.length) {
    if (cycles === nextCycle) {
      if (addx) {
        x += addx;
        addx = 0;
      }
      const line = lines[i];
      if (line.startsWith('addx')) {
        addx = +line.split(' ')[1];
        nextCycle += 2;
      } else nextCycle++; // noop
      i++;
    }
    if ((cycles - 20) % 40 === 0) signals.push(x * cycles);

    draw();
    cycles++;
  }
  console.log(buffer);
  return signals.reduce((acc, val) => acc + val, 0);
}

const part = Deno.env.get('part') || 'part1';
const lines = Deno.readTextFileSync('input.txt').split('\n');

let answer;
if (part === 'part1') answer = getSolutionPart1(lines);
if (part === 'part2') answer = getSolutionPart2(lines);

console.log(answer);
