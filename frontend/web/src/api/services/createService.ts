import axiosInstance from "../../utils/AxiosInstance.ts"
import type { Service } from "../../components/shared/interface.ts";

const createService = async ({ service } : { service: Service }) => {
    const token = localStorage.getItem('token');

    const { data } = await axiosInstance.post("/api/services", service, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return data.services;
}

export default createService;