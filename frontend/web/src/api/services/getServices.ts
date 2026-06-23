import axiosInstance from "../../utils/AxiosInstance.ts"

const getServices = async () => {
    const token = localStorage.getItem('token');

    const { data } = await axiosInstance.get("/api/services", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return data.services;
}

export default getServices;