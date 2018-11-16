#! /bin/bash

: "Push Github" && {
  git push "https://${GH_TOKEN}@github.com/Himenon/typescript-template.git" master:ci-test
  git push origin --tags
}

: "Github Release" && {
  echo "TODO Release Task"
}