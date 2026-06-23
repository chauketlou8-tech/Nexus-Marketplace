import axiosInstance from "../../utils/AxiosInstance.ts"

const getOrders = async () => {
    try{
        const token = localStorage.getItem("token");

        const { data } = await axiosInstance.get("/api/orders", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return data.orders;
    }
    catch(err){
        console.log(err);
        return null
    }
}

export default getOrders;