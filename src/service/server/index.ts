import axios from "axios";
import api from "../../api";

interface ResultProps {
  [key: string]: any;
}

interface ApiProps {
  dataSend?: any;
  config?: any;
}

const formDataConfig = {
  headers: {
    "content-type": "multipart/form-data",
  },
};

const getProductsApi = () => {
  return new Promise<ResultProps>(async (resolve, reject) => {
    try {
      const {
        data: { data, isSuccess, error, message },
      } = await axios.get(`${api.product.getProducts}`);
      resolve({ isSuccess, data, error, message });
    } catch (error) {
      reject({
        isSuccess: false,
        data: [],
        error,
        message: "Tidak dapat terhubung ke serveer",
      });
    }
  });
};

const searchProductsApi = ({ dataSend, config }: ApiProps) => {
  return new Promise<ResultProps>(async (resolve, reject) => {
    try {
      const {
        data: { data, isSuccess, error, message },
      } = await axios.post(`${api.product.searchProduct}`, dataSend, config);
      resolve({ isSuccess, data, error, message });
    } catch (error) {
      reject({
        isSuccess: false,
        data: [],
        error,
        message: "Tidak dapat terhubung ke serveer",
      });
    }
  });
};

const createProductApi = ({ dataSend }: ApiProps) => {
  return new Promise<ResultProps>(async (resolve, reject) => {
    try {
      const {
        data: { data, isSuccess, error, message },
      } = await axios.post(
        `${api.product.postProduct}`,
        dataSend,
        formDataConfig
      );
      resolve({ isSuccess, data, error, message });
    } catch (error) {
      reject({
        isSuccess: false,
        data: [],
        error,
        message: "Tidak dapat terhubung ke serveer",
      });
    }
  });
};

const deleteProductApi = ({ dataSend }: ApiProps) => {
  return new Promise<ResultProps>(async (resolve, reject) => {
    try {
      const {
        data: { data, isSuccess, error, message },
      } = await axios.post(`${api.product.deleteProduct}`, dataSend);
      resolve({ isSuccess, data, error, message });
    } catch (error) {
      reject({
        isSuccess: false,
        data: [],
        error,
        message: "Tidak dapat terhubung ke serveer",
      });
    }
  });
};

const updateProductApi = ({ dataSend }: ApiProps) => {
  return new Promise<ResultProps>(async (resolve, reject) => {
    try {
      const {
        data: { data, isSuccess, error, message },
      } = await axios.post(
        `${api.product.updateProduct}`,
        dataSend,
        formDataConfig
      );
      resolve({ isSuccess, data, error, message });
    } catch (error) {
      reject({
        isSuccess: false,
        data: [],
        error,
        message: "Tidak dapat terhubung ke serveer",
      });
    }
  });
};

export {
  getProductsApi,
  searchProductsApi,
  createProductApi,
  deleteProductApi,
  updateProductApi,
};
