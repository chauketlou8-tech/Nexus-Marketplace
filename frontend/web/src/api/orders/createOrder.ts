import axios from "axios";

const createOrder = async (seller_id: number, item_id: string, item_type: string, amount: number) => {
    try{
        const token = localStorage.getItem("token");

        const { data } = await axios.post("/api/orders", { seller_id, item_id, item_type, amount }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return data.order;
    }
    catch(err){
        console.log(err);
        return null;
    }
}

export default createOrder;