import axios from "axios";

const getProducts = async () => {
    const token = localStorage.getItem("token");

    const { data } = await axios.get("/api/products", {
        headers: { Authorization: `Bearer ${token}` }
    });

    return data.products;
}

export default getProducts;