import axiosInstance from "../../utils/AxiosInstance.ts"

const deleteMessage = async (id: string | undefined, chatId: string) => {
    const token = localStorage.getItem("token");

    const { data } = await axiosInstance.delete(`/api/messages/${id}?chatId=${chatId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return data.deletedMessage;
}

export default deleteMessage;