/**
 * Usage stats endpoint response
 */
export type UsageStats = {
  /**
   * Tenant count full of uploaded files
   */
  files: number;
  /**
   * Tenant count of documents found inside the uploaded files (may be just one or more per file)
   */
  documents: number;
  /**
   * Tenant count of pages found inside the files (may be just one or more per file)
   */
  pages: number;
};
