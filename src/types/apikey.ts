/**
 * Represents an API key object.
 */
export type ApiKey = {
  /**
   * The unique identifier for the API key.
   */
  id: string;
  /**
   * Indicates whether the API key is active or not.
   */
  active: boolean;
  /**
   * The date and time when the API key expires.
   */
  expire_at: string;
  /**
   * The token associated with the API key.
   */
  token: string;
};