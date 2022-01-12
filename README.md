# Gumnode

Gumnode is a Node.js API wrapper for [Gumroad](https://gumroad.com).

It's promise-based, slim, and supports Gumroad's [latest API endpoints](https://app.gumroad.com/api).

> Submit an [Issue](https://github.com/noahbuscher/gumnode/issues) if you find an outdated endpoint or find a new one you want Gumnode to support.

## Install

```
npm install gumnode

or

yarn install gumnode
```

## Usage

```javascript
const Gumnode = require("gumnode");

const api = new Gumnode({
  access_token: "YOUR_ACCESS_TOKEN",
});

api
  .getProduct({ product_id: "PRODUCT_ID" })
  .then((response) => console.log("Found product:", response))
  .catch((response) => console.log("Error:", response.message));
```

## Todo

- [ ] Add docs to functions
- [ ] Add tests
