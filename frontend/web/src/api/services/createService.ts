import axios from "axios";
import type { Service } from "../../components/shared/Types/interface.ts";

const createService = async ({ service } : { service: Service }) => {
    const token = localStorage.getItem('token');

    const { data } = await axios.post("/api/services", service, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return data.services;
}

export default createService;