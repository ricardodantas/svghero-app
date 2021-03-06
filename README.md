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

## Debug Packaged app

1. Run the command bellow on terminal:

```
open /Applications/SvgHero.app --args --remote-debugging-port=8315
```

2. Navigate to `chrome://inspect/#devices` in Chrome 80+. Then click `Configure...` and add `localhost:8315` as a discovery server.

3. Then, wait for your Electron instance to appear in the devices list and click `inspec`
