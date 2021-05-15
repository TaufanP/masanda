import axios from "axios";
import api from "../../api";

interface ResultProps {
  [key: string]: any;
}

interface ApiProps {
  dataSend?: any;
  config?: any;
}

interface SearchProps {
  keyword: string;
  field: string;
  order: number;
}

interface BarcodeProps {
  barcode: string | undefined;
}

const formDataConfig = {
  headers: {
    "content-type": "multipart/form-data",
  },
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
        message: "Tidak dapat terhubung ke server",
      });
    }
  });
};

const deleteProductApi = ({ barcode }: BarcodeProps) => {
  return new Promise<ResultProps>(async (resolve, reject) => {
    try {
      const {
        data: { data, isSuccess, error, message },
      } = await axios.delete(`${api.product.base}/${barcode}`);
      resolve({ isSuccess, data, error, message });
    } catch (error) {
      reject({
        isSuccess: false,
        data: [],
        error,
        message: "Tidak dapat terhubung ke server",
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

const getProductsApi = () => {
  return new Promise<ResultProps>(async (resolve, reject) => {
    try {
      const {
        data: { data, isSuccess, error, message },
      } = await axios.get(`${api.product.base}`);
      resolve({ isSuccess, data, error, message });
    } catch (error) {
      reject({
        isSuccess: false,
        data: [],
        error,
        message: "Tidak dapat terhubung ke server",
      });
    }
  });
};

const searchProductsApi = ({ keyword, field, order }: SearchProps) => {
  return new Promise<ResultProps>(async (resolve, reject) => {
    try {
      const {
        data: { data, isSuccess, error, message },
      } = await axios.get(
        `${api.product.base}?keyword=${keyword}&field=${field}&order=${order}`
      );
      resolve({ isSuccess, data, error, message });
    } catch (error) {
      reject({
        isSuccess: false,
        data: [],
        error,
        message: "Tidak dapat terhubung ke server",
      });
    }
  });
};

export {
  createProductApi,
  deleteProductApi,
  updateProductApi,
  getProductsApi,
  searchProductsApi,
};
