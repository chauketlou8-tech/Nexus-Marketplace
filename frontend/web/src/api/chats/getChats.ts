import axiosInstance from "../../utils/AxiosInstance.ts"

const getChats = async () => {
    const token = localStorage.getItem("token");
    const { data } = await axiosInstance.get("/api/chats", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return data.chats;
}

export default getChats;