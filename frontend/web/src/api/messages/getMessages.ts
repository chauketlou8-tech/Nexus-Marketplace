import axiosInstance from "../../utils/AxiosInstance.ts"

const getMessages = async (chatId: string | undefined) => {
    const token = localStorage.getItem("token");

    const { data } = await axiosInstance.get(`/api/messages/msg?chatId=${chatId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return data.messages;
}

export default getMessages;