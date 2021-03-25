#!/bin/bash
# LAST_TAG=$(git describe --abbrev=0 --tags `git rev-list --tags --max-count=1`)
# echo $LAST_TAG

# PREVIOUS_TAG=$(git describe --abbrev=0 --tags `git rev-list --tags --skip=1 --max-count=1`)
# echo $PREVIOUS_TAG

# echo Getting diff between $LAST_TAG and $PREVIOUS_TAG
# HAS_DIFF=$(git diff --quiet $LAST_TAG $PREVIOUS_TAG apps/api/src/ || echo "true")

# if [ $HAS_DIFF = "true" ]
# then
#   echo "Last two tags have diff"
#   exit 1
# else
#   echo "Last two tags have no diff"
#   exit 0
# fi
exit 1