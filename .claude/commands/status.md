---
description: Show current project status
allowed-tools: Bash(git:*), Bash(gh:*), Read
---

## Task

Give a quick, plain-English status report. Run these commands and summarize the results:

1. **Current branch:** `git branch --show-current`
2. **Uncommitted changes:** `git status --short`
3. **Recent commits on this branch:** `git log --oneline -5`
4. **Open Pull Requests:** `gh pr list --state open`
5. **Branch vs main:** `git log main..HEAD --oneline` (commits ahead of main)

Format the report like this:

**Branch:** [branch name]
**Changes:** [number of uncommitted files, or "Clean"]
**Commits ahead of main:** [number, or "Up to date"]
**Open PRs:** [list with PR numbers and titles, or "None"]

Keep it short and readable. No technical jargon.
