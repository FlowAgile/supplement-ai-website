---
description: Tell Dev to build a feature or fix a bug
argument-hint: [describe what to build or fix]
allowed-tools: Read, Write, Edit, Glob, Grep, Bash(git:*), Bash(npm:*), Bash(npx:*), TodoWrite
---

## Context

- Current branch: !`git branch --show-current`
- Git status: !`git status --short`

## Task

Launch the **dev** agent to handle this request. Pass along the full context above and the user's request:

$ARGUMENTS

The dev agent will create a feature branch (if needed), write the code, and commit. After it finishes, suggest the user run `/test` to verify the build passes.
