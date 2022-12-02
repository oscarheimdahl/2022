const lines = Deno.readTextFileSync('input.txt').split('\n');

const movesA = {
  rock: 'A',
  paper: 'B',
  scissors: 'C',
};

const movesB = {
  rock: { label: 'X', score: 1 },
  paper: { label: 'Y', score: 2 },
  scissors: { label: 'Z', score: 3 },
};

const resultToScore = {
  loss: 0,
  draw: 3,
  win: 6,
};

export function getSolutionPart1(lines: string[]) {
  let sum = 0;

  lines.forEach((line) => {
    const [a, b] = line.split(' ');

    switch (a) {
      case movesA.rock: {
        switch (b) {
          case movesB.rock.label:
            return (sum += resultToScore.draw + movesB.rock.score);
          case movesB.paper.label:
            return (sum += resultToScore.win + movesB.paper.score);
          case movesB.scissors.label:
            return (sum += resultToScore.loss + movesB.scissors.score);
        }
        break;
      }
      case movesA.paper: {
        switch (b) {
          case movesB.rock.label:
            return (sum += resultToScore.loss + movesB.rock.score);
          case movesB.paper.label:
            return (sum += resultToScore.draw + movesB.paper.score);
          case movesB.scissors.label:
            return (sum += resultToScore.win + movesB.scissors.score);
        }
        break;
      }
      case movesA.scissors: {
        switch (b) {
          case movesB.rock.label:
            return (sum += resultToScore.win + movesB.rock.score);
          case movesB.paper.label:
            return (sum += resultToScore.loss + movesB.paper.score);
          case movesB.scissors.label:
            return (sum += resultToScore.draw + movesB.scissors.score);
        }
        break;
      }
    }
  });
  return sum;
}

export function getSolutionPart2(lines: string[]) {
  const res = {
    win: 'Z',
    draw: 'Y',
    loss: 'X',
  };
  let sum = 0;

  lines.forEach((line) => {
    console.log({ line });
    const [a, b] = line.split(' ');

    switch (a) {
      case movesA.rock: {
        switch (b) {
          case res.win:
            return (sum += resultToScore.win + movesB.paper.score);
          case res.draw:
            return (sum += resultToScore.draw + movesB.rock.score);
          case res.loss:
            return (sum += resultToScore.loss + movesB.scissors.score);
        }
        break;
      }
      case movesA.paper: {
        switch (b) {
          case res.win:
            return (sum += resultToScore.win + movesB.scissors.score);
          case res.draw:
            return (sum += resultToScore.draw + movesB.paper.score);
          case res.loss:
            return (sum += resultToScore.loss + movesB.rock.score);
        }
        break;
      }
      case movesA.scissors: {
        switch (b) {
          case res.win:
            return (sum += resultToScore.win + movesB.rock.score);
          case res.draw:
            return (sum += resultToScore.draw + movesB.scissors.score);
          case res.loss:
            return (sum += resultToScore.loss + movesB.paper.score);
        }
        break;
      }
    }
  });
  return sum;
}

const part = Deno.env.get('part') || 'part1';

if (part === 'part1') console.log(getSolutionPart1(lines));
else console.log(getSolutionPart2(lines));
