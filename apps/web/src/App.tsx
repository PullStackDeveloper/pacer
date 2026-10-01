import { type HealthResponse, healthResponseSchema } from '@pacer/contracts';
import { useEffect, useState } from 'react';

// Fase 0: fetch manual só para provar o contrato ponta a ponta.
// Na Fase 5 isso vira TanStack Query.
export default function App() {
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    fetch('/api/health', { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((json: unknown) => setHealth(healthResponseSchema.parse(json)))
      .catch((err: unknown) => {
        if (err instanceof DOMException && err.name === 'AbortError') return;
        setError(err instanceof Error ? err.message : String(err));
      });

    return () => controller.abort();
  }, []);

  return (
    <main>
      <h1>Pacer</h1>
      {error && <p role="alert">API unavailable: {error}</p>}
      {!error && !health && <p>Checking API…</p>}
      {health && (
        <p>
          API status: <strong>{health.status}</strong> (up {health.uptimeSeconds}s)
        </p>
      )}
    </main>
  );
}
