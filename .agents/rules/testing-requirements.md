---
description: Require thorough automated tests for new or changed behavior
alwaysApply: true
---

# Testing requirements

Treat sparse coverage as a gap to close, not a reason to skip tests. **New or materially changed behavior must ship with automated tests** appropriate to the layer you touched.

## What to add

| Area                             | Prefer                                                                                                                     |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `apps/web/src/`, shared packages | **Vitest** unit/component tests where configured; **Testing Library** for React (see `.agents/subagents/testing-agent.md`) |
| Critical user journeys           | **Playwright** (`.agents/subagents/playwright-ui.md`)                                                                      |
| `apps/functions/`                | **Vitest** in the functions workspace; follow `.agents/subagents/firebase-functions-agent.md`                              |

Cover happy path, meaningful errors/edge cases, and async behavior where relevant. Avoid coupling tests to implementation details when a user-facing assertion is enough.

## i18n in web unit tests (`apps/web`)

**Vitest setup stubs `react-i18next`** so `useTranslation().t()` returns the **translation key unchanged** (see `apps/web/src/test/setup.ts`). Tests that assert visible strings like `blog.index.empty` or `blog.post.error` are **correct by design**: they prove the component calls `t()` with the expected key without loading locale JSON or wrapping `I18nextProvider`.

- **Do not** flag or refactor key-based assertions as “missing real translations” during review or automated fixes.
- Prefer translated-copy assertions only when you deliberately add a localized test harness (fixtures + provider). **Playwright E2E** is the right place to validate locale-specific UX end-to-end.

## Workflow

1. Read **`.agents/subagents/testing-agent.md`** before adding or restructuring tests; use **`.agents/subagents/unit-tester.md`** for focused unit work.
2. Run **`npm run test:functions`** for **`apps/functions/`**; **`npm run test:e2e`** when you change Playwright coverage under **`apps/web/e2e/`**. For **web** unit tests, use the workspace’s documented Vitest command (see **README.md** / **CONTRIBUTING.md**).
3. Do not finish while tests are red; fix the code or the test, then re-run.
4. If you introduce a new test runner or suite, wire it into **`package.json`** and **`.github/workflows/`** (`tests.yml`, `e2e.yml`) so CI stays honest.

## When tests are optional

Trivial-only changes (typo in copy, comment-only, pure formatting) may skip new tests. Anything that changes runtime behavior, contracts, or user-visible output should be tested.
