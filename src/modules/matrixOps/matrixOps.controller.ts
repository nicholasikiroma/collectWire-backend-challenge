import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';

import { ApiError, Asyncly, parseCsvFile } from '../../utils';
import { flattenMatrix, multiplyMatrix, printMatrix, sumMatrix } from './matrixOps.service';

export const echo = Asyncly(async (req: Request, res: Response) => {
  const file = req.file;
  if (!file) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'File not found.');
  }
  if (!file.path) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'File path not found');
  }
  const data = await parseCsvFile(file.path);
  const stringifiedArray = await printMatrix(data);

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
  const stringifiedArray = await flattenMatrix(data);

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
  const flattenedArray = await flattenMatrix(data);
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
  const arrSum = await sumMatrix(data);
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
  const arrProduct = await multiplyMatrix(data);
  res.status(StatusCodes.OK).json(arrProduct);
});
