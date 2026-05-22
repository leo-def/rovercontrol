# Variables
NPM = npm

.PHONY: all
all: build

# Install dependencies
.PHONY: install
install:
	$(NPM) install

# Build compiled TypeScript
.PHONY: build
build:
	$(NPM) run build

# Start console CLI rover session
.PHONY: start
start:
	$(NPM) run start:console

# Run Jest unit test suite
.PHONY: test
test:
	$(NPM) run test

# Clean build folders
.PHONY: clean
clean:
	rm -rf dist/ build/
