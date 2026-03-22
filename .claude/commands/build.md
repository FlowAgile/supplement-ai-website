---
description: Full workflow - build, test, and ship a feature
argument-hint: [describe what to build]
allowed-tools: Read, Write, Edit, Glob, Grep, Bash(git:*), Bash(npm:*), Bash(npx:*), Bash(gh:*), TodoWrite, Agent
---

## Context

- Current branch: !`git branch --show-current`
- Git status: !`git status --short`
- Project: !`basename $(pwd)`

## Task

Launch the **lead** agent to coordinate a full build-test-ship pipeline for this request:

$ARGUMENTS

The Lead agent will:
1. Break the request into tasks
2. Delegate to Dev to build the feature
3. Delegate to Tester to verify it works
4. Delegate to Shipper to push and create a PR
5. Report the final result with PR link and next steps

The user (Mike or Trevor) will then review the Vercel preview and merge the PR on GitHub when ready.
