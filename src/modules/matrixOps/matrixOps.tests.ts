import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ApiError } from '../../utils';
import * as matrixOps from './matrixOps.controller';
import * as matrixService from './matrixOps.service';
import { parseCsvFile } from '../../utils';
import { Readable } from 'stream';

// Mock dependencies
jest.mock('../../utils', () => ({
  Asyncly: (fn: any) => fn,
  parseCsvFile: jest.fn(),
  ApiError: jest.requireActual('../../utils').ApiError,
}));

jest.mock('./matrixOps.service');

describe('Matrix Operations Controller', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: NextFunction;
  let mockFile: Express.Multer.File;
  let dummyStream: Readable;

  beforeEach(() => {
    // Create a dummy readable stream
    dummyStream = new Readable();
    dummyStream._read = () => {}; // Required implementation

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

    jest.clearAllMocks();
  });

  describe('Input Validation', () => {
    it('should throw error when file is missing', async () => {
      mockRequest.file = undefined;

      await matrixOps.echo(mockRequest as Request, mockResponse as Response, mockNext);
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

      await matrixOps.echo(mockRequest as Request, mockResponse as Response, mockNext);
      expect(mockNext).toHaveBeenCalledWith(
        new ApiError(StatusCodes.BAD_REQUEST, 'File path not found'),
      );
    });

    it('should throw error for non-square matrix', async () => {
      (parseCsvFile as jest.Mock).mockResolvedValue([
        ['1', '2'],
        ['3', '4', '5'],
      ]);

      await matrixOps.echo(mockRequest as Request, mockResponse as Response, mockNext);
      expect(mockNext).toHaveBeenCalledWith(
        new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, 'Invalid matrix size'),
      );
    });
  });

  // Rest of the tests remain the same...
  describe('Echo Operation', () => {
    it('should correctly process valid square matrix', async () => {
      const testMatrix = [
        ['1', '2'],
        ['3', '4'],
      ];
      (parseCsvFile as jest.Mock).mockResolvedValue(testMatrix);
      (matrixService.printMatrix as jest.Mock).mockResolvedValue('1,2\n3,4');

      await matrixOps.echo(mockRequest as Request, mockResponse as Response, mockNext);

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
      (parseCsvFile as jest.Mock).mockResolvedValue(testMatrix);
      (matrixService.invertMatrix as jest.Mock).mockResolvedValue('1,3\n2,4');

      await matrixOps.invert(mockRequest as Request, mockResponse as Response, mockNext);

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
      (parseCsvFile as jest.Mock).mockResolvedValue(testMatrix);
      (matrixService.flattenMatrix as jest.Mock).mockResolvedValue('1,2,3,4');

      await matrixOps.flatten(mockRequest as Request, mockResponse as Response, mockNext);

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
      (parseCsvFile as jest.Mock).mockResolvedValue(testMatrix);
      (matrixService.sumMatrix as jest.Mock).mockResolvedValue(10);

      await matrixOps.sum(mockRequest as Request, mockResponse as Response, mockNext);

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
      (parseCsvFile as jest.Mock).mockResolvedValue(testMatrix);
      (matrixService.multiplyMatrix as jest.Mock).mockResolvedValue(24);

      await matrixOps.multiply(mockRequest as Request, mockResponse as Response, mockNext);

      expect(mockResponse.status).toHaveBeenCalledWith(StatusCodes.OK);
      expect(mockResponse.json).toHaveBeenCalledWith(24);
      expect(mockNext).not.toHaveBeenCalled();
    });
  });
});

describe('Matrix Operations Service', () => {
  describe('flattenMatrix', () => {
    it('should correctly flatten a matrix', async () => {
      const input = [
        ['1', '2'],
        ['3', '4'],
      ];
      const result = await matrixService.flattenMatrix(input);
      expect(result).toBe('1,2,3,4');
    });

    it('should handle empty matrix', async () => {
      const input: string[][] = [];
      const result = await matrixService.flattenMatrix(input);
      expect(result).toBe('');
    });
  });

  describe('printMatrix', () => {
    it('should correctly print a matrix', async () => {
      const input = [
        ['1', '2'],
        ['3', '4'],
      ];
      const result = await matrixService.printMatrix(input);
      expect(result).toBe('1,2\n3,4');
    });
  });

  describe('sumMatrix', () => {
    it('should correctly sum matrix elements', async () => {
      const input = [
        ['1', '2'],
        ['3', '4'],
      ];
      const result = await matrixService.sumMatrix(input);
      expect(result).toBe(10);
    });

    it('should handle non-numeric values', async () => {
      const input = [
        ['1', 'a'],
        ['3', '4'],
      ];
      const result = await matrixService.sumMatrix(input);
      expect(result).toBe(NaN);
    });
  });

  describe('multiplyMatrix', () => {
    it('should correctly multiply matrix elements', async () => {
      const input = [
        ['1', '2'],
        ['3', '4'],
      ];
      const result = await matrixService.multiplyMatrix(input);
      expect(result).toBe(24);
    });

    it('should handle non-numeric values', async () => {
      const input = [
        ['1', 'a'],
        ['3', '4'],
      ];
      const result = await matrixService.multiplyMatrix(input);
      expect(result).toBe(NaN);
    });
  });

  describe('invertMatrix', () => {
    it('should correctly invert a matrix', async () => {
      const input = [
        ['1', '2'],
        ['3', '4'],
      ];
      const result = await matrixService.invertMatrix(input);
      expect(result).toBe('1,3\n2,4');
    });

    it('should handle 1x1 matrix', async () => {
      const input = [['1']];
      const result = await matrixService.invertMatrix(input);
      expect(result).toBe('1');
    });
  });
});
