import axios from "axios";

const getCategory = async (categoryId: string) => {
    const { data } = await axios.get(`/api/category/${categoryId}`);
    return data.slug;
}

export default getCategory;