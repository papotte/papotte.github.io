---
description: Contexts — single responsibility, DRY, createContext + Provider + useX pattern
globs: src/contexts/**/*.ts, src/contexts/**/*.tsx
alwaysApply: false
---

# Contexts

- **Single responsibility:** One context per concern. Don’t mix auth, user, and filter state in one context.
- **DRY:** Reuse existing contexts: AuthContext, UserContext, YearFilterContext, PaginationContext. Don’t duplicate auth or filter state elsewhere.
- **Pattern:** Use `createContext` + a Provider component + a custom `useX()` hook that calls `useContext` and throws if used outside the provider. Colocate in `src/contexts/`.
- **Narrow value:** Expose only what consumers need; keep the context value small and stable.

Reference existing files in `src/contexts/` (e.g. AuthContext.tsx, UserContext.tsx) for the exact pattern.
