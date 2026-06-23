import axiosInstance from "../../utils/AxiosInstance.ts"

const getOrder = async (orderId: string) => {
    try{
        const token = localStorage.getItem('token');

        const { data } = await axiosInstance.get(`/api/orders/${orderId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        return data.order;
    }
    catch(err){
        console.log(err);
        return null;
    }
}

export default getOrder;