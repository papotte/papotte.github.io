---
description: Architecture — document significant decisions as ADRs under docs/adr (agents must write ADRs when criteria match)
alwaysApply: true
---

# Architecture decisions (ADRs)

## Agent requirement (read this first)

If the work you are doing matches **When to add an ADR** below, you **must produce the ADR as part of the same change** (same branch / PR as the code or config), not as a promised follow-up.

1. **Read** **`docs/adr/README.md`** (“When to add an ADR”) and this file.
2. **Create** `docs/adr/NNNN-kebab-case-title.md` from **`docs/adr/TEMPLATE.md`** with the next four-digit `NNNN` after the highest existing numbered ADR (see **`docs/adr/README.md`** index).
3. **Update** the index table in **`docs/adr/README.md`** with a new row linking to your ADR.
4. Start **Status** at **`Proposed`** unless the task explicitly accepts the decision; use **`Accepted`** when appropriate after review.

If you are **unsure** whether an ADR is needed, **write a short ADR anyway** (one page is enough). Rationale belongs in the repo, not only in chat or a PR description.

---

## Rules

- **Location:** All ADRs live under **`docs/adr/`**. Do not place ADRs elsewhere.
- **When:** Add a new ADR when the change is **significant, cross-cutting, or hard to reverse** — for example:
  - Choosing, replacing, or upgrading a **framework**, **runtime**, or **major library** (e.g. test runner, state layer, 3D engine wrapper pattern)
  - **Security or data boundaries** (auth model, what lives client vs server, telemetry or PII handling)
  - **Major API or caching** patterns used app-wide
  - **New conventions** that contradict or extend what is already documented in `AGENTS.md` or prior ADRs  
    **Skip** for small refactors, typo fixes, or single-file behavior tweaks with no precedent effect.
- **Format:** Copy the structure from **`docs/adr/TEMPLATE.md`**. Filename: **`NNNN-kebab-case-title.md`** with the next four-digit index after existing numbered ADRs.
- **Lifecycle:** Use **Status** `Proposed` until review; set **`Accepted`** when merged. If a later decision replaces this one, mark the old ADR **Deprecated** or **Superseded by ADR-XXXX** and add a new ADR for the replacement.
- **Index:** Add a row to the table in **`docs/adr/README.md`** when you add an ADR — required, not optional.
