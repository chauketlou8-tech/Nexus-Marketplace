import axiosInstance from "../../utils/AxiosInstance.ts"

const getChat = async (participants: number[]) => {
    const token = localStorage.getItem('token');

    try{
        const { data } = await axiosInstance.get(`/api/chats/chat?participants=${participants}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        return data.chat;
    }
    catch(error){
        return null;
    }
}

export default getChat;