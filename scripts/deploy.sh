#! /bin/bash

: "Prepare SSH Key for Github" && {
  openssl aes-256-cbc -K $encrypted_3052b21f39dc_key -iv $encrypted_3052b21f39dc_iv -in travis_key.enc -out ~/.ssh/id_rsa -d
  chmod 600 ~/.ssh/id_rsa
  echo -e "Host github.com\n\tStrictHostKeyChecking no\n" >> ~/.ssh/config
}

: "Git Settings" && {
  git config --global user.email "6715229+Himenon@users.noreply.github.com"
  git config --global user.name "Himenon"
}

: "Before script of Deploy" && {
  yarn install
  yarn build
}

# TODO: 自動で major, minor, patchを作る
: "Generate Change Log" && {
  yarn run ci:version_up:patch
}

: "Deploy task" && {
  echo '//registry.npmjs.org/:_authToken="${NPM_TOKEN}"' >> .npmrc
  npm publish
  npx ts-node ./scripts/notify.ts
}

: "After script of Deploy" && {
  cp .npmrc.template .npmrc
}

: "Push Github" && {
  git remote add upstream git@github.com:Himenon/typescript-template.git
  git push upstream master
  git push upstream --tags
}

: "Github Release" && {
  echo "TODO Release Task"
}

