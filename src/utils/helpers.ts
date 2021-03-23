export const deduplicateArray = <Type>(arr: Type[]): Type[] =>
  Array.from(new Set(arr));
