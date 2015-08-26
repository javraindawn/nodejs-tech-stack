#!/usr/bin/env bash

export NODE_ENV='test'

function testComplete {
  echo "Tests completed with mock Postgres DB."
}

function run {
  "$@"
  local status=$?
  if [ $status -ne 0 ]; then
    testComplete
    exit 1
  fi
  return $status
}

run npm run gulp lint

run lab -v -t 50
