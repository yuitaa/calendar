import { Calendar } from './calendar';
import { getNiconicoEvents, niconicoTargets } from './niconico';
import * as fs from 'fs/promises';
import * as path from 'path';
import { createIndexHtml } from './html';

async function main(): Promise<void> {
  // dist を削除
  await fs.rm(path.join(__dirname, '../dist'), {
    recursive: true,
    force: true,
  });

  // Niconico
  for (const target of niconicoTargets) {
    const calendar = new Calendar('koteiou', await getNiconicoEvents(target));
    await calendar.saveCalendarToFile('niconico', `${target.type}.ical`);
  }

  const indexHtml = createIndexHtml(Calendar.savedCalendarPaths);

  await fs.writeFile(path.join(__dirname, '../dist/index.html'), indexHtml);
}

main();
