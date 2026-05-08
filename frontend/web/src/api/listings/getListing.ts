import axios from "axios";

const getListing = async (id?: string) => {
    const token = localStorage.getItem("token");

    const { data } = await axios.get(`/api/listings/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });

    return data.listing;
}

export default getListing;