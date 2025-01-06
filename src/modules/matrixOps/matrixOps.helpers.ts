import { SquareMatrix } from './matrixOps.types';

export function isSquareMatrix<T>(matrix: T[][]): matrix is SquareMatrix<T> {
  const size = matrix.length;
  return matrix.every((row) => row.length === size);
}
