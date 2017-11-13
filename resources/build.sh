#!/bin/bash

set -e
set -o pipefail

if [ ! -d "node_modules/.bin" ]; then
  echo "Be sure to run \`npm install\` before building GraphiQL."
  exit 1
fi

rm -rf dist/ && mkdir -p dist/
babel src --ignore __tests__ --out-dir dist/

echo "Bundling graphiql.js..."
browserify -g browserify-shim -s GraphiQL dist/index.js > graphiql.js
echo "Bundling graphiql.min.js..."
browserify -g browserify-shim -t uglifyify -s GraphiQL dist/index.js 2> /dev/null | uglifyjs -c > graphiql.min.js 2> /dev/null
echo "Bundling graphiql.css..."
postcss --no-map --use autoprefixer -d dist/ css/*.css
cat dist/*.css > graphiql.css

echo "Bundling subzero_graphiql.js..."
browserify -g browserify-shim -s subZeroGraphiQL dist/subzero_index.js > subzero_graphiql.js
echo "Bundling subzero_graphiql.min.js..."
browserify -g browserify-shim -g uglifyify -s subZeroGraphiQL dist/subzero_index.js 2> /dev/null | uglifyjs -c --screw-ie8 > subzero_graphiql.min.js 2> /dev/null
echo "Bundling subzero_graphiql.css..."
postcss --no-map --use autoprefixer -d dist/ css/*.css
cat dist/*.css > subzero_graphiql.css

git config --global user.email "$GH_EMAIL" > /dev/null 2>&1
git config --global user.name "$GH_NAME" > /dev/null 2>&1

# stage any changes and new files
git add -A
# now commit, ignoring branch gh-pages doesn't seem to work, so trying skip
git commit --allow-empty -m "Deploy to GitHub [ci skip]"
# and push, but send any output to /dev/null to hide anything sensitive
git push --quiet origin master

echo "Done"
