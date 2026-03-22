#!/bin/bash
# Guardrail: Prevents pushing to main, committing on main, and force pushes.
# Used as a PreToolUse hook on the Bash tool.
# Exit 0 = allow, Exit 2 = deny (with message on stderr).

# Read the tool input from stdin
INPUT=$(cat)

# Extract the command from the JSON input
COMMAND=$(echo "$INPUT" | grep -o '"command":"[^"]*"' | sed 's/"command":"//;s/"$//' 2>/dev/null)
if [ -z "$COMMAND" ]; then
  COMMAND=$(echo "$INPUT" | sed -n 's/.*"command"[[:space:]]*:[[:space:]]*"\(.*\)"/\1/p' 2>/dev/null)
fi

# If we couldn't parse the command, allow it (don't block non-git commands)
if [ -z "$COMMAND" ]; then
  exit 0
fi

# Block force pushes entirely
if echo "$COMMAND" | grep -qE 'git\s+push\s+.*(-f|--force)'; then
  echo "BLOCKED: Force pushing is not allowed. Use a regular push and a Pull Request." >&2
  exit 2
fi

# Block pushing to main/master
if echo "$COMMAND" | grep -qE 'git\s+push\s+(origin\s+)?(main|master)'; then
  echo "BLOCKED: Pushing directly to main is not allowed. Use a feature branch and open a Pull Request." >&2
  exit 2
fi

# Block committing when on main branch
if echo "$COMMAND" | grep -qE 'git\s+commit'; then
  CURRENT_BRANCH=$(git branch --show-current 2>/dev/null)
  if [ "$CURRENT_BRANCH" = "main" ] || [ "$CURRENT_BRANCH" = "master" ]; then
    echo "BLOCKED: Cannot commit directly to main. Create a feature branch first: git checkout -b feature/your-description" >&2
    exit 2
  fi
fi

# Allow everything else
exit 0
