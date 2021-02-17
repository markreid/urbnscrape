import chalk from 'chalk';
import inquirer from 'inquirer';

import { boot, getSessionsForDay, WAVE_CODES } from './lib/api.js';
import { getToday, nextDay, printDate } from './lib/date.js';

const DEFAULT_WAVE = 'Intermediate Right';
const MODES = {
  WEEK: 'Sessions this week',
  NEXT: 'Next available sessions',
};

const printDay = async (date) => {
  console.log(`\n${printDate(date)}`);
  const sessions = await getSessionsForDay(date);
  sessions.forEach((session) => {
    const highlight = session.availableSeats ? chalk.green : chalk;
    console.log(highlight(`${session.name}: ${session.availableSeats}`));
  });
  return sessions;
};

const printDays = async (numDays = 7) => {
  let date = getToday();
  while (numDays--) {
    await printDay(date);
    date = nextDay(date);
  }
};

const findAnAvailableSession = async (maxDays = 28, maxResults = 3) => {
  let date = getToday();
  let found = 0;
  while (maxDays--) {
    console.log(`checking ${printDate(date)}...`);
    const sessions = await getSessionsForDay(date);
    const availableSessions = sessions
      .filter((session) => session.availableSeats)
      .slice(0, maxResults - found);

    if (availableSessions.length) {
      found += availableSessions.length;
      availableSessions.forEach((session) => {
        console.log(
          chalk.green(`${session.name}: ${session.availableSeats} available`)
        );
      });
      if (found >= maxResults) return true;
    } else {
      console.log(`no sessions available for ${printDate(date)}`);
    }
    date = nextDay(date);
  }
  return false;
};

const run = async () => {
  const { wave, mode } = await inquirer.prompt([
    {
      name: 'wave',
      type: 'list',
      choices: Object.keys(WAVE_CODES),
      default: DEFAULT_WAVE,
    },
    {
      name: 'mode',
      type: 'list',
      choices: Object.values(MODES),
    },
  ]);

  try {
    await boot(wave);
  } catch (error) {
    console.log('error in boot()');
    console.error(error);
    return false;
  }

  switch (mode) {
    case MODES.WEEK:
      return printDays(7);
    case MODES.NEXT:
      return findAnAvailableSession();
    default:
      return;
  }
};

run();
