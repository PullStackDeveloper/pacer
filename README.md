# Pacer

Campaign pacing & insights platform — study project for a Senior Full-Stack role.
Bun · TypeScript · React · Hono · PostgreSQL · AWS · Terraform · LLM/MCP.

> Work in progress. See `docs/adr/` for decisions.

## Getting started

```bash
bun install
bun run dev
```

Open http://localhost:5180 (web) — the API runs on http://localhost:3000.

## Conventions

- **Bun only** for runtime, package management, tests and scripts. Run everything from the repo root:
  `bun run dev | test | typecheck | check | fix | ci`.
- **Strict typing:** no `any`; external data (HTTP, files, DB, env) is `unknown` until parsed with a Zod schema.
  `ts-reset` makes `JSON.parse` / `res.json()` return `unknown`.
- **Lint/format:** Biome (`any`, `!`, unused code and floating promises are errors).
- **Commits:** [Conventional Commits](https://www.conventionalcommits.org/), whole message ≤ 150 characters,
  checked by the `commit-msg` hook (`scripts/commit-msg.ts`).
- **Internal packages** export TypeScript source (`exports: ./src/index.ts`); shared versions live in the root
  `catalog`.
- **API routes** are mounted under `/api`. Dev ports: api 3000, web 5180, postgres 5433 (via
  `compose.override.yaml`).
- **Infrastructure:** Terraform in `infra/` (not a Bun workspace).
