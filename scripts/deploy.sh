#! /bin/bash

: "Before script of Deploy" && {
  yarn install
  yarn build
  echo '//registry.npmjs.org/:_authToken="${NPM_TOKEN}"' >> .npmrc
}

: "Deploy task" && {
  npm publish
}

: "After script of Deploy" && {
  cp .npmrc.template .npmrc
  npx ts-node ./scripts/notify.ts
}
