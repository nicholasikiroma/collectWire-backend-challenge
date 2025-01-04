import multer from 'multer';
import { tmpdir } from 'node:os';

const upload = multer({ dest: tmpdir() }).single('file'); // store test csv file to temporary directory

export default upload;
