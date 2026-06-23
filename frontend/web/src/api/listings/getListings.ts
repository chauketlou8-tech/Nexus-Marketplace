import axiosInstance from "../../utils/AxiosInstance.ts"

const getListings = async () => {
    const token = localStorage.getItem("token");

    const { data } = await axiosInstance.get("/api/listings", {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });

    return data.listings;
}

export default getListings;