import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';

import { Asyncly } from '../../utils';

export const echo = Asyncly(async (req: Request, res: Response) => {
  const file = req.file;
  res.status(StatusCodes.OK).json(file?.filename);
});

export const invert = Asyncly(async (req: Request, res: Response) => {
  const file = req.file;
  res.status(StatusCodes.OK).json(file?.filename);
});

export const flatten = Asyncly(async (req: Request, res: Response) => {
  const file = req.file;
  res.status(StatusCodes.OK).json(file?.filename);
});

export const sum = Asyncly(async (req: Request, res: Response) => {
  const file = req.file;
  res.status(StatusCodes.OK).json(file?.filename);
});

export const multiply = Asyncly(async (req: Request, res: Response) => {
  const file = req.file;
  res.status(StatusCodes.OK).json(file?.filename);
});
