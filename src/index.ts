import { Calendar } from './calendar';
import { getNiconicoEvents, niconicoTargets } from './niconico';
import * as fs from 'fs/promises';
import * as path from 'path';

async function main (): Promise<void> {
  // dist を削除
  await fs.rm(path.join(__dirname, '../dist'), {
    recursive: true,
    force: true
  });

  // Niconico
  for (const target of niconicoTargets) {
    const calendar = new Calendar('koteiou', await getNiconicoEvents(target));
    calendar.saveCalendarToFile('niconico', `${target.type}.ical`);
  }
}

main();
