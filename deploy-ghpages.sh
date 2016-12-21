#!/bin/sh
git add dist && git commit -m "publish to gh-pages site"
#git subtree push --prefix dist origin gh-pages
git push origin `git subtree split --prefix dist master`:gh-pages --force
