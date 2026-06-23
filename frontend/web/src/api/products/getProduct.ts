import axiosInstance from "../../utils/AxiosInstance.ts"

const getProduct = async (id: string) => {
    const token = localStorage.getItem('token');

    const { data } = await axiosInstance.get(`/api/products/${id}`, {
        headers: { authorization: `Bearer ${token}` }
    });

    return data.product;
}

export default getProduct;