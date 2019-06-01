run:
	npx babel-node 'src/bin/gendiff.js' 10

build:
	rm -rf dist
	npm run build

lint:
	npx eslint "src/**"

publish:
	npm publish --dry-run

test:
	npm test