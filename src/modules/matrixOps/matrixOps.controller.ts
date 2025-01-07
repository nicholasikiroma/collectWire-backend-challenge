import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';

import { ApiError, Asyncly, parseCsvFile } from '../../utils';
import {
  flattenMatrix,
  invertMatrix,
  multiplyMatrix,
  printMatrix,
  sumMatrix,
} from './matrixOps.service';
import { isSquareMatrix } from './matrixOps.helpers';
import { SquareMatrix } from './matrixOps.types';

export const echo = Asyncly(async (req: Request, res: Response) => {
  const file = req.file;
  if (!file) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'File not found.');
  }
  if (!file.path) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'File path not found');
  }
  const data = await parseCsvFile(file.path);

  isSquareMatrix(data);

  const stringifiedArray = await printMatrix(data as SquareMatrix<string>);

  res.status(StatusCodes.OK).json(stringifiedArray);
});

export const invert = Asyncly(async (req: Request, res: Response) => {
  const file = req.file;
  if (!file) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'File not found.');
  }
  if (!file.path) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'File path not found');
  }
  const data = await parseCsvFile(file.path);

  isSquareMatrix(data);

  const stringifiedArray = await invertMatrix(data as SquareMatrix<string>);

  res.status(StatusCodes.OK).json(stringifiedArray);
});

export const flatten = Asyncly(async (req: Request, res: Response) => {
  const file = req.file;

  if (!file) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'File not found.');
  }
  if (!file.path) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'File path not found');
  }
  const data = await parseCsvFile(file.path);
  isSquareMatrix(data);

  const flattenedArray = await flattenMatrix(data as SquareMatrix<string>);
  res.status(StatusCodes.OK).json(flattenedArray);
});

export const sum = Asyncly(async (req: Request, res: Response) => {
  const file = req.file;
  if (!file) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'File not found.');
  }
  if (!file.path) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'File path not found');
  }
  const data = await parseCsvFile(file.path);
  isSquareMatrix(data);

  const arrSum = await sumMatrix(data as SquareMatrix<string>);
  res.status(StatusCodes.OK).json(arrSum);
});

export const multiply = Asyncly(async (req: Request, res: Response) => {
  const file = req.file;
  if (!file) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'File not found.');
  }
  if (!file.path) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'File path not found');
  }
  const data = await parseCsvFile(file.path);
  isSquareMatrix(data);

  const arrProduct = await multiplyMatrix(data as SquareMatrix<string>);
  res.status(StatusCodes.OK).json(arrProduct);
});
