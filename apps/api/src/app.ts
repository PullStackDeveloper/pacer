import { type HealthResponse, healthResponseSchema } from '@pacer/contracts';
import { Hono } from 'hono';

// Todas as rotas vivem sob /api: na AWS, o CloudFront encaminha /api/* para o ALB (Fase 8).
export const app = new Hono().basePath('/api');

app.get('/health', (c) => {
  const body: HealthResponse = {
    status: 'ok',
    uptimeSeconds: Math.floor(process.uptime()),
  };
  return c.json(healthResponseSchema.parse(body));
});
