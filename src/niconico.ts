import vm, { Context } from 'vm';
import * as cheerio from 'cheerio';
import { NiconicoProgram, NiconicoTarget } from './types/niconico';
import { CalendarEvent } from './types/calendar';

const sandboxTemplate = (): Context => ({
  window: { TKTK: {} },
  s: (v: string): string =>
    v.trim().replace(/&(lt|gt|amp|quot|#x27|#x60|#x2F|#x3D);/g, m => {
      return (
        {
          '&lt;': '<',
          '&gt;': '>',
          '&amp;': '&',
          '&quot;': '"',
          '&#x27;': "'",
          '&#x60;': '`',
          '&#x2F;': '/',
          '&#x3D;': '='
        }[m] || m
      );
    }),
  d_s: (v: string): string => v,
  n: (v: string): number => Number(v),
  b: (v: string): boolean => v === 'true'
});

async function getNiconicoEvents (
  target: NiconicoTarget
): Promise<CalendarEvent[]> {
  const response = await fetch(target.url);

  const $ = cheerio.load(await response.text());
  const scriptContent = $('#tktk-module').html() || '';

  const sandbox = sandboxTemplate();
  const context = vm.createContext(sandbox);
  const script = new vm.Script(scriptContent);
  script.runInContext(context);

  const programs: NiconicoProgram[] = sandbox.window.TKTK[target.key];
  if (!Array.isArray(programs)) {
    return [];
  }

  return programs
    .filter(
      program => !program.title.includes('【ニコニコプレミアム会員限定】')
    )
    .map(program => {
      const dtEnd = new Date(program.startTime);
      dtEnd.setMinutes(dtEnd.getMinutes() + target.duration);

      return {
        summary: program.title,
        dtStart: program.startTime,
        dtEnd,
        dtStamp: new Date(),
        uid: `${program.contentId}@koteiouCal.niconico`,
        description: program.watchUrl
      };
    });
}

export const niconicoTargets = {
  regular: {
    url: 'https://anime.nicovideo.jp/live/reserved-regular.html',
    key: 'live_reserved_regular',
    duration: 30
  } as NiconicoTarget,
  ikkyo: {
    url: 'https://anime.nicovideo.jp/live/reserved-ikkyo.html',
    key: 'live_reserved_ikkyo',
    duration: 300
  } as NiconicoTarget
};
