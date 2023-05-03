interface AutomationItem {
  /**
   * Rate of automation [stp (automated) vs total]
   */
  rate: number;
  /**
   * Total count of stp (automated)
   */
  stp: number;
  /**
   * Total count
   */
  total: number;
}

/**
 * Automation stats endpoint response
 */
export type AutomationStats = {
  /**
   * Tenant full files automation stats
   */
  files: AutomationItem;
  /**
   * Tenant documents found inside the files (may be just one or more) automation stats
   */
  documents: AutomationItem;
  /**
   * Tenant fields found inside the files (may be just one or more) automation stats
   */
  fields: AutomationItem;
};
