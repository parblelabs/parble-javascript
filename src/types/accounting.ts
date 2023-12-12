/**
 * Balance payload object includes the total all-time credit, the total all-time usage
 * and the current balance which is simply the remaining credit.
 */
export type Balance = {
  /**
   * The current balance of the account.
   */
  balance: string;
  /**
   * The total credit amount of the account.
   */
  credit: string;
  /**
   * The total usage amount of the account.
   */
  usage: string;
};

/**
 * Represents an article for adding balance.
 */
export type Article = {
  /**
   * The name or description of the item.
   */
  name: string;
  /**
   * The base quantity of the item.
   */
  quantity: number;
  /**
   * The unit price of the item.
   */
  unit_price: string;
};

/**
 * Represents a payment link.
 */
export type PaymentLink = {
  /**
   * The URL of the payment link.
   */
  url: string;
  /**
   * The current status of the payment link.
   */
  status: 'open' | 'paid' | 'expired';
};
