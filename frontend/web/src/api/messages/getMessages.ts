import axios from "axios"

const getMessages = async (chatId: string | undefined) => {
    const token = localStorage.getItem("token");

    const { data } = await axios.get(`/api/messages/msg?chatId=${chatId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return data.messages;
}

export default getMessages;