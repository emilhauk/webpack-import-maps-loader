# webpack-import-maps-loader

Plugin to rewrite bare imports to URLs as defined in [import map](https://github.com/WICG/import-maps)

## Installation

```bash
$ npm install -D webpack-import-maps-loader
```

## Usage

With module map inlined:
```js
export default {
  // ...other webpack config
  module: {
    rules: [
      {
        test: /\.[tj]sx?$/,
        use: {
          loader: "webpack-import-maps-loader",
          options: {
            imports: {
              "bare-import": "https://assets.domain.tld/bare-import/index.js",
            },
          },
        },
      }
    ]
  }
};
```

Or loaded as a file:
```js
// import-map.json
{
  imports: {
    "bare-import": "https://assets.domain.tld/bare-import/index.js",
  }
}

// webpack.config.js
export default {
  module: {
    rules: [
      {
        test: /\.[tj]sx?$/,
        use: {
          loader: "webpack-import-maps-loader",
          options: require('./import-map.json'),
        },
      },
    ],
  },
};
```
