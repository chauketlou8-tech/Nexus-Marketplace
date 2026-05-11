import axios from "axios";

const getOnlineUsers = async () => {
    const token = localStorage.getItem("token");

    const { data } = await axios.get("/api/users/online", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return data.onlineUsers;
}

export default getOnlineUsers;