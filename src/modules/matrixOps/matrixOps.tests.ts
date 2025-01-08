import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ApiError } from '../../utils';
import * as matrixOps from './matrixOps.controller';
import * as matrixService from './matrixOps.service';
import { Readable } from 'stream';
import { validateAndParseFile } from './matrixOps.helpers';

jest.mock('./matrixOps.helpers');

jest.mock('./matrixOps.service');

describe('Matrix Operations Controller', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: NextFunction;
  let mockFile: Express.Multer.File;
  let dummyStream: Readable;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
    // Create a dummy readable stream
    dummyStream = new Readable();
    dummyStream._read = () => {};

    mockFile = {
      path: '/tmp/test.csv',
      filename: 'test.csv',
      originalname: 'test.csv',
      encoding: '7bit',
      mimetype: 'text/csv',
      destination: '/tmp',
      size: 1234,
      fieldname: 'file',
      stream: dummyStream,
      buffer: Buffer.from('test data'),
    };

    mockRequest = {
      file: mockFile,
    };

    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    mockNext = jest.fn();
  });

  const asyncWrapper = (fn: Function) => (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next);
  const wrappedEcho = asyncWrapper(matrixOps.echo);
  const wrappedFlatten = asyncWrapper(matrixOps.flatten);
  const wrappedSum = asyncWrapper(matrixOps.sum);
  const wrappedInvert = asyncWrapper(matrixOps.invert);
  const wrappedMultiply = asyncWrapper(matrixOps.multiply);

  describe('Input Validation', () => {
    it('should throw error when file is missing', async () => {
      mockRequest.file = undefined;
      (validateAndParseFile as jest.Mock).mockRejectedValue(new Error('File not found.'));

      await wrappedEcho(mockRequest as Request, mockResponse as Response, mockNext),
        expect(mockNext).toHaveBeenCalledWith(
          new ApiError(StatusCodes.BAD_REQUEST, 'File not found.'),
        );
    });

    it('should throw error when file path is missing', async () => {
      // Create a new mock file without a path property
      const fileWithoutPath: Express.Multer.File = {
        fieldname: 'file',
        originalname: 'test.csv',
        encoding: '7bit',
        mimetype: 'text/csv',
        size: 1234,
        stream: dummyStream,
        destination: '/tmp',
        filename: 'test.csv',
        buffer: Buffer.from('test data'),
        path: '', // Empty string instead of undefined
      };

      mockRequest.file = fileWithoutPath;
      (validateAndParseFile as jest.Mock).mockRejectedValue(new Error('File path not found'));

      await wrappedEcho(mockRequest as Request, mockResponse as Response, mockNext);
      expect(mockNext).toHaveBeenCalledWith(
        new ApiError(StatusCodes.BAD_REQUEST, 'File path not found'),
      );
    });

    it('should throw error for non-square matrix', async () => {
      (validateAndParseFile as jest.Mock).mockRejectedValue(new Error('Invalid matrix size'));

      await wrappedEcho(mockRequest as Request, mockResponse as Response, mockNext);
      expect(mockNext).toHaveBeenCalledWith(
        new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, 'Invalid matrix size'),
      );
    });

    it('should handle non-numeric values', async () => {
      const testMatrix = [
        ['1', 'a'],
        ['3', '4'],
      ];

      (validateAndParseFile as jest.Mock).mockRejectedValue(
        new Error('Matrix contains invalid characters'),
      );
      await wrappedSum(mockRequest as Request, mockResponse as Response, mockNext);

      expect(mockNext).toHaveBeenCalledWith(
        new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, 'Matrix contains invalid characters'),
      );
    });
  });

  describe('Echo Operation', () => {
    it('should correctly process valid square matrix', async () => {
      const testMatrix = [
        ['1', '2'],
        ['3', '4'],
      ];
      (validateAndParseFile as jest.Mock).mockResolvedValue(testMatrix);
      (matrixService.printMatrix as jest.Mock).mockResolvedValue('1,2\n3,4');

      await wrappedEcho(mockRequest as Request, mockResponse as Response, mockNext);

      expect(mockResponse.status).toHaveBeenCalledWith(StatusCodes.OK);
      expect(mockResponse.json).toHaveBeenCalledWith('1,2\n3,4');
      expect(mockNext).not.toHaveBeenCalled();
    });
  });

  describe('Invert Operation', () => {
    it('should correctly invert valid square matrix', async () => {
      const testMatrix = [
        ['1', '2'],
        ['3', '4'],
      ];
      (validateAndParseFile as jest.Mock).mockResolvedValue(testMatrix);
      (matrixService.invertMatrix as jest.Mock).mockResolvedValue('1,3\n2,4');

      await wrappedInvert(mockRequest as Request, mockResponse as Response, mockNext);

      expect(mockResponse.status).toHaveBeenCalledWith(StatusCodes.OK);
      expect(mockResponse.json).toHaveBeenCalledWith('1,3\n2,4');
      expect(mockNext).not.toHaveBeenCalled();
    });
  });

  describe('Flatten Operation', () => {
    it('should correctly flatten valid square matrix', async () => {
      const testMatrix = [
        ['1', '2'],
        ['3', '4'],
      ];
      (validateAndParseFile as jest.Mock).mockResolvedValue(testMatrix);
      (matrixService.flattenMatrix as jest.Mock).mockResolvedValue('1,2,3,4'); // Updated mock

      await wrappedFlatten(mockRequest as Request, mockResponse as Response, mockNext);

      expect(mockResponse.status).toHaveBeenCalledWith(StatusCodes.OK);
      expect(mockResponse.json).toHaveBeenCalledWith('1,2,3,4');
      expect(mockNext).not.toHaveBeenCalled();
    });
  });

  describe('Sum Operation', () => {
    it('should correctly sum valid square matrix', async () => {
      const testMatrix = [
        ['1', '2'],
        ['3', '4'],
      ];
      (validateAndParseFile as jest.Mock).mockResolvedValue(testMatrix);
      (matrixService.sumMatrix as jest.Mock).mockResolvedValue(10);

      await wrappedSum(mockRequest as Request, mockResponse as Response, mockNext);

      expect(mockResponse.status).toHaveBeenCalledWith(StatusCodes.OK);
      expect(mockResponse.json).toHaveBeenCalledWith(10);
      expect(mockNext).not.toHaveBeenCalled();
    });
  });

  describe('Multiply Operation', () => {
    it('should correctly multiply valid square matrix', async () => {
      const testMatrix = [
        ['1', '2'],
        ['3', '4'],
      ];
      (validateAndParseFile as jest.Mock).mockResolvedValue(testMatrix);
      (matrixService.multiplyMatrix as jest.Mock).mockResolvedValue(24); // 1 * 2 * 3 * 4

      await wrappedMultiply(mockRequest as Request, mockResponse as Response, mockNext);

      expect(mockResponse.status).toHaveBeenCalledWith(StatusCodes.OK);
      expect(mockResponse.json).toHaveBeenCalledWith(24);
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('should handle empty matrix gracefully', async () => {
      (validateAndParseFile as jest.Mock).mockRejectedValue(new Error('Invalid matrix size'));

      await wrappedMultiply(mockRequest as Request, mockResponse as Response, mockNext);

      expect(mockNext).toHaveBeenCalledWith(
        new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, 'Invalid matrix size'),
      );
    });
  });
});
