import axios from 'axios';

const getProduct = async (id: string) => {
    const token = localStorage.getItem('token');

    const { data } = await axios.get(`/api/products/${id}`, {
        headers: { authorization: `Bearer ${token}` }
    });

    return data.product;
}

export default getProduct;