import axiosInstance from "../../utils/AxiosInstance.ts"

const getProducts = async () => {
    const token = localStorage.getItem("token");

    const { data } = await axiosInstance.get("/api/products", {
        headers: { Authorization: `Bearer ${token}` }
    });

    return data.products;
}

export default getProducts;