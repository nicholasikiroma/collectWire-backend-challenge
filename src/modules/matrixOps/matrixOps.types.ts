export type SquareMatrix<T> = T[][] & { length: number } & {
  [index: number]: { length: number };
};
