import { SquareMatrix } from './matrixOps.types';

/**
 * Flattens a square matrix into a comma-separated string.
 *
 * @param input - The input square matrix to be flattened.
 * @returns A promise that resolves to a string representing the flattened matrix.
 */
export async function flattenMatrix<T>(input: SquareMatrix<T>): Promise<string> {
  return input.flat(Infinity).join(',');
}

/**
 * Prints the square matrix as a string where each element is separated by a newline.
 *
 * @param input - The input square matrix to be printed.
 * @returns A promise that resolves to a string representing the matrix with each element on a new line.
 */
export async function printMatrix<T>(input: SquareMatrix<T>): Promise<string> {
  return input.map((row) => row.join(',')).join('\n');
}

/**
 * Sums all elements in the square matrix and returns the result.
 *
 * @param input - The input square matrix to sum.
 * @returns A promise that resolves to the sum of all elements in the matrix.
 */
export async function sumMatrix<T>(input: SquareMatrix<T>): Promise<number> {
  const newArr = input.flat(Infinity).map(Number);
  return newArr.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
}

/**
 * Multiplies all elements in the square matrix and returns the result.
 *
 * @param input - The input square matrix to multiply.
 * @returns A promise that resolves to the product of all elements in the matrix.
 */
export async function multiplyMatrix<T>(input: SquareMatrix<T>): Promise<number> {
  const newArr = input.flat(Infinity).map(Number);
  return newArr.reduce((accumulator, currentValue) => accumulator * currentValue, 1);
}

/**
 * Inverts the square matrix by transposing it. For a 1D matrix, it simply returns the element.
 *
 * @param input - The input square matrix to invert.
 * @returns A promise that resolves to a string representing the transposed matrix, or the matrix element in case of a 1D matrix.
 */
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

  return printMatrix(transposed);
}
