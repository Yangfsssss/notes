/** Item27: 使用函数式构造和库来帮助类型流转，Use Functional Constructs and Libraries to Help Types Flow*/
export interface BasketballPlayers {
  name: string;
  team: string;
  salary: number;
}

declare const rosters: { [team: string]: BasketballPlayers[] };
//use a type annotation:
let allPlayers: BasketballPlayers[] = [];

for (const players of Object.values(rosters)) {
  allPlayers = allPlayers.concat(players);
}

//or use Array.prototype.flat()
const allPlayers1 = Object.values(rosters).flat();

//Say you want to start with allPlayers and make a list of the highest-paid players on each team ordered by salary.
function getBestPaid() {
  const teamToPlayers: { [team: string]: BasketballPlayers[] } = {};

  for (const player of allPlayers) {
    const { team } = player;
    teamToPlayers[team] = teamToPlayers[team] || [];
    teamToPlayers[team].push(player);
  }

  for (const players of Object.values(teamToPlayers)) {
    players.sort((a, b) => b.salary - a.salary);
  }

  const bestPaid = Object.values(teamToPlayers).map((players) => players[0]);
  bestPaid.sort((playerA, playerB) => playerB.salary - playerA.salary);

  return bestPaid;
}

//equivalent with Lodash:
import * as _ from 'lodash';
function getBestPaidUsingLodash() {
  const bestPaid = _(allPlayers)
    .groupBy((player) => player.team)
    .mapValues((players) => _.maxBy(players, (p) => p.salary)!)
    .values()
    .sortBy((p) => -p.salary)
    .value();

  return bestPaid;
}

//Things to Remember
//• Use built-in functional constructs and those in utility libraries like Lodash
//instead of hand-rolled constructs to improve type flow, increase legibility, and
//reduce the need for explicit type annotations.
