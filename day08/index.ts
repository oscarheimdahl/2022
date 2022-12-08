export function getSolutionPart1(lines: string[]) {
  const grid = lines.map((row) => [...row].map((tree) => +tree));
  const dimY = grid.length;
  const dimX = grid[0].length;

  const countedTrees = new Map<string, boolean>();

  let visibleTrees = 0;

  function compareTrees(y: number, x: number, lastHighestTree: number) {
    const currentTree = grid[y][x];
    if (currentTree > lastHighestTree) {
      lastHighestTree = currentTree;
      const key = x + ',' + y;
      if (!countedTrees.get(key)) {
        visibleTrees++;
        countedTrees.set(key, true);
      }
    }
    return lastHighestTree;
  }

  // Left to right
  for (let y = 0; y < dimY; y++) {
    let lastHighestTree = -1;
    for (let x = 0; x < dimX; x++) {
      lastHighestTree = compareTrees(y, x, lastHighestTree);
    }
  }
  // Right to left
  for (let y = 0; y < dimY; y++) {
    let lastHighestTree = -1;
    for (let x = dimX - 1; x > 0; x--) {
      lastHighestTree = compareTrees(y, x, lastHighestTree);
    }
  }

  // Top to bottom
  for (let x = 0; x < dimX; x++) {
    let lastHighestTree = -1;
    for (let y = 0; y < dimY; y++) {
      lastHighestTree = compareTrees(y, x, lastHighestTree);
    }
  }

  // Bottom to top
  for (let x = 0; x < dimX; x++) {
    let lastHighestTree = -1;
    for (let y = dimY - 1; y > 0; y--) {
      lastHighestTree = compareTrees(y, x, lastHighestTree);
    }
  }

  return visibleTrees;
}

export function getSolutionPart2(lines: string[]) {
  const grid = lines.map((row) => [...row].map((tree) => +tree));
  const dimY = grid.length;
  const dimX = grid[0].length;

  function countScenicScore(x: number, y: number) {
    const topCoords = { from: y - 1, to: 0 };
    const bottomCoords = { from: y + 1, to: dimY - 1 };
    const rightCoords = { from: x + 1, to: dimX - 1 };
    const leftCoords = { from: x - 1, to: 0 };

    const originTree = grid[y][x];

    let top = 0;
    for (let i = topCoords.from; i >= topCoords.to; i--) {
      top++;
      if (grid[i][x] >= originTree) break;
    }
    let left = 0;
    for (let i = leftCoords.from; i >= leftCoords.to; i--) {
      left++;
      if (grid[y][i] >= originTree) break;
    }
    let bottom = 0;
    for (let i = bottomCoords.from; i <= bottomCoords.to; i++) {
      bottom++;
      if (grid[i][x] >= originTree) break;
    }
    let right = 0;
    for (let i = rightCoords.from; i <= rightCoords.to; i++) {
      right++;
      if (grid[y][i] >= originTree) break;
    }
    return top * right * bottom * left;
  }

  let max = 0;
  for (let y = 0; y < dimY; y++) {
    for (let x = 0; x < dimX; x++) {
      const score = countScenicScore(x, y);
      max = Math.max(max, score);
    }
  }
  return max;
}

const part = Deno.env.get('part') || 'part1';
const lines = Deno.readTextFileSync('input.txt').split('\n');

let answer;
if (part === 'part1') answer = getSolutionPart1(lines);
if (part === 'part2') answer = getSolutionPart2(lines);

console.log(answer);
