import axiosInstance from "../../utils/AxiosInstance.ts"

const getUser = async (id: number) => {

    const token = localStorage.getItem('token');

    const {data} = await axiosInstance.get(`/api/users/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
    return data.user;
}

export default getUser;