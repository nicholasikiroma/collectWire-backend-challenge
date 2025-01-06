import { SquareMatrix } from './matrixOps.types';

export async function flattenMatrix<T>(input: SquareMatrix<T>): Promise<string> {
  return input.join(',');
}

export async function printMatrix<T>(input: SquareMatrix<T>): Promise<string> {
  return input.join('\n');
}

export async function sumMatrix<T>(input: SquareMatrix<T>): Promise<number> {
  const newArr = input.flat().map(Number);
  return newArr.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
}

export async function multiplyMatrix<T>(input: SquareMatrix<T>): Promise<number> {
  const newArr = input.flat().map(Number);
  return newArr.reduce((accumulator, currentValue) => accumulator * currentValue);
}

export async function invertMatrix<T>(input: SquareMatrix<T>): Promise<string> {
  const transposed: T[][] = [];

  for (let col = 0; col < input[0].length; col++) {
    const newRow: T[] = [];

    for (let row = 0; row < input.length; row++) {
      newRow.push(input[row][col]);
    }

    transposed.push(newRow);
  }

  return printMatrix(transposed);
}
