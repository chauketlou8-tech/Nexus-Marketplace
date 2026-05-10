import axios from "axios";

export const readMessage = async (chatId: string, message: string ) => {
    const token = localStorage.getItem("token");

    const { data } = await axios.patch("/api/messages", { chatId, message }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    console.log(data);

    return data;
}