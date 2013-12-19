---
layout: post
title: "Building pgRouting Ubuntu packages with git-buildpackage"
author: "Daniel Kastl"
date: 2010-11-29 12:00:00
tags: 
  - pgRouting 
  - Ubuntu 
  - Launchpad 
  - Git 
  - Packaging
published: false
comments: true
language: en
---

Recently [pgRouting released version 1.05][1] and migrated its repository to [Git and GitHub][2]. Furthermore Ubuntu released version 10.10 "Maverick Meerkat" in October, so it was about time to build new packages for pgRouting and upload them to the Georepublic [pgRouting PPA][3] on Launchpad.

Instead of building packages the straight-forward way as with previous releases I wanted to make use of Git from now on. There are plenty of resources available in internet how to get started, and it doesn't seem to be very difficult. But in the end I run into several problems, because I wanted to ...

- use the same pgRouting repository (master branch), but keep the building packages part independent in separate branches
- import the latest package available from pgRouting PPA and also import the tarball of version 1.05

Well, the major issue was not related to Git at all but to some unresolved issue with a patch of the latest Ubuntu packages. It took quite some time to figure this out. 
Because most of what one needs for making Debian packages has been written many times already, first read here if you need more complete tutorials:

- <http://www.eyrie.org/~eagle/notes/debian/git.html>
- <http://grumbel.blogspot.com/2010/05/how-to-build-ubuntu-package.html>
- <http://honk.sigxcpu.org/projects/git-buildpackage/manual-html/gbp.html>
- <https://wiki.ubuntu.com/PbuilderHowto>
- <http://help.github.com/git-cheat-sheets/>
- <http://madduck.net/blog/2007.10.03:packaging-with-git/>
- <https://www.wzdftpd.net/blog/index.php?post/2008/02/05/3-quilt-a-patch-management-system-how-to-survive-with-many-patches>
- <http://sigsucc.se/talks/debian-packaging-using-git-workshop/debian-packaging-using-git-workshop>

All of those resources were pretty useful. 
Her some more pgRouting specific commands and custom scripts:

## Custom build scripts

Create a `~/.gbp.conf` file in the home directory.

``` 
[DEFAULT]
builder = ~/Repository/Ubuntu/bin/git-pbuilder.sh
cleaner = fakeroot debian/rules clean
pristine-tar = True
upstream-branch=upstream
debian-branch=debian

[git-buildpackage]
export-dir = ~/Repository/Ubuntu/build-area/
tarball-dir = ~/Repository/Ubuntu/tarballs/
sign-tags = True

[git-dch]
git-log=--no-merges
```

Then I downloaded `~/Repository/Ubuntu/bin/git-pbuilder` 1.17 script (with custom build paths) from <http://www.eyrie.org/~eagle/software/scripts/> and modified `~/.pbuilderrc` (with custom build paths):

```
# Enable
BASEPATH="/var/cache/pbuilder/base-$NAME.cow/"
# Add OTHERMIRROR pgRouting PPA
elif $(echo ${UBUNTU_SUITES[@]} | grep -q $DIST); then
    # Ubuntu configuration
    MIRRORSITE="http://$UBUNTU_MIRROR/ubuntu/"
    COMPONENTS="main restricted universe multiverse"
    DEBOOTSTRAPOPTS=("${DEBOOTSTRAPOPTS[@]}" "--keyring=/usr/share/keyrings/ubuntu-archive-keyring.gpg")
    #OTHERMIRROR="$OTHERMIRROR | deb file:///var/cache/archive $DIST/"
    OTHERMIRROR="$OTHERMIRROR | deb http://ppa.launchpad.net/georepublic/pgrouting/ubuntu $DIST main"
else
```

## Create (update) build environmet

```
DIST=maverick ARCH=i386 git-buildpackage create
DIST=maverick ARCH=i386 git-buildpackage update
```

## Clone Git repository and add branches

```
git clone git@github.com:pgRouting/pgrouting.git
cd pgrouting
```

Create empty branches "debian" and "upstream"

```
git symbolic-ref HEAD refs/heads/upstream
git rm --cached -r .
rm -fr *
git commit --allow-empty -m "Initialized upstream branch."

git symbolic-ref HEAD refs/heads/debian
git rm --cached -r .
rm -fr *
git commit --allow-empty -m "Initialized debian branch."
```

Import .dsc file(s) and/or release tarball files

```
git checkout debian
git-import-dscs ~/Repository/Ubuntu/pgrouting/*.dsc
git-import-orig ~/Repository/Ubuntu/pgrouting/pgrouting-1.05.tar.gz
```

## Build and sign packages and upload them to Launchpad

Build and set tag

```
git-dch --release
git-commit -m "Changelog commit message" .
DIST=maverick ARCH=amd64 git-buildpackage --git-tag
```

Sign and build "source.changes" file for upload to Launchpad

```
DIST=maverick ARCH=amd64 git-buildpackage --git-builder="debuild -S -sa"
dput ppa:georepublic/pgrouting ~/Repository/Ubuntu/build-area/pgrouting_1.05-1~maverick1_source.changes
```

## Other useful Git commands

Push branches and tags to remote repository

```
git push origin upstream
git push origin debian
git push origin pristine-tar
git push origin --tags
```

Delete remote branches and tags

```
git push origin :upstream
git push origin :debian
git push origin :pristine-tar
git push origin :debian/1.04-ppa11
git push origin :upstream/1.04
```

Make remote branches locally available 

```
git branch -a
git branch pristine-tar remotes/origin/pristine-tar
git branch debian remotes/origin/debian
git branch upstream remotes/origin/upstream
```

[1]: http://georepublic.de/blog/pgrouting-project-news/
[2]: https://github.com/pgRouting/pgrouting
[3]: https://launchpad.net/~georepublic/+archive/pgrouting 
