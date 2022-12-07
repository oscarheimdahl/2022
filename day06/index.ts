function print(lastFourChars: string[], input: string, i: number) {
  let buffer = '';
  const styles: string[] = [];
  lastFourChars.forEach((u) => {
    const duplicate = lastFourChars.reduce((acc, val) => +(val === u) + acc, 0) > 1;
    if (duplicate) {
      buffer += '%c' + u;
      styles.push('background-color: red');
    } else {
      buffer += '%c' + u;
      styles.push('background-color: green');
    }
  });
  buffer += '%c' + input.substring(i + 1, i + 30);
  styles.push('background-color: none');

  setTimeout(() => {
    console.clear();
    console.log(buffer, ...styles);
    console.log();
  }, 100 * i);
}

const seqLen = 4;
export function getSolutionPart1(lines: string[]) {
  let index = 0;
  const input = lines[0];
  const lastFourChars: string[] = [];
  const unique = new Set();

  [...input].forEach((char, i) => {
    unique.clear();
    if (index) return;
    lastFourChars.push(char);
    if (lastFourChars.length > seqLen) lastFourChars.shift();
    lastFourChars.forEach((c) => unique.add(c));
    if (unique.size === seqLen) index = i + 1;
    //
    print(lastFourChars, input, i);
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
