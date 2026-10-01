import { describe, expect, it } from 'bun:test';
import { healthResponseSchema } from './health';

describe('healthResponseSchema', () => {
  it('accepts a valid payload', () => {
    expect(healthResponseSchema.safeParse({ status: 'ok', uptimeSeconds: 12 }).success).toBe(true);
  });

  it('rejects a negative uptime', () => {
    expect(healthResponseSchema.safeParse({ status: 'ok', uptimeSeconds: -1 }).success).toBe(false);
  });
});
