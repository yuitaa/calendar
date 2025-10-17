import { Calendar } from './calendar';
import { getNiconicoEvents, niconicoTargets } from './niconico';

async function main (): Promise<void> {
  // Niconico
  for (const target of niconicoTargets) {
    const calendar = new Calendar('koteiou', await getNiconicoEvents(target));
    calendar.saveCalendarToFile('niconico', `${target.type}.ical`);
  }
}

main();
