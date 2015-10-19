BIN = ./node_modules/.bin

.PHONY: serve bootstrap;

serve:
	@$(BIN)/http-server ./src -o -p 9999 -c-1

bootstrap:
	@npm install