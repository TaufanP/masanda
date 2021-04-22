import url from "./baseUrl";

const product = {
  getProducts: `${url}/product`,
  postProduct: `${url}/product/add`,
  deleteProduct: `${url}/product/delete`,
  updateProduct: `${url}/product/update`,
};

export default product;
