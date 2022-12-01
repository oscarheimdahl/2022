const lines = Deno.readTextFileSync('input.txt').split('\n');

export function getSolutionPart1(lines: string[]) {
  let sum = 0;
  let max = 0;
  lines.forEach((cals, i) => {
    sum += +cals;
    if (!cals || i === lines.length - 1) {
      if (sum > max) max = sum;

      sum = 0;
      return;
    }
  });
  return max;
}

export function getSolutionPart2(lines: string[]) {
  let sum = 0;
  const maxes = [0, 0, 0];
  lines.forEach((cals, i) => {
    sum += +cals;
    //I love bubbles 🫧
    if (!cals || i === lines.length - 1) {
      if (sum > maxes[0]) {
        [maxes[1], maxes[2]] = [maxes[2], maxes[1]];
        [maxes[0], maxes[1]] = [maxes[1], maxes[0]];
        maxes[0] = sum;
      } else if (sum > maxes[1]) {
        [maxes[1], maxes[2]] = [maxes[2], maxes[1]];
        maxes[1] = sum;
      } else if (sum > maxes[2]) {
        maxes[2] = sum;
      }

      sum = 0;
      return;
    }
  });
  return maxes[0] + maxes[1] + maxes[2];
}

const part = Deno.env.get('part') || 'part1';

if (part === 'part1') console.log(getSolutionPart1(lines));
else console.log(getSolutionPart2(lines));
