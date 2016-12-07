#!/bin/sh
git add dist && git commit -m "update site"
git subtree push --prefix dist origin gh-pages
