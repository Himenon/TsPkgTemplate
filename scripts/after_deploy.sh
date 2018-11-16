#! /bin/bash

: "Prepare SSH Key for Github" && {
  openssl aes-256-cbc -K $encrypted_xxxx_key -iv $encrypted_xxxx_iv -in travis_key.enc -out ~/.ssh/id_rsa -d
  chmod 600 ~/.ssh/id_rsa
  echo -e "Host github.com\n\tStrictHostKeyChecking no\n" >> ~/.ssh/config
}

: "Git Settings" && {
  git config --global user.email "6715229+Himenon@users.noreply.github.com"
  git config --global user.name "Himenon"
}

: "Generate Change Log" && {
  npx changelog -p
  git add CHANGELOG.md
  git commit -m "chore(change-log): updated CHANGELOG.md"
}

# npx ts-node ./scripts/notify.ts
# TODO: 自動で major, minor, patchを作る
: "npm package version Up" && {
  npm version patch
}

: "Push Github" && {
  git push "https://${GH_TOKEN}@github.com/Himenon/typescript-template.git" master:ci-test
  git push origin --tags
}
