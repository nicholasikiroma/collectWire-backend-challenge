import { SquareMatrix } from './matrixOps.types';

export async function flattenMatrix<T>(input: SquareMatrix<T>): Promise<string> {
  return input.flat().join(',');
}

export async function printMatrix<T>(input: SquareMatrix<T>): Promise<string> {
  return input.flat().join('\n');
}

export async function sumMatrix<T>(input: SquareMatrix<T>): Promise<number> {
  const newArr = input.flat().map(Number);
  return newArr.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
}

export async function multiplyMatrix<T>(input: SquareMatrix<T>): Promise<number> {
  const newArr = input.flat().map(Number);
  return newArr.reduce((accumulator, currentValue) => accumulator * currentValue, 1);
}

export async function invertMatrix<T>(input: SquareMatrix<T>): Promise<string> {
  const size = input.length;

  // Handle 1D square matrix (single row or column)
  if (size === 1 || input[0].length === 1) {
    return `${input[0][0]}`;
  }

  // Transpose for higher dimensions
  const transposed: T[][] = [];
  for (let col = 0; col < size; col++) {
    const newRow: T[] = [];
    for (let row = 0; row < size; row++) {
      newRow.push(input[row][col]);
    }
    transposed.push(newRow);
  }

  return transposed.join('\n');
}
