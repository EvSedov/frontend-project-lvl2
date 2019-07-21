run:
	npx babel-node 'src/gendiff/index.js' 10

build:
	rm -rf dist
	npm run build

lint:
	npx eslint .

publish:
	npm publish --dry-run

test:
	npm test
