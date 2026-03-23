---
description: Push the current branch and create a Pull Request
allowed-tools: Read, Glob, Grep, Bash(git:*), Bash(gh:*)
---

## Context

- Current branch: !`git branch --show-current`
- Git status: !`git status --short`

## Task

Launch the **shipper** agent to:
1. Verify we are NOT on the main branch (refuse if we are)
2. Commit any remaining changes
3. Push the branch to GitHub
4. Create a Pull Request using `gh pr create --fill`
5. Report the PR number, link, and next steps
