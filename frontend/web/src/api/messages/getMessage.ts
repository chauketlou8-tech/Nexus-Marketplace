import axiosInstance from "../../utils/AxiosInstance.ts"

const getMessage = async (message: string, chatId: string) => {
    const token = localStorage.getItem("token");

    const { data } = await axiosInstance.get(`api/messages?message=${message}&chatId=${chatId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });

    return data.msg;
}

export default getMessage;