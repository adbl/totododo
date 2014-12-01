image := totododo

.PHONY: image clean

image: db/totododo.sqlite3
	docker build --rm -t $(image) .

db: db/db.sqlite3

db/db.sqlite3: db/schema.sql
	sqlite3 $@ < db/schema.sql

clean:
	-rm totododo/static/bundle.js
	-rm totododo/static/bundle.min.js
	-rm -r node_modules
	-rm totododo/*.pyc
