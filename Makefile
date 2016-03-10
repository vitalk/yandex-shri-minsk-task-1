CURRENT = $(shell git rev-parse --short HEAD)

build:
	grunt clean
	grunt less:stylesheets
	grunt inline

gh-pages: build
	git checkout -b gh-pages-$(CURRENT)
	git add -f index.html
	git commit --allow-empty -m "Update gh-pages at $(CURRENT)"
	git push origin gh-pages-$(CURRENT):gh-pages --force
	git checkout -
	git branch -D gh-pages-$(CURRENT)

.PHONY: build gh-pages
