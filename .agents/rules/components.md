---
description: Components — DRY, SOLID, reuse ui/ primitives, composition
globs: src/components/**/*.tsx
alwaysApply: false
---

# Components

- **DRY:** Reuse primitives from `src/components/` when possible. Use `cn()` from `@vybcheck/utils` and CVA where the project already uses them.
- **SOLID:** Single responsibility; keep components small and composable.
- **Composition:** Prefer composition over inheritance.
- **Shared UI:** Import primitives from **`@vybcheck/ui`** (named exports), app-specific pieces from **`@/components/...`**.
- **Existing patterns:** Data tables use **`columns.tsx` + `data-table.tsx`** wired from a page. **Create/edit flows use dialogs.** Check `src/components/ui/` and feature folders (e.g. `components/farms/`, `components/measures/`) — don’t duplicate UI patterns. **Canonical table reference:** [src/components/measures/page.tsx](src/components/measures/page.tsx), [columns.tsx](src/components/measures/columns.tsx), [data-table.tsx](src/components/measures/data-table.tsx).

Reference `src/components/ui/` and feature components under `src/components/` for conventions.
