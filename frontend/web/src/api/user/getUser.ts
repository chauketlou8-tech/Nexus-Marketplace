import axios from 'axios';

const getUser = async (id: number) => {

    const token = localStorage.getItem('token');

    const {data} = await axios.get(`/api/users/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
    console.log(data);
    return data.user;
}

export default getUser;