import axios from "axios";

const getChats = async () => {
    const token = localStorage.getItem("token");
    const { data } = await axios.get("/api/chats", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return data.chats;
}

export default getChats;