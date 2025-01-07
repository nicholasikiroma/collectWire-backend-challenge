import { StatusCodes } from 'http-status-codes';
import { ApiError } from '../../utils';

const validatorResponses = {};

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
