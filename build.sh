rm -rf dist && mkdir dist && mkdir dist/api
npx babel src --out-dir dist/api --ignore node_modules
cp package.json dist/api
cd dist/api && yarn install --production --modules-folder node_modules
