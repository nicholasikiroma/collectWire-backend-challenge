import fs from 'fs';
import csvParser from 'csv-parser';
import { StatusCodes } from 'http-status-codes';

import { ApiError } from '../utils';
import { logger } from '../config';

export async function parseCsvFile(filePath: string): Promise<any[]> {
  return new Promise((resolve, reject) => {
    const result: any[] = [];

    fs.createReadStream(filePath)
      .pipe(csvParser({ headers: false }))
      .on('data', (data) => {
        const row = Object.values(data);
        result.push(row);
      })
      .on('end', () => {
        logger.info('CSV file parsed successfully.');
        resolve(result); // Resolve the promise with the result
      })
      .on('error', (err) => {
        reject(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, `${err.message}`)); // Reject the promise with an error
      });
  });
}
