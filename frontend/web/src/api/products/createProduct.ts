import axiosInstance from "../../utils/AxiosInstance.ts"
import type { Product } from "../../components/shared/interface.ts";

const createProduct = async ({ product } : { product: Product }) => {

    const token = localStorage.getItem('token');

    const { data } = await axiosInstance.post('/api/products', product, {
        headers: { authorization: `Bearer ${token}` }
    });

    return data.product;
}

export default createProduct;