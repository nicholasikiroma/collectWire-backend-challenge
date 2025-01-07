import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';

import { Asyncly } from '../../utils';
import {
  flattenMatrix,
  invertMatrix,
  multiplyMatrix,
  printMatrix,
  sumMatrix,
} from './matrixOps.service';
import { validateAndParseFile } from './matrixOps.helpers';
import { SquareMatrix } from './matrixOps.types';

export const echo = Asyncly(async (req: Request, res: Response) => {
  const data = await validateAndParseFile(req);
  const stringifiedArray = await printMatrix(data as SquareMatrix<string>);
  res.status(StatusCodes.OK).json(stringifiedArray);
});

export const invert = Asyncly(async (req: Request, res: Response, next) => {
  const data = await validateAndParseFile(req);
  const stringifiedArray = await invertMatrix(data as SquareMatrix<string>);
  res.status(StatusCodes.OK).json(stringifiedArray);
});

export const flatten = Asyncly(async (req: Request, res: Response) => {
  const data = await validateAndParseFile(req);
  const flattenedArray = await flattenMatrix(data as SquareMatrix<string>);
  res.status(StatusCodes.OK).json(flattenedArray);
});

export const sum = Asyncly(async (req: Request, res: Response) => {
  const data = await validateAndParseFile(req);
  const arrSum = await sumMatrix(data as SquareMatrix<string>);
  res.status(StatusCodes.OK).json(arrSum);
});

export const multiply = Asyncly(async (req: Request, res: Response) => {
  const data = await validateAndParseFile(req);
  const arrProduct = await multiplyMatrix(data as SquareMatrix<string>);
  res.status(StatusCodes.OK).json(arrProduct);
});
