export interface IJokes {
  type: string;
  setup: string;
  punchline: string;
  id: number;
}
export interface IJokesRefresh {
  arg1: IJokes;
  arg2: IJokes[];
}
