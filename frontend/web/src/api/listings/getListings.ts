import axios from "axios";

const getListings = async () => {
    const token = localStorage.getItem("token");

    const { data } = await axios.get("/api/listings", {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });

    return data.listings;
}

export default getListings;