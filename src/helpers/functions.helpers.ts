import { IJokes } from '../module/IJoke';

export function arraysHaveSameIds(array1: IJokes[], array2: IJokes[]) {
  const ids1 = array1.map((item) => item.id);
  const ids2 = array2.map((item) => item.id);

  return ids1.some((id) => ids2.includes(id));
}
