# Agent Instructions for papotte.github.io

## Project Overview

This repository is a **personal CV / portfolio site** built with **Astro**, **Tailwind CSS**, and **Alpine.js** (see [README.md](README.md)). It evolved from the Astro-Vitae template and adds TypeScript models, optional **Contentful** integration, and **Vitest** tests. The site is configured for **Vercel** (`output: 'server'`) and also ships a **GitHub Pages** build path via `npm run build:github`.

### Pre-production (no backward-compatibility by default)

Treat the codebase as **greenfield** unless maintainers say otherwise: do not add compatibility shims for removed fields, parallel content shapes, or tests framed as “legacy” without an explicit request. When you rename or remove a type, content field, or public URL, update **call sites**, **content**, and **tests** in the same change.

## Repository layout (read this first)

This is a **single npm package** (not a Turbo/npm-workspaces monorepo). High-level structure and how to run the dev server are in **[README.md](README.md)**. There is no separate `CONTRIBUTING.md`; contribution expectations in the README still apply.

**Where to work:**

| Goal                                                              | Location                                                                                                                                                                                               |
| ----------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Pages and routes                                                  | `src/pages/` (aliases `@pages/*`)                                                                                                                                                                      |
| Astro components                                                  | `src/components/` (`@components/*`)                                                                                                                                                                    |
| Layouts, head, shared page chrome                                 | `src/layouts/` (`@layouts/*`)                                                                                                                                                                          |
| CV copy and structured data (primary source when not using CMS)   | `src/content.ts`                                                                                                                                                                                       |
| Typed domain models (`JobExperience`, `PersonalData`, …)          | `src/model/` (`@model/*`)                                                                                                                                                                              |
| Integrations and helpers (Contentful, geolocation, style helpers) | `src/lib/` (`@lib/*`)                                                                                                                                                                                  |
| Global styles (SCSS, Tailwind-adjacent)                           | `src/styles/` (`@styles/*`)                                                                                                                                                                            |
| Static assets                                                     | `public/`                                                                                                                                                                                              |
| One-off scripts (e.g. LinkedIn importer)                          | `tools/` (`@tools/*`)                                                                                                                                                                                  |
| Vitest suites                                                     | `tests/` (`*.test.ts`)                                                                                                                                                                                 |
| Agent rules, skills, subagent personas                            | `.agents/`                                                                                                                                                                                             |
| Cursor-specific editor rules                                      | `.cursor/rules/`                                                                                                                                                                                       |
| Architecture decisions (ADRs)                                     | `docs/adr/` — index and template in [`docs/adr/README.md`](docs/adr/README.md); follow **[`.agents/rules/architecture-adrs.md`](.agents/rules/architecture-adrs.md)** when a change warrants a new ADR |

**Path aliases** are defined in [`tsconfig.json`](tsconfig.json) (`@/*` → `./src/*`, plus `@components/*`, `@layouts/*`, `@model/*`, `@lib/*`, `@styles/*`, `@pages/*`, `@tools/*`). Prefer these over deep relative imports in TypeScript.

### Architecture (ADRs)

Significant, cross-cutting, or hard-to-reverse decisions belong in **Architectural Decision Records** under **`docs/adr/`**. Read [`.agents/rules/architecture-adrs.md`](.agents/rules/architecture-adrs.md) and `docs/adr/README.md` before implementing work that matches “when to add an ADR”. Add a numbered ADR from `docs/adr/TEMPLATE.md`, update the index table in `docs/adr/README.md`, and land the ADR **in the same change** as the code or config. If `docs/adr/` does not exist yet for a decision that clearly needs an ADR, create the folder, index, and template per that rule file.

## Coding Standards

Guardrails in use **must** be respected:

- **ESLint**: Run `npm run lint` before committing.
- **Prettier**: Code must be formatted (`npm run format` / `npm run format:check`).
- **TypeScript**: Astro’s **strict** tsconfig is extended; avoid `any` unless justified and localized.
- **Reusability**: Prefer small, composable Astro components and shared helpers under `src/lib/` instead of duplication.
- **Stack fit**: Most UI is **`.astro`** with **Alpine** where needed. Rules under `.agents/rules/` for **React** components, **hooks**, and **contexts** apply when you touch React/islands or patterns that mirror them—read the relevant rule file before editing that area.
- **Generated output**: Do not hand-edit build output under any **`dist/`** directory. Change **`src/`** (or config) and let `npm run build` regenerate artifacts.

## Testing

Coverage is real but finite: **treat gaps as something to shrink**, not an excuse to skip tests when behavior is testable.

- **Unit / integration logic**: **Vitest** — `npm run test`, `npm run coverage`. Tests live under **`tests/`** (see existing `*.test.ts` files).
- **Workflows**: CI runs format check, lint, build, and coverage in **[`.github/workflows/test.yml`](.github/workflows/test.yml)**. **[`.github/workflows/astro.yml`](.github/workflows/astro.yml)** deploys the static GitHub Pages build on `main`.
- **How to work**: Follow **[`.agents/subagents/testing-agent.md`](.agents/subagents/testing-agent.md)** for mindset and Vitest patterns; use **[`.agents/subagents/unit-tester.md`](.agents/subagents/unit-tester.md)** for focused unit work. That subagent file may mention other repos’ folder names—**prefer the table above** for this project’s paths.
- **E2E**: There is no Playwright suite wired in this package yet. If you add browser E2E, follow **[`.agents/subagents/playwright-ui.md`](.agents/subagents/playwright-ui.md)** and hook a script plus CI job so the pipeline stays honest.

For testability expectations on specific kinds of changes, see **[`.agents/rules/testing-requirements.md`](.agents/rules/testing-requirements.md)**.

## Development Workflow

1. Implement the feature or fix (add or extend **Vitest** tests when the behavior is user-facing or easy to lock down).
2. Run **`npm run format:check`**, **`npm run lint`**, **`npm run build`**, and **`npm run coverage`** (or at minimum the subset you touched; CI runs the full set).
3. Leave **git commit** and **push** to the human maintainer unless they explicitly asked you to perform version control.

> [!IMPORTANT]
> **Agents must not perform `git commit` or `git push` by default.** Report what changed and which commands you ran; the user decides when to commit and publish.

## Sub-Agents (Personas)

Detailed personas live under **`.agents/subagents/`**.

### Test Engineer

- Default stance when changing testable behavior: read **`.agents/subagents/testing-agent.md`** first, then **`.agents/subagents/unit-tester.md`** for focused unit work.
- Ensures important logic and integrations have Vitest coverage; plans for E2E when journeys warrant it.

### UI / Frontend (Astro + Tailwind)

- Prefer **[`.agents/skills/frontend-ui-engineering/SKILL.md`](.agents/skills/frontend-ui-engineering/SKILL.md)** when building or polishing layouts, typography, and responsive behavior.

### React Developer & “React rules”

- Use **`.agents/subagents/react-developer.md`** and **`.agents/rules/components.md`**, **`.agents/rules/hooks.md`**, **`.agents/rules/contexts.md`** when the change involves React islands, hooks-heavy TS, or patterns those documents describe.

### Feature Documenter

- Technical writing for user-facing docs or deep dives: **`.agents/subagents/feature-documenter.md`**.

### Security Reviewer

- Anything touching secrets, env vars, user-supplied data, or third-party APIs: **`.agents/subagents/security-reviewer.md`** and **`.agents/skills/security-and-hardening/SKILL.md`** as appropriate.

## Skills & Patterns

- **Discovering which skill applies**: **[`.agents/skills/using-agent-skills/SKILL.md`](.agents/skills/using-agent-skills/SKILL.md)**.
- **Large or multi-file changes**: **[`.agents/skills/incremental-implementation/SKILL.md`](.agents/skills/incremental-implementation/SKILL.md)**.
- **Components / contexts / hooks (when relevant)**: **`.agents/rules/components.md`**, **`.agents/rules/contexts.md`**, **`.agents/rules/hooks.md`**.
- **Architecture / ADRs**: **`.agents/rules/architecture-adrs.md`** and **`docs/adr/README.md`** when decisions are significant, cross-cutting, or hard to reverse.
