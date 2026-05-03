import axios from 'axios';
import type { Product } from "../../components/shared/Types/interface.ts";

const createProduct = async ({ product } : { product: Product }) => {

    const token = localStorage.getItem('token');

    const { data } = await axios.post('/api/products', product, {
        headers: { authorization: `Bearer ${token}` }
    });

    console.log(data);

    return data.product;
}

export default createProduct;