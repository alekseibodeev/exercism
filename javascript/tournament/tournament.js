const pts = {
  won: 3,
  drawn: 1,
  lost: 0,
};

const record = function (team, matchResult, dataStorage) {
  if (!dataStorage.has(team)) {
    dataStorage.set(
      team,
      new Map([
        ['played', 0],
        ['won', 0],
        ['drawn', 0],
        ['lost', 0],
      ])
    );
  }

  const teamStorage = dataStorage.get(team);
  teamStorage.set('played', teamStorage.get('played') + 1);
  teamStorage.set(matchResult, teamStorage.get(matchResult) + 1);
};

const teamFieldLenght = 30;

const createFirstLine = function () {
  return 'Team                           | MP |  W |  D |  L |  P';
};

const formatNumber = function (n) {
  const str = n.toString();
  if (str.length === 1) return ' ' + str;
  return str;
};

const createLine = function (team, points, dataStorage) {
  const fields = [];
  const teamStorage = dataStorage.get(team);
  const extraSpace = teamFieldLenght - team.length;

  fields.push(team + ' '.repeat(extraSpace));

  for (const [_, count] of teamStorage) {
    fields.push(formatNumber(count));
  }

  fields.push(formatNumber(points));

  return fields.join(' | ');
};

export const tournamentTally = function (inputString) {
  if (!inputString) return createFirstLine();

  const dataStorage = new Map();

  for (const line of inputString.split('\n')) {
    const [team1, team2, matchResult] = line.split(';');
    if (matchResult === 'win') {
      record(team1, 'won', dataStorage);
      record(team2, 'lost', dataStorage);
    } else if (matchResult === 'loss') {
      record(team1, 'lost', dataStorage);
      record(team2, 'won', dataStorage);
    } else {
      record(team1, 'drawn', dataStorage);
      record(team2, 'drawn', dataStorage);
    }
  }

  const teamPoints = [];

  for (const [team, results] of dataStorage) {
    let points = 0;

    points += results.get('won') * pts.won;
    points += results.get('drawn') * pts.drawn;
    points += results.get('lost') * pts.lost;

    teamPoints.push([team, points]);
  }

  teamPoints.sort((a, b) => {
    if (a[1] > b[1]) return -1;
    if (a[1] < b[1]) return 1;
    if (a[0] < b[0]) return -1;
    if (a[0] > b[0]) return 1;
    return 0;
  });

  const table = [];

  table.push(createFirstLine());

  for (const [team, points] of teamPoints) {
    table.push(createLine(team, points, dataStorage));
  }

  return table.join('\n');
};
