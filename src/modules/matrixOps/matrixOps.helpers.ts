import { Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ApiError, parseCsvFile } from '../../utils';

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
