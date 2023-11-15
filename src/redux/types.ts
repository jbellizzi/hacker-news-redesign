export interface BaseItem {
  id: number;
  deleted?: boolean;
  by?: string;
  time?: number;
  dead?: boolean;
  kids?: number[];
}

export interface Job extends BaseItem {
  type: "job";
  title?: string;
  text?: string;
  url?: string;
}

export interface Story extends BaseItem {
  type: "story";
  descendants?: number;
  score?: number;
  title?: string;
  url?: string;
}

export interface Comment extends BaseItem {
  type: "comment";
  parent?: number;
  text?: string;
}

export interface Poll extends BaseItem {
  type: "poll";
  parts?: number[];
  descendants?: number;
  score?: number;
  title?: string;
  text?: string;
}

export interface PollOpt extends BaseItem {
  type: "pollopt";
  parent?: number;
  score?: number;
}

export type Item = Job | Story | Comment | Poll | PollOpt;
// "Stories" displayed on the front page can also be jobs or polls.
export type FrontPageItem = Story | Job | Poll;
