interface Meta {
  size: number;
}

interface Dir {
  [key: string]: string | Dir;
}

function buildTree(lines: string[]) {
  const tree: Dir = {
    // __meta: {
    //   size: 0,
    // },
  };
  const path: Dir[] = [];
  let wd = tree;

  const cd = (dir: string) => {
    if (dir === '..') {
      path.pop();
      wd = path[path.length - 1];
      return;
    }
    const newDir: Dir = {}; //{ __meta: { size: 0 } };
    wd[dir] = newDir;
    wd = newDir;
    path.push(wd);
  };

  const ls = (type: string, name: string) => {
    const file = Number.isInteger(+type);
    if (file) {
      // (wd.__meta as Meta).size += +type;
      wd[name] = type;
    }
  };

  lines.forEach((line) => {
    const words = line.split(' ');
    const command = words[0] === '$';
    if (command) {
      if (words[1] === 'cd') cd(words[2]);
    } else ls(words[0], words[1]);
  });

  return tree;
}

export function getSolutionPart1(lines: string[]) {
  const tree = buildTree(lines);

  const nodes: Dir[] = [tree as Dir];

  const traverseAndCount = (node: Dir | string, acc: number, addNodes: boolean) => {
    let sum = 0;
    Object.values(node).forEach((subNode) => {
      const isFile = typeof subNode === 'string';
      if (isFile) {
        sum += +subNode;
      } else {
        sum += traverseAndCount(subNode, 0, false);
        if (addNodes) nodes.push(subNode);
      }
    });
    return sum + acc;
  };

  let sum = 0;
  do {
    const dirSum = traverseAndCount(nodes[0] as Dir, 0, true);
    nodes.shift();
    if (dirSum <= 100000) sum += dirSum;
  } while (nodes.length > 0);

  return sum;
}

export function getSolutionPart2(lines: string[]) {
  const totalSize = 70000000;
  const updateSize = 30000000;
  const tree = buildTree(lines);

  const nodes: Dir[] = [tree as Dir];

  const traverseAndCount = (node: Dir | string, acc: number, addNodes: boolean) => {
    let sum = 0;
    Object.values(node).forEach((subNode) => {
      const isFile = typeof subNode === 'string';
      if (isFile) {
        sum += +subNode;
      } else {
        sum += traverseAndCount(subNode, 0, false);
        if (addNodes) nodes.push(subNode);
      }
    });
    return sum + acc;
  };

  let spaceNeeded = 0;
  let smallestOkDir = Infinity;
  let rootSize = null;
  do {
    const dirSize = traverseAndCount(nodes[0] as Dir, 0, true);
    if (!rootSize) {
      rootSize = dirSize;
      spaceNeeded = updateSize - (totalSize - rootSize);
    } else if (dirSize !== rootSize && dirSize >= spaceNeeded) {
      smallestOkDir = Math.min(dirSize, smallestOkDir);
    }
    nodes.shift();
  } while (nodes.length > 0);

  return smallestOkDir;
}

const part = Deno.env.get('part') || 'part1';
const lines = Deno.readTextFileSync('input.txt').split('\n');

let answer;
if (part === 'part1') answer = getSolutionPart1(lines);
if (part === 'part2') answer = getSolutionPart2(lines);

console.log(answer);
