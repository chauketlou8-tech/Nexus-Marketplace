import axiosInstance from "../../utils/AxiosInstance.ts"

const createMessage = async (message: string, chatId: string) => {
    const token = localStorage.getItem('token');

    const { data } = await axiosInstance.post("/api/messages", {message, chatId}, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return data.message;
}

export default createMessage;