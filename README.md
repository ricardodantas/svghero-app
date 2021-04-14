![Powered by Electron](https://img.shields.io/badge/powered%20by-Electron-brightgreen?style=flat-square) ![GitHub branch checks state](https://img.shields.io/github/checks-status/ricardodantas/svghero-app/master?style=flat-square) ![GitHub](https://img.shields.io/github/license/ricardodantas/svghero-app?style=flat-square) ![GitHub issues](https://img.shields.io/github/issues/ricardodantas/svghero-app?style=flat-square) ![GitHub last commit](https://img.shields.io/github/last-commit/ricardodantas/svghero-app?style=flat-square) ![GitHub all releases](https://img.shields.io/github/downloads/ricardodantas/svghero-app/total?style=flat-square)

# SVG Hero

Multi-platform (Mac, Windows, Linux) app that minifies SVG files and exports to PNG, JPG, TIFF or WEBP.

[![Check the video preview!](https://img.youtube.com/vi/MTGt5tQc-vo/0.jpg)](https://www.youtube.com/watch?v=MTGt5tQc-vo 'Check the video preview!')

Check the video preview 👆

---

## Contributing

More details on [CONTRIBUTING](CONTRIBUTING.md).

## Code of conduct

See [CODE_OF_CONDUCT](CODE_OF_CONDUCT.md).

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

## Issues with certificates (Apple):

1. Change your trust settings of your developer certificate in keychain access to system default
2. Delete all certificates in your local keychain
3. Quit and relaunch xcode
4. Clean
5. Run program on device
6. When it asks, enter your keychain password and click always trust

## Check Mac Code Sign

```
codesign --display --verbose=2  SvgHero.app // If the app is signed it will display the details in the Terminal.
pkgutil --check-signature SvgHero-1.0.0.pkg // If it is signed it will display the details in the Terminal.
```

## Resources

- electron-react-boilerplate [docs and guides](https://electron-react-boilerplate.js.org/docs/installation);

- Installation or compilation issues with this project, check [electron-react-boilerplate debugging guide](https://github.com/electron-react-boilerplate/electron-react-boilerplate/issues/400);

## License

GPL-3.0, see [LICENSE](https://github.com/ricardodantas/svghero-app/blob/master/LICENSE).
