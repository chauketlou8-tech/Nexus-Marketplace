import axiosInstance from "../../utils/AxiosInstance.ts"

const getOnlineUsers = async () => {
    const token = localStorage.getItem("token");

    const { data } = await axiosInstance.get("/api/users/online", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return data.onlineUsers;
}

export default getOnlineUsers;