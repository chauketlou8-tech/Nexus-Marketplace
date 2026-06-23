import axiosInstance from "../../utils/AxiosInstance.ts"

const getListing = async (id?: string) => {
    const token = localStorage.getItem("token");

    const { data } = await axiosInstance.get(`/api/listings/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });

    return data.listing;
}

export default getListing;