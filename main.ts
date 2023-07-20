// Yann CARDON 2023
// Times of Legend, Joan of Arc dice rolls

import * as dice from "./dice-lib.ts";

const FRENCH_SYNTAX = true;
const DEBUG = false;

/** CLI dice wrapper */
function parseCLI(command: string[]) {
  const attackDice = new Map();
  const defenceDice = new Map();
  let isDefence = false;

  command.map((arg) => {
    const times = parseInt(arg.slice(0, -1)) || 1;
    switch (arg.slice(-1)) {
      // defense switch
      case "-":
      case "/":
      case ":":
        isDefence = true;
        break;

      // [N]oir
      case "N":
      case "n":
        addAttackOrDefense(new dice.BlackDice(), times);
        break;

      // [R]ouge or [R]ed
      case "R":
      case "r":
        addAttackOrDefense(new dice.RedDice(), times);
        break;

      // [J]aune or [Y]ellow
      case "J":
      case "j":
      case "Y":
      case "y":
        addAttackOrDefense(new dice.YellowDice(), times);
        break;

      // [B]lanc or [B]lack
      case "B":
      case "b":
        if (FRENCH_SYNTAX) addAttackOrDefense(new dice.WhiteDice(), times);
        else addAttackOrDefense(new dice.BlackDice(), times);
        break;

      // [W]hite
      case "W":
      case "w":
        addAttackOrDefense(new dice.WhiteDice(), times);
        break;

      // [G]igantesque or [G]igantic
      case "G":
      case "g":
        addAttackOrDefense(new dice.GiganticDice(), times);
        break;

      // [D]estin or [D]oom
      case "D":
      case "d":
        addAttackOrDefense(new dice.DoomDice(), times);
        break;

      default:
        console.error("bad syntax, example: 3R W - 2Y");
        Deno.exit(-1);
    }
  });

  console.log(dice.attack(attackDice, defenceDice));

  /** add the dice result either to attack or defence according to the CLI context */
  function addAttackOrDefense(dice: dice.Dice, times: number) {
    if (isDefence) defenceDice.set(dice, times + (defenceDice.get(dice) || 0));
    else attackDice.set(dice, times + (attackDice.get(dice) || 0));
  }
}

// disable debug logs
// deno-lint-ignore no-explicit-any
if (!DEBUG) console.debug = (..._: any[]) => {};

// parse CLI and roll dices
parseCLI(Deno.args);
