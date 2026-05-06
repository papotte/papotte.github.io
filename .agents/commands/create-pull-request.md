# create-pull-request

Create a pull request description using the `.github/PULL_REQUEST_TEMPLATE.md` template.

## Instructions

1. Read the `.github/PULL_REQUEST_TEMPLATE.md` file to get the template structure

2. **Always compare the current branch to `origin/main`** - use `git diff origin/main...HEAD` and `git log origin/main..HEAD` to analyze changes

3. Analyze the git changes (use `git diff --stat origin/main...HEAD` to understand what files changed)

4. Look at commit messages in the branch (use `git log --oneline origin/main..HEAD`) to understand the context

5. **Issue / ticket (optional):** A tracking link or id is **not** required. If the branch name or commits clearly reference an issue (e.g. GitHub `#123`, `fixes #456`, a Jira/Linear-style id like `ABC-789`, or a full URL), fill the template’s **Issue** section with a short line and link when you can infer or construct it. If this repo later connects **Linear**, **GitHub Issues**, or another tool (including via MCP), you may use that integration to resolve a URL when the id is obvious—**never block** generating the PR description on ticket resolution. If nothing is referenced, **leave the Issue section blank** (or a brief “N/A”) and do not ask the user for a ticket unless they explicitly want one linked.

6. Generate a pull request description that:
   - Follows the template structure exactly

   - Includes a meaningful description based on the changes

   - References an issue in the **Issue** section only when one is clear from branch/commits (or user-supplied context); otherwise leave it empty

   - Fills out relevant sections based on the changes made

   - Does NOT include file counts or "Files Changed" statistics

   - Does NOT explicitly list localization keys/files unless it's a major localization refactor

   - Does NOT include a "Technical Changes" section for feature PRs - focus on user-facing features and functionality. However, for refactoring PRs with minimal user-facing changes, technical changes are appropriate to describe what was refactored and why

7. **Suggest a squash commit title** following **commitlint** / Conventional Commits: `type(scope): subject`. Use lowercase subject, imperative mood, no period at the end, ~50–72 characters. Common types: `feat`, `fix`, `docs`, `chore`, `refactor`, `style`, `test`. Scope is optional (e.g. `feat(auth): add login` or `docs: add CONTRIBUTING`). **Optionally** append a tracker id in brackets at the end when one is already known from the branch or commits (e.g. `feat(auth): add login [ABC-123]` or `fix: handle empty state [#78]`). Do not invent ids.

8. **Output the result** in this order:
   - **Suggested squash commit title:** (one line, commitlint format)
   - A markdown code block with the full PR description:

```markdown
[the complete PR description here]
```

## Example Output Format

- First line: **Suggested squash commit title:** `type(scope): imperative subject`, optionally with `[TICKET-123]` or `[#456]` when grounded in branch/commit context
- Then a single markdown code block containing the filled-out template, ready to be copied into a GitHub pull request.

## Notes

- **Always compare against `origin/main`** - never use uncommitted changes or compare to other branches without the user asking

- Always use the exact template structure from `.github/PULL_REQUEST_TEMPLATE.md`

- Base the description on actual code changes between the current branch and `origin/main`, not assumptions

- **Tickets are optional:** do not require an issue id, do not delay PR output to wait for ticket info, and do not insist the user provide one

- Be descriptive about what changed and why, based on the actual diff from `origin/main`

- Always suggest a **squash commit title** in commitlint format (`type(scope): subject`); append a bracketed tracker reference only when it is already evident from context

- **Do NOT include a "Files Changed" section** or file count statistics in the PR description

- **Do NOT mention localization keys or translation files explicitly** unless it's a major refactor of the localization system itself. For regular feature additions, just mention that translations were added/updated without listing specific keys or files

- **Do NOT include a "Technical Changes" section for feature PRs** - focus on what the feature does for users, not implementation details. However, for refactoring PRs with minimal user-facing changes, technical changes are appropriate to describe what was refactored and why
