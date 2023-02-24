export function validateParams(apiKey: string, tenant: string): void {
  if (!apiKey || apiKey.trim().length === 0) {
    throw new Error('Parble: API key is required');
  }

  if (!tenant || tenant.trim().length === 0) {
    throw new Error('Parble: Tenant not provided');
  }
}
