// import {} from './types';

export class Errors {
  constructor() {}

  /**
   * Redirects a message with correct info to the user request after exception
   * @param originalMessage Be original message after request error
   */
  errorInfo(originalMessage: string): string {
    return originalMessage;
  }
}
