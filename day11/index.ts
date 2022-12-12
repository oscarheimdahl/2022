interface Monkey {
  items: number[];
  operation: (old: number) => number;
  test: (worry: number) => number;
  inspections: 0;
  // nextMonkey: (i: number) => { otherMonkey: number; item: number };
}

export function getSolutionPart1(lines: string[]) {
  const monkeys: Monkey[] = [];
  const monkey: Monkey = {
    items: [],
    operation: () => 0,
    test: () => 0,
    inspections: 0,
  };

  function parseOperation(operationString: string) {
    const [, operator, val] = operationString.split('new = ')[1].split(' ');

    return (old: number) => {
      let term = 0;
      if (val === 'old') term = old;
      else term = +val;
      let newVal = 0;
      if (operator === '*') newVal = old * term;
      else newVal = old + +val;
      return Math.floor(newVal / 3);
    };
  }

  function parseTest(test: string, ifTrue: string, ifFalse: string) {
    const finalWordAsNum = (str: string) => +(str.split(' ').at(-1) as string);
    const divisibleBy = finalWordAsNum(test);
    const ifTrueNum = finalWordAsNum(ifTrue);
    const ifFalseNum = finalWordAsNum(ifFalse);

    return (worry: number) => {
      if (worry % divisibleBy === 0) return ifTrueNum;
      return ifFalseNum;
    };
  }

  for (let i = 0; i < lines.length - 2; i++) {
    const line = lines[i];
    if (!line) {
      monkeys.push({ ...monkey });
      continue;
    }
    const words = line.split(': ');
    const key = words[0].trim();
    if (key === 'Starting items') {
      monkey.items = words[1].split(', ').map((n) => +n);
    }
    if (key === 'Operation') {
      monkey.operation = parseOperation(words[1]);
    }
    if (key === 'Test') {
      monkey.test = parseTest(words[1], lines[i + 1], lines[i + 2]);
      i += 2;
    }
  }
  monkeys.push({ ...monkey });

  for (let r = 0; r < 20; r++) {
    for (let i = 0; i < monkeys.length; i++) {
      const monkey = monkeys[i];

      for (let j = 0; j < monkey.items.length; j++) {
        const item = monkey.items[j];
        const newItem = monkey.operation(item);
        monkey.inspections++;
        const newMonkey = monkey.test(newItem);
        monkeys[newMonkey].items.push(newItem);
      }
      monkey.items = [];
    }
  }
  const [a, b] = monkeys.sort((a, b) => b.inspections - a.inspections).slice(0, 2);

  return a.inspections * b.inspections;
}

export function getSolutionPart2(lines: string[]) {
  const divisibleBys: number[] = [];
  const monkeys: Monkey[] = [];
  const monkey: Monkey = {
    items: [],
    operation: () => 0,
    test: () => 0,
    inspections: 0,
  };
  let scd = 0;

  function parseOperation(operationString: string) {
    const [, operator, val] = operationString.split('new = ')[1].split(' ');

    return (old: number) => {
      const scds = Math.floor(old / scd);
      if (scds > 0) old = old - scds * scd;
      let term = 0;
      if (val === 'old') term = old;
      else term = +val;
      let newVal = 0;
      if (operator === '*') newVal = old * term;
      else newVal = old + +val;
      return newVal;
    };
  }

  function parseTest(test: string, ifTrue: string, ifFalse: string) {
    const finalWordAsNum = (str: string) => +(str.split(' ').at(-1) as string);
    const divisibleBy = finalWordAsNum(test);
    divisibleBys.push(divisibleBy);
    const ifTrueNum = finalWordAsNum(ifTrue);
    const ifFalseNum = finalWordAsNum(ifFalse);

    return (worry: number) => {
      if (worry % divisibleBy === 0) return ifTrueNum;
      return ifFalseNum;
    };
  }

  for (let i = 0; i < lines.length - 2; i++) {
    const line = lines[i];
    if (!line) {
      monkeys.push({ ...monkey });
      continue;
    }
    const words = line.split(': ');
    const key = words[0].trim();
    if (key === 'Starting items') {
      monkey.items = words[1].split(', ').map((n) => +n);
    }
    if (key === 'Operation') {
      monkey.operation = parseOperation(words[1]);
    }
    if (key === 'Test') {
      monkey.test = parseTest(words[1], lines[i + 1], lines[i + 2]);
      i += 2;
    }
  }
  monkeys.push({ ...monkey });

  scd = divisibleBys.reduce((acc, val) => acc * val, 1);

  for (let r = 0; r < 10000; r++) {
    for (let i = 0; i < monkeys.length; i++) {
      const monkey = monkeys[i];

      for (let j = 0; j < monkey.items.length; j++) {
        const item = monkey.items[j];
        const newItem = monkey.operation(item);
        monkey.inspections++;
        const newMonkey = monkey.test(newItem);
        monkeys[newMonkey].items.push(newItem);
      }
      monkey.items = [];
    }
  }
  const [a, b] = monkeys.sort((a, b) => b.inspections - a.inspections).slice(0, 2);

  return a.inspections * b.inspections;
}

const part = Deno.env.get('part') || 'part1';
const lines = Deno.readTextFileSync('input.txt').split('\n');

let answer;
if (part === 'part1') answer = getSolutionPart1(lines);
if (part === 'part2') answer = getSolutionPart2(lines);

console.log(answer);
