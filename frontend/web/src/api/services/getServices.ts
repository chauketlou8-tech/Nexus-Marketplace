import axios from 'axios';

const getServices = async () => {
    try{
        const token = localStorage.getItem('token');

        const { data } = await axios.get("/api/services", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return data.services;
    }
    catch (error) {
        console.log(error);
        return null;
    }
}

export default getServices;