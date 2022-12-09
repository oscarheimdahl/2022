console.clear();
type Direction = 'R' | 'U' | 'L' | 'D';

export function getSolutionPart1(lines: string[]) {
  const H = { x: 0, y: 0 };
  let T = { x: 0, y: 0 };
  let lastPosH = { x: 0, y: 0 };
  const tailPositions = new Set<string>();

  // function printGrid() {
  //   for (let y = -4; y <= 0; y++) {
  //     let buffer = '';
  //     for (let x = 0; x < 5; x++) {
  //       if (x === H.x && y === H.y) buffer += 'H ';
  //       else if (x === T.x && y === T.y) buffer += 'T ';
  //       else buffer += '. ';
  //     }
  //     console.log(buffer);
  //   }
  //   console.log();
  // }

  function moveHead(dir: Direction) {
    lastPosH = { ...H };
    if (dir === 'R') H.x++;
    if (dir === 'L') H.x--;
    if (dir === 'D') H.y++;
    if (dir === 'U') H.y--;
  }
  function moveTail() {
    const sameRow = T.y === H.y;
    const sameCol = T.x === H.x;
    if (sameRow && sameCol) return;
    if (sameRow) {
      if (T.x - H.x < -1) T.x++;
      if (T.x - H.x > 1) T.x--;
    }
    if (sameCol) {
      if (T.y - H.y < -1) T.y++;
      if (T.y - H.y > 1) T.y--;
    }
    if (Math.pow(Math.pow(T.x - H.x, 2) + Math.pow(T.y - H.y, 2), 0.5) > 2) {
      T = { ...lastPosH };
    }
    tailPositions.add(`${T.x},${T.y}`);
  }

  lines.forEach((line) => {
    const [dir, steps] = line.split(' ');
    for (let i = 0; i < +steps; i++) {
      moveHead(dir as Direction);
      moveTail();
      // printGrid();
    }
  });
  return tailPositions.size;
}

export function getSolutionPart2(lines: string[]) {
  const H = { x: 0, y: 0 };
  const T = [...Array(9)].map(() => ({ ...H }));
  const tailPositions = new Set<string>();

  // let q = 0;
  // async function printGrid() {
  //   q++;
  //   await new Promise((res) => {
  //     setTimeout(() => {
  //       console.clear();
  //       for (let y = -15; y <= 5; y++) {
  //         let buffer = '';
  //         for (let x = -11; x < 15; x++) {
  //           let drawn = false;
  //           if (x === H.x && y === H.y) {
  //             buffer += 'H';
  //             drawn = true;
  //           } else {
  //             for (let s = 0; s < T.length; s++) {
  //               if (x === T[s].x && y === T[s].y && !drawn) {
  //                 buffer += s + 1;
  //                 drawn = true;
  //               }
  //             }
  //           }
  //           if (!drawn) buffer += '.';
  //           buffer += ' ';
  //         }
  //         console.log(buffer);
  //       }
  //       console.log();
  //       res(1);
  //     }, q);
  //   });
  // }

  function moveHead(dir: Direction) {
    if (dir === 'R') H.x++;
    if (dir === 'L') H.x--;
    if (dir === 'D') H.y++;
    if (dir === 'U') H.y--;
  }
  function moveTail(index: number) {
    const Hpart = index > 0 ? { ...T[index - 1] } : { ...H };
    const Tpart = { ...T[index] };

    const sameRow = Tpart.y === Hpart.y;
    const sameCol = Tpart.x === Hpart.x;
    if (sameRow && sameCol) return Tpart;
    if (sameRow) {
      if (Tpart.x - Hpart.x < -1) Tpart.x++;
      if (Tpart.x - Hpart.x > 1) Tpart.x--;
    }
    if (sameCol) {
      if (Tpart.y - Hpart.y < -1) Tpart.y++;
      if (Tpart.y - Hpart.y > 1) Tpart.y--;
    }
    if (Math.pow(Math.pow(Tpart.x - Hpart.x, 2) + Math.pow(Tpart.y - Hpart.y, 2), 0.5) > 2) {
      if (Hpart.x > Tpart.x) Tpart.x++;
      else if (Hpart.x < Tpart.x) Tpart.x--;
      if (Hpart.y > Tpart.y) Tpart.y++;
      else if (Hpart.y < Tpart.y) Tpart.y--;
    }
    return Tpart;
  }

  // await printGrid();
  lines.forEach((line) => {
    const [dir, steps] = line.split(' ');
    for (let i = 0; i < +steps; i++) {
      moveHead(dir as Direction);

      for (let j = 0; j < T.length; j++) {
        // await printGrid();
        T[j] = { ...moveTail(j) };
      }
      tailPositions.add(`${T[T.length - 1].x},${T[T.length - 1].y}`);
    }
  });
  return tailPositions.size;
}

const part = Deno.env.get('part') || 'part1';
const lines = Deno.readTextFileSync('input.txt').split('\n');

let answer;
if (part === 'part1') answer = getSolutionPart1(lines);
if (part === 'part2') answer = getSolutionPart2(lines);

console.log(answer);
