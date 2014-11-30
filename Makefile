image := totododo

.PHONY: image clean

image:
	docker build --rm -t $(image) .

clean:
	-rm totododo/static/bundle.js
	-rm totododo/static/bundle.min.js
	-rm -r node_modules
	-rm totododo/*.pyc
