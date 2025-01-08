import { Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ApiError, parseCsvFile } from '../../utils';

/**
 * Validates if the input matrix is a square matrix.
 *
 * A square matrix is one where the number of rows equals the number of columns.
 * The function also checks if the matrix is valid (is an array of arrays) and if all values are numeric.
 *
 * @param matrix - The matrix to validate, represented as a 2D array.
 * @returns A boolean indicating whether the matrix is square.
 * @throws ApiError if the matrix is invalid or not square.
 */
export function isSquareMatrix<T>(matrix: T[][]): boolean {
  if (!matrix || !Array.isArray(matrix))
    throw new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, 'Input matrix is not an array');

  const numRows = matrix.length;
  if (numRows === 0) throw new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, 'Invalid matrix size');

  for (const row of matrix) {
    if (!Array.isArray(row) || row.length !== numRows)
      throw new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, 'Invalid matrix size'); // Check square shape
    if (row.some((val) => isNaN(Number(val))))
      throw new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, 'Matrix contains invalid characters');
  }
  return true;
}

/**
 * Validates and parses a CSV file uploaded in the request.
 *
 * The function checks if a file is provided, verifies the file's path, and then parses its content into a matrix format.
 * After parsing, it checks if the matrix is square using `isSquareMatrix`.
 *
 * @param req - The Express request object containing the uploaded file.
 * @returns A promise that resolves to the parsed and validated square matrix data.
 * @throws ApiError if the file is not found, the file path is missing, or the matrix is invalid.
 */
export const validateAndParseFile = async (req: Request) => {
  const file = req.file;
  if (!file) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'File not found.');
  }
  if (!file.path) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'File path not found');
  }
  const data = await parseCsvFile(file.path);
  isSquareMatrix(data);
  return data;
};
