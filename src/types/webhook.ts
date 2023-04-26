/**
 * Webhook event available options.
 */
export type EventOption =
  | 'document_predict'
  | 'document_evaluate'
  | 'document_reject'
  | 'document_text'
  | 'document_split'
  | 'document_delete';

/**
 * Webhook object.
 */
export type Webhook = {
  /**
   * The events that trigger the webhook.
   */
  events: EventOption[];
  /**
   * The target of the webhook.
   */
  target: string;
  /**
   * Additional headers to include in the webhook.
   */
  headers: Record<string, any>;
  /**
   * The ID of the webhook.
   */
  id: string;
};

/**
 * Webhook payload object.
 */
export type WebhookPayload = {
  /**
   * The events that trigger the webhook.
   */
  events: EventOption[];
  /**
   * The target of the webhook.
   */
  target: string;
  /**
   * Additional headers to include in the webhook.
   */
  headers?: Record<string, any>;
};
