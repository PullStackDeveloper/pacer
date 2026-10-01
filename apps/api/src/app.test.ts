import { describe, expect, it } from 'bun:test';
import { healthResponseSchema } from '@pacer/contracts';
import { app } from './app';

describe('GET /api/health', () => {
  it('answers 200 with the shared contract', async () => {
    const res = await app.request('/api/health');

    expect(res.status).toBe(200);
    expect(healthResponseSchema.safeParse(await res.json()).success).toBe(true);
  });

  it('answers 404 for unknown routes', async () => {
    const res = await app.request('/api/nope');
    expect(res.status).toBe(404);
  });
});
