import axios from 'axios';

const createMessage = async (message: string, chatId: string) => {
    const token = localStorage.getItem('token');

    const { data } = await axios.post("/api/messages", {message, chatId}, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return data.message;
}

export default createMessage;