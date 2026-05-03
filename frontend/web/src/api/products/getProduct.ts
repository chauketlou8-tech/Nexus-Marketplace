import axios from 'axios';

const getProduct = async () => {
    const token = localStorage.getItem('token');

    const { data } = await axios.get(`/api/products/${token}`, {
        headers: { authorization: `Bearer ${token}` }
    });

    const product = data.product;
    //const category = product.category;

    console.log(product);

    return product;
}

export default getProduct;