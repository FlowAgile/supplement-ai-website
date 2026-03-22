---
description: Run QA checks on the current branch
allowed-tools: Read, Glob, Grep, Bash(npm:*), Bash(npx:*), Bash(git:*), TodoWrite
---

## Context

- Current branch: !`git branch --show-current`
- Changed files: !`git diff main --stat`

## Task

Launch the **tester** agent to run quality checks on the current branch. It will:
1. Run the build (`npm run build`)
2. Run the linter (`npm run lint`)
3. Review the code changes
4. Report a pass/fail verdict in plain English

If everything passes, suggest the user run `/ship` to create a Pull Request.
