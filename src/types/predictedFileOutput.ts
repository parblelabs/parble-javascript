import { Document } from './document.js';

/**
 * Timing information for a file
 */
export type Timings = {
  /**
   * Start of the file process datetime.
   */
  upload: Date;
  /**
   * End of the file process datetime.
   */
  done: Date;
};

/**
 * This type represents a File datastructure from Parble API.
 * A File contains an array of identified and classified documents - each one containing predictions.
 */
export type PredictedFileOutput = {
  /**
   * Processed file automatically generated singular id.
   */
  id: string;
  /**
   * Processed file filename.
   */
  filename: string;
  /**
   * Processed file timings information.
   */
  timings: Timings;
  /**
   * Wether the file was fully automated or not.
   */
  automated: boolean;
  /**
   * Processed file total number of pages.
   */
  number_of_pages: number;
  /**
   * Processed file array of documents found with their information inside.
   */
  documents: Array<Document>;
};
