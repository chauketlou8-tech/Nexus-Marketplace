import axios from "axios";

const getMessage = async (message: string, chatId: string) => {
    const token = localStorage.getItem("token");

    const { data } = await axios.get(`api/messages?message=${message}&chatId=${chatId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });

    return data.msg;
}

export default getMessage;