#!/bin/bash

GIT_DIFF="$(git diff --quiet HEAD~1 HEAD -- apps/client/src || echo true)"

if [ "$GIT_DIFF" = "true" ]; then
    echo 1
else
    echo 0
fi