# SVG Hero

## Install

- **If you have installation or compilation issues with this project, please see [our debugging guide](https://github.com/electron-react-boilerplate/electron-react-boilerplate/issues/400)**

## Starting Development

Start the app in the `dev` environment:

```bash
yarn
yarn start
```

## Packaging for Production

To package apps for the local platform:

```bash
yarn package
```

---

## Docs

See our [docs and guides here](https://electron-react-boilerplate.js.org/docs/installation)

---

## Create Linux package with docker

```
docker run --rm -ti \
 --env-file <(env | grep -iE 'DEBUG|NODE_|ELECTRON_|YARN_|NPM_|CI|CIRCLE|TRAVIS_TAG|TRAVIS|TRAVIS_REPO_|TRAVIS_BUILD_|TRAVIS_BRANCH|TRAVIS_PULL_REQUEST_|APPVEYOR_|CSC_|GH_|GITHUB_|BT_|AWS_|STRIP|BUILD_') \
 --env ELECTRON_CACHE="/root/.cache/electron" \
 --env ELECTRON_BUILDER_CACHE="/root/.cache/electron-builder" \
 -v ${PWD}:/project \
 -v ${PWD##*/}-node-modules:/project/node_modules \
 -v ~/.cache/electron:/root/.cache/electron \
 -v ~/.cache/electron-builder:/root/.cache/electron-builder \
 electronuserland/builder:wine
```

## Debug Packaged app

1. Run the command bellow on terminal:

```
open /Applications/SvgHero.app --args --remote-debugging-port=8315
```

2. Navigate to `chrome://inspect/#devices` in Chrome 80+. Then click `Configure...` and add `localhost:8315` as a discovery server.

3. Then, wait for your Electron instance to appear in the devices list and click `inspec`
