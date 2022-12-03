const lettersToPrioritySum = (letters: string[]) =>
  letters.reduce((acc, itemPair) => {
    let code = itemPair.charCodeAt(0);
    if (code < 'a'.charCodeAt(0)) code -= 38;
    else code -= 96;
    return code + acc;
  }, 0);

export function getSolutionPart1(lines: string[]) {
  const letters: string[] = [];
  lines.forEach((rucksack) => {
    const compartment1 = rucksack.substring(0, rucksack.length / 2);
    const compartment2 = rucksack.substring(rucksack.length / 2, rucksack.length);
    const uniqueItems = new Set();
    let pairFound = false;

    [...compartment1].forEach((item) => uniqueItems.add(item));
    [...compartment2].forEach((item) => {
      if (uniqueItems.has(item) && !pairFound) {
        letters.push(item);
        pairFound = true;
      }
    });
  });

  const sum = lettersToPrioritySum(letters);

  return sum;
}

export function getSolutionPart2(lines: string[]) {
  const letters: string[] = [];

  lines.forEach((rucksack1, i) => {
    if (i % 3 != 0) return;
    const rucksack2 = lines[i + 1];
    const rucksack3 = lines[i + 2];
    const stringLettersToSet = (s: string) => {
      const set = new Set<string>();
      [...s].forEach((letter) => set.add(letter));
      return set;
    };
    const unique1 = stringLettersToSet(rucksack1);
    const unique2 = stringLettersToSet(rucksack2);
    const unique3 = stringLettersToSet(rucksack3);
    let found = false;
    unique1.forEach((letter) => {
      if (!found && unique2.has(letter) && unique3.has(letter)) {
        letters.push(letter);
        found = true;
      }
    });
  });

  const sum = lettersToPrioritySum(letters);

  return sum;
}

const part = Deno.env.get('part') || 'part1';
const lines = Deno.readTextFileSync('input.txt').split('\n');

let answer;
if (part === 'part1') answer = getSolutionPart1(lines);
if (part === 'part2') answer = getSolutionPart2(lines);

console.log(answer);
