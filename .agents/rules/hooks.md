---
description: Hooks — DRY, single responsibility, TanStack Query for server state
globs: src/hooks/**/*.ts, src/hooks/**/*.tsx, **/use-*.ts, **/use-*.tsx
alwaysApply: false
---

# Hooks

- **DRY:** Extract reusable logic into hooks. Prefer existing `use-api-queries` and `use-mobile` where they fit.
- **Single responsibility:** One hook, one concern.
- **Naming:** Use the `use` prefix for custom hooks.
- **Server state:** Use TanStack Query for API data. See `src/hooks/use-api-queries.ts` and `authenticatedFetch` from `@/config/api`.
- **Return shape:** Return a tuple or a single object; keep the API clear. Document when non-obvious.

Reference `src/hooks/use-api-queries.ts` and `src/hooks/use-mobile.ts` for patterns.
