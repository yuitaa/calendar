export interface NiconicoTarget {
  type: string;
  url: string;
  key: string;
  duration: number;
}

export interface NiconicoProgram {
  title: string;
  watchUrl: string;
  contentId: string;
  startTime: string;
  liveStatus?: string;
  pictureUrl?: string;
  scoreTimeshiftReserved?: number;
  timeshiftEnabled?: boolean;
  thumbnailHugeS352x198?: string;
}
