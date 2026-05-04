import axios from 'axios';

const getServices = async () => {
    const token = localStorage.getItem('token');

    const { data } = await axios.get("/api/services", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return data.services;
}

export default getServices;