import axiosInstance from "../../utils/AxiosInstance.ts"

const getCategories = async () => {
    const { data } = await axiosInstance.get(`/api/category`);
    return data.categories;
}

export default getCategories;