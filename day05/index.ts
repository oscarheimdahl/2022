const frames: string[] = [];
let q = 0;
const printStacks = (stacksStr: string) => {
  const stacks: string[][] = JSON.parse(stacksStr);
  const max = stacks.reduce((prev, curr) => Math.max(prev, curr.length), 0);
  stacks.forEach((stack) => {
    const diff = max - stack.length;
    for (let i = 0; i < diff; i++) {
      stack.unshift('');
    }
  });

  let bufferPrint = '';
  let bufferFrame = '';

  for (let y = 0; y < max; y++) {
    for (let x = 0; x < stacks.length; x++) {
      const cell = stacks[x][y];
      if (!cell) {
        bufferPrint += '    ';
        bufferFrame += ' ';
      } else {
        bufferPrint += `[${cell}] `;
        bufferFrame += cell;
      }
    }
    bufferPrint += '\n';
    bufferFrame += '\n';
  }

  frames.push(bufferFrame);
};

export function getSolutionPart1(lines: string[]) {
  let readingCrates = true;
  const cols = (lines[0].length + 1) / 4;
  const stacks: string[][] = Array.from(Array(cols), () => []);

  lines.forEach((line) => {
    if (!line) return;
    if (line.startsWith(' 1')) {
      readingCrates = false;
      return;
    }

    if (readingCrates) {
      let crateStart = -1;
      while (true) {
        crateStart = line.indexOf('[', crateStart + 1);
        if (crateStart < 0) break;
        const stackNum = crateStart / 4;
        stacks[stackNum].push(line[crateStart + 1]);
      }
      return;
    }

    const [, amount, , from, , to] = line.split(' ') as unknown as number[];

    for (let i = 0; i < amount; i++) {
      const crate = stacks[from - 1].shift() as string;
      stacks[to - 1].unshift(crate);
      printStacks(JSON.stringify(stacks));
    }
  });
  const encoder = new TextEncoder();
  const data = encoder.encode(JSON.stringify({ frames }));
  Deno.writeFileSync('frames.txt', data);

  return stacks.map((stack) => stack[0]).join('');
}

export function getSolutionPart2(lines: string[]) {
  let readingCrates = true;
  const cols = (lines[0].length + 1) / 4;
  const stacks: string[][] = Array.from(Array(cols), () => []);

  lines.forEach((line) => {
    if (!line) return;
    if (line.startsWith(' 1')) return (readingCrates = false);

    if (readingCrates) {
      let crateStart = -1;
      while (true) {
        crateStart = line.indexOf('[', crateStart + 1);
        if (crateStart < 0) break;
        const stackNum = crateStart / 4;
        stacks[stackNum].push(line[crateStart + 1]);
      }
      return;
    }

    const [, amount, , from, , to] = line.split(' ') as unknown as number[];

    const crates = stacks[from - 1].splice(0, amount);
    crates.reverse().forEach((crate) => stacks[to - 1].unshift(crate));
  });

  return stacks.map((stack) => stack[0]).join('');
}

const part = Deno.env.get('part') || 'part1';
const lines = Deno.readTextFileSync('input.txt').split('\n');

let answer;
if (part === 'part1') answer = getSolutionPart1(lines);
if (part === 'part2') answer = getSolutionPart2(lines);

console.log(answer);
