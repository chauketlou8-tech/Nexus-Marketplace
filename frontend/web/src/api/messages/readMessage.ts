import axiosInstance from "../../utils/AxiosInstance.ts"

export const readMessage = async (chatId: string, message: string ) => {
    const token = localStorage.getItem("token");

    const { data } = await axiosInstance.patch("/api/messages", { chatId, message }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return data.message;
}