#! /bin/bash

: "Before script of Deploy" && {
  yarn install
  yarn build
}

: "Deploy task" && {
  yarn publish --non-interactive --use-yarnrc .yarnrc
}

: "After script of Deploy" && {
  npx ts-node ./scripts/notify.ts
}
