# Gum*node*

Gumnode is an unoffical Node.js API client library for Gumroad.

It's promise-based, slim, and supports all of Gumroad's latest API endpoints.

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
