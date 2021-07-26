# Gumnode

Gumnode is a Node.js API wrapper for [Gumroad](https://gumroad.com).

It's promise-based, slim, and supports all of Gumroad's [latest API endpoints](https://app.gumroad.com/api).

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
