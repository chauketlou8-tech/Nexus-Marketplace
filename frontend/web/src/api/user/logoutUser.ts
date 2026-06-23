import axiosInstance from "../../utils/AxiosInstance.ts"

const logout = async (id:number) => {
    const { data } = await axiosInstance.post(`/api/users/logout/${id}`);

    return data.user;
}

export default logout;