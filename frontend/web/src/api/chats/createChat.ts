import axios from "axios";

const createChat = async (participants: number[]) => {
    const token = localStorage.getItem("token");
    try{
        const { data } = await axios.post("/api/chats", { participants }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return data.chat;
    }
    catch(error){
        console.log(error);
        return null;
    }
}

export default createChat;