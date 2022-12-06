const seqLen = 4;
export function getSolutionPart1(lines: string[]) {
  let index = 0;
  const a = lines[0];
  const lastFourChars: string[] = [];
  const unique = new Set();

  [...a].forEach((char, i) => {
    if (index) return;
    lastFourChars.push(char);
    if (lastFourChars.length > seqLen) lastFourChars.shift();
    lastFourChars.forEach((c) => {
      unique.add(c);
    });
    if (unique.size === seqLen) index = i + 1;
    unique.clear();
  });
  return index;
}

const seqLenMes = 14;
export function getSolutionPart2(lines: string[]) {
  let index = 0;
  const a = lines[0];
  const lastFourChars: string[] = [];
  const unique = new Set();

  [...a].forEach((char, i) => {
    if (index) return;
    lastFourChars.push(char);
    if (lastFourChars.length > seqLenMes) lastFourChars.shift();
    lastFourChars.forEach((c) => {
      unique.add(c);
    });
    if (unique.size === seqLenMes) index = i + 1;
    unique.clear();
  });
  return index;
}

const part = Deno.env.get('part') || 'part1';
const lines = Deno.readTextFileSync('input.txt').split('\n');

let answer;
if (part === 'part1') answer = getSolutionPart1(lines);
if (part === 'part2') answer = getSolutionPart2(lines);

console.log(answer);
