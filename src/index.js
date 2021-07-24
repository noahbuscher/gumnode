const axios = require("axios");

class Gumnode {
  constructor(config) {
    this.access_token = config.access_token;
    this.basePath = "https://api.gumroad.com/v2";
  }

  buildError(message) {
    return new Error(message);
  }

  async request(endpoint = "", options = {}) {
    const url = `${this.basePath}${endpoint}`;

    const { params, ...otherOptions } = options;

    const headers = {
      "Content-type": "application/json",
    };

    const config = {
      ...otherOptions,
      params: {
        access_token: this.access_token,
        ...params,
      },
      url,
      headers,
    };

    return new Promise((resolve, reject) => {
      axios(config)
        .then((response) => {
          if (
            response.data &&
            response.data.success &&
            response.status === 200
          ) {
            resolve(response.data);
          } else {
            reject(this.buildError(response.data.message));
          }
        })
        .catch((error) => reject(this.buildError(error)));
    });
  }

  // Retrieve all of the existing products for the authenticated user
  getUserProducts() {
    const url = "/products";

    return new Promise((resolve, reject) => {
      this.request(url)
        .then((data) => resolve(data.products))
        .catch((error) => reject(error));
    });
  }

  // Retrieve the details of a product.
  getProduct({ product_id }) {
    const url = `/products/${product_id}`;

    return new Promise((resolve, reject) => {
      this.request(url)
        .then((data) => resolve(data.product))
        .catch((error) => reject(error));
    });
  }

  // Permanently delete a product.
  deleteProduct({ product_id }) {
    const url = `/products/${product_id}`;

    return new Promise((resolve, reject) => {
      this.request(url, { method: "delete" })
        .then((data) => resolve({ message: data.message }))
        .catch((error) => reject(error));
    });
  }

  // Enable an existing product.
  enableProduct({ product_id }) {
    const url = `/products/${product_id}/enable`;

    return new Promise((resolve, reject) => {
      this.request(url, { method: "put" })
        .then((data) => resolve(data.product))
        .catch((error) => reject(error));
    });
  }

  // Disable an existing product.
  disableProduct({ product_id }) {
    const url = `/products/${product_id}/enable`;

    return new Promise((resolve, reject) => {
      this.request(url, { method: "put" })
        .then((data) => resolve(data.product))
        .catch((error) => reject(error));
    });
  }

  // Create a new variant category on a product.
  createVariantCategory({ product_id }, data) {
    const url = `/products/${product_id}/variant_categories`;

    return new Promise((resolve, reject) => {
      this.request(url, { method: "post", data })
        .then((data) => resolve(data.variant_category))
        .catch((error) => reject(error));
    });
  }

  // Retrieve the details of a variant category of a product.
  getVariantCategory({ product_id, variant_category_id }) {
    const url = `/products/${product_id}/variant_categories/${variant_category_id}`;

    return new Promise((resolve, reject) => {
      this.request(url)
        .then((data) => resolve(data.variant_category))
        .catch((error) => reject(error));
    });
  }

  // Edit a variant category of an existing product.
  updateVariantCategory({ product_id, variant_category_id }, data) {
    const url = `/products/${product_id}/variant_categories/${variant_category_id}`;

    return new Promise((resolve, reject) => {
      this.request(url, {
        method: "put",
        data,
      })
        .then((data) => resolve(data.variant_category))
        .catch((error) => reject(error));
    });
  }

  // Permanently delete a variant category of a product.
  deleteVariantCategory({ product_id, variant_category_id }) {
    const url = `/products/${product_id}/variant_categories/${variant_category_id}`;

    return new Promise((resolve, reject) => {
      this.request(url, {
        method: "delete",
      })
        .then((data) => resolve({ message: data.message }))
        .catch((error) => reject(error));
    });
  }

  // Retrieve all of the existing variant categories of a product.
  getVariantCategories({ product_id, variant_category_id }) {
    const url = `/products/${product_id}/variant_categories/${variant_category_id}`;

    return new Promise((resolve, reject) => {
      this.request(url, {
        method: "delete",
      })
        .then((data) => resolve(data.variant_categories))
        .catch((error) => reject(error));
    });
  }

  // Create a new variant of a product.
  createVariant({ product_id, variant_category_id }, data) {
    const url = `/products/${product_id}/variant_categories/${variant_category_id}/variant`;

    return new Promise((resolve, reject) => {
      this.request(url, {
        method: "post",
        data,
      })
        .then((data) => resolve(data.variant))
        .catch((error) => reject(error));
    });
  }

  // Retrieve the details of a variant of a product.
  getVariant({ product_id, variant_category_id, variant_id }) {
    const url = `/products/${product_id}/variant_categories/${variant_category_id}/variants/${variant_id}`;

    return new Promise((resolve, reject) => {
      this.request(url)
        .then((data) => resolve(data.variant))
        .catch((error) => reject(error));
    });
  }

  // Edit a variant of an existing product.
  updateVariant({ product_id, variant_category_id, variant_id }, data) {
    const url = `/products/${product_id}/variant_categories/${variant_category_id}/variants/${variant_id}`;

    return new Promise((resolve, reject) => {
      this.request(url, { method: "put", data })
        .then((data) => resolve(data.variant))
        .catch((error) => reject(error));
    });
  }

  // Permanently delete a variant of a product.
  deleteVariant({ product_id, variant_category_id, variant_id }) {
    const url = `/products/${product_id}/variant_categories/${variant_category_id}/variants/${variant_id}`;

    return new Promise((resolve, reject) => {
      this.request(url, { method: "delete" })
        .then((data) => resolve({ message: data.message }))
        .catch((error) => reject(error));
    });
  }

  // Retrieve all of the existing variants in a variant category.
  getVariants({ product_id, variant_category_id }) {
    const url = `/products/${product_id}/variant_categories/${variant_category_id}/variants`;

    return new Promise((resolve, reject) => {
      this.request(url)
        .then((data) => resolve(data.variants))
        .catch((error) => reject(error));
    });
  }

  // Retrieve all of the existing offer codes for a product. Either amount_cents or percent_off will be returned depending if the offer code is a fixed amount off or a percentage off. A universal offer code is one that applies to all products.
  getOfferCodes({ product_id }) {
    const url = `/products/${product_id}/offer_codes`;

    return new Promise((resolve, reject) => {
      this.request(url)
        .then((data) => resolve(data.offer_codes))
        .catch((error) => reject(error));
    });
  }

  // Retrieve the details of a specific offer code of a product.
  getOfferCode({ product_id, offer_code_id }) {
    const url = `/products/${product_id}/offer_codes/${offer_code_id}`;

    return new Promise((resolve, reject) => {
      this.request(url)
        .then((data) => resolve(data.offer_code))
        .catch((error) => reject(error));
    });
  }

  // Create a new offer code for a product. Default offer code is in cents. A universal offer code is one that applies to all products.
  createOfferCode({ product_id }, data) {
    const url = `/products/${product_id}/offer_codes`;

    return new Promise((resolve, reject) => {
      this.request(url, { method: "post", data })
        .then((data) => resolve(data.offer_code))
        .catch((error) => reject(error));
    });
  }

  // Edit an existing product's offer code.
  updateOfferCode({ product_id, offer_code_id }, data) {
    const url = `/products/${product_id}/offer_codes/${offer_code_id}`;

    return new Promise((resolve, reject) => {
      this.request(url, { method: "put", data })
        .then((data) => resolve(data.offer_code))
        .catch((error) => reject(error));
    });
  }

  // Permanently delete a product's offer code.
  deleteOfferCode({ product_id, offer_code_id }) {
    const url = `/products/${product_id}/offer_codes/${offer_code_id}`;

    return new Promise((resolve, reject) => {
      this.request(url, { method: "delete" })
        .then((data) => resolve({ message: data.message }))
        .catch((error) => reject(error));
    });
  }

  // Retrieve all of the existing custom fields for a product.
  getCustomFields({ product_id }) {
    const url = `/products/${product_id}/custom_fields`;

    return new Promise((resolve, reject) => {
      this.request(url)
        .then((data) => resolve(data.custom_fields))
        .catch((error) => reject(error));
    });
  }

  // Create a new custom field for a product.
  createCustomField({ product_id }, data) {
    const url = `/products/${product_id}/custom_fields`;

    return new Promise((resolve, reject) => {
      this.request(url, { method: "post", data })
        .then((data) => resolve(data.custom_field))
        .catch((error) => reject(error));
    });
  }

  // Edit an existing product's custom field.
  updateCustomField({ product_id, custom_field_name }, data) {
    const url = `/products/${product_id}/custom_fields/${encodeURIComponent(
      custom_field_name
    )}`;

    return new Promise((resolve, reject) => {
      this.request(url, { method: "put", data })
        .then((data) => resolve(data.custom_field))
        .catch((error) => reject(error));
    });
  }

  // Permanently delete a product's custom field.
  deleteCustomField({ product_id, custom_field_name }) {
    const url = `/products/${product_id}/custom_fields/${encodeURIComponent(
      custom_field_name
    )}`;

    return new Promise((resolve, reject) => {
      this.request(url, { method: "delete" })
        .then((data) => resolve({ message: data.message }))
        .catch((error) => reject(error));
    });
  }

  // Retrieve the user's data.
  getUser() {
    const url = `/user`;

    return new Promise((resolve, reject) => {
      this.request(url)
        .then((data) => resolve(data.user))
        .catch((error) => reject(error));
    });
  }

  // Retrieves all of the successful sales by the authenticated user. Available with the 'view_sales' scope.
  getSales(params) {
    const url = `/sales`;

    return new Promise((resolve, reject) => {
      this.request(url, { params })
        .then((data) => resolve(data.sales))
        .catch((error) => reject(error));
    });
  }

  // Retrieves the details of a sale by this user. Available with the 'view_sales' scope.
  getUserSales({ sale_id }) {
    const url = `/sales/${sale_id}`;

    return new Promise((resolve, reject) => {
      this.request(url)
        .then((data) => resolve(data.sale))
        .catch((error) => reject(error));
    });
  }

  // Marks a sale as shipped. Available with the 'mark_sales_as_shipped' scope.
  markSaleAsShipped({ sale_id }, params) {
    const url = `/sales/${sale_id}/mark_as_shipped`;

    return new Promise((resolve, reject) => {
      this.request(url, { method: "put", params })
        .then((data) => resolve(data.sale))
        .catch((error) => reject(error));
    });
  }

  // Refunds a sale. Available with the 'refund_sales' scope.
  refundSale({ sale_id }, params) {
    const url = `/sales/${sale_id}/refund`;

    return new Promise((resolve, reject) => {
      this.request(url, { method: "put", params })
        .then((data) => resolve(data.sale))
        .catch((error) => reject(error));
    });
  }

  // Retrieves all of the active subscribers for one of the authenticated user's products. Available with the 'view_sales' scope.
  getProductSubscibers({ product_id }, params) {
    const url = `/products/${product_id}/subscribers`;

    return new Promise((resolve, reject) => {
      this.request(url, { params })
        .then((data) => resolve(data.subscribers))
        .catch((error) => reject(error));
    });
  }

  // Retrieves the details of a subscriber to this user's product. Available with the 'view_sales' scope.
  getProductSubsciber({ subscriber_id }) {
    const url = `/subscribers/${subscriber_id}`;

    return new Promise((resolve, reject) => {
      this.request(url)
        .then((data) => resolve(data.subscribers))
        .catch((error) => reject(error));
    });
  }

  // Verify a license.
  verifyLicense(params) {
    const url = "/licenses/verify";

    return new Promise((resolve, reject) => {
      this.request(url, { method: "post", params })
        .then((data) => resolve({ purchase: data.purchase, uses: data.uses }))
        .catch((error) => reject(error));
    });
  }

  // Enable a license.
  enableLicense(params) {
    const url = "/licenses/enable";

    return new Promise((resolve, reject) => {
      this.request(url, { method: "put", params })
        .then((data) => resolve({ purchase: data.purchase, uses: data.uses }))
        .catch((error) => reject(error));
    });
  }

  // Disable a license.
  disableLicense(params) {
    const url = "/licenses/disable";

    return new Promise((resolve, reject) => {
      this.request(url, { method: "put", params })
        .then((data) => resolve({ purchase: data.purchase, uses: data.uses }))
        .catch((error) => reject(error));
    });
  }
}

module.exports = Gumnode;
