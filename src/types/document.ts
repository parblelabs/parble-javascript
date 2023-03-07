/**
 * Classification information about a single document
 */
export type Classification = {
  /**
   * Wether the document classification was automated or not.
   */
  automated: boolean;
  /**
   * Document type of the document.
   */
  document_type: string;
  /**
   * Confidence of the predicted document type of the document.
   */
  confidence: number;
  /**
   * Starting page of the document in the full file.
   */
  start_page: number;
  /**
   * Ending page of the document in the full file.
   */
  end_page: number;
};

/**
 * A single classified and predicted document.
 */
export type Document = {
  /**
   * Wether the full document was automated or not.
   */
  automated: boolean;
  /**
   * Belonging file filename.
   */
  filename: string;
  /**
   * Classification information about the document.
   */
  classification: Classification;
  /**
   * Header fields extracted in the document.
   */
  header_fields: { [field_name: string]: any };
  /**
   * Line items extracted in the document.
   */
  line_items: { [table_name: string]: any };
};
