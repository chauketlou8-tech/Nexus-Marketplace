import axiosInstance from "../../utils/AxiosInstance.ts";

const getNotifications = async (id: number) => {
    try {
        const token = localStorage.getItem("token");

        const { data } = await axiosInstance.get(`/api/notifications?user_id=${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return data.notifications;
    }
    catch(e) {
        console.error(e);
    }
}

export default getNotifications;