import axiosInstance from "../../utils/AxiosInstance.ts"

const getCategory = async (categoryId: string) => {
    const { data } = await axiosInstance.get(`/api/category/${categoryId}`);
    return data.slug;
}

export default getCategory;