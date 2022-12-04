export function getSolutionPart1(lines: string[]) {
  let sum = 0;
  lines.forEach((line) => {
    const [range1, range2] = line.split(',');

    const [start1, end1] = range1.split('-');
    const [start2, end2] = range2.split('-');
    const otherWithinFirst = +start1 <= +start2 && +end1 >= +end2;
    const firstWithinOther = +start2 <= +start1 && +end2 >= +end1;
    if (otherWithinFirst || firstWithinOther) {
      sum++;
    }
  });

  return sum;
}

export function getSolutionPart2(lines: string[]) {
  let sum = 0;
  lines.forEach((line) => {
    const [range1, range2] = line.split(',');

    const [start1, end1] = range1.split('-');
    const [start2, end2] = range2.split('-');
    const otherOverlapFirst = +start1 <= +start2 && +end1 >= +start2;
    const firstOverlapOther = +start2 <= +start1 && +end2 >= +start1;
    if (otherOverlapFirst || firstOverlapOther) {
      sum++;
    }
  });

  return sum;
}

const part = Deno.env.get('part') || 'part1';
const lines = Deno.readTextFileSync('input.txt').split('\n');

let answer;
if (part === 'part1') answer = getSolutionPart1(lines);
if (part === 'part2') answer = getSolutionPart2(lines);

console.log(answer);
