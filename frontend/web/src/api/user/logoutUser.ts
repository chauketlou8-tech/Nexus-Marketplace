import axios from 'axios';

const logout = async (id:number) => {
    const { data } = await axios.post(`/api/users/logout/${id}`);

    return data.user;
}

export default logout;