import fs from 'fs';
import csvParser from 'csv-parser';
import { StatusCodes } from 'http-status-codes';

import { ApiError } from '../utils';
import { logger } from '../config';

/**
 * Parses a CSV file and returns its content as an array of rows.
 *
 * The function reads the file at the given file path, processes the CSV data using the `csv-parser` library, and
 * converts each row into an array of values. Once parsing is complete, it resolves the promise with the parsed data.
 * If an error occurs during parsing, it rejects the promise with an `ApiError`.
 *
 * @param filePath - The path to the CSV file to be parsed.
 * @returns A promise that resolves to an array of rows, each represented as an array of values.
 * @throws ApiError if an error occurs during the file reading or parsing process.
 */
export async function parseCsvFile(filePath: string): Promise<any[]> {
  return new Promise((resolve, reject) => {
    const result: any[] = [];

    fs.createReadStream(filePath)
      .pipe(csvParser({ headers: false })) // Disable headers for simple parsing
      .on('data', (data) => {
        const row = Object.values(data); // Convert row to an array of values
        result.push(row);
      })
      .on('end', () => {
        logger.info('CSV file parsed successfully.');
        resolve(result); // Resolve the promise with the parsed rows
      })
      .on('error', (err) => {
        reject(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, `${err.message}`)); // Reject the promise with an error
      });
  });
}
