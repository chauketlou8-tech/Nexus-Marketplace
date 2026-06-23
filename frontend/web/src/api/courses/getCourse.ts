import axiosInstance from "../../utils/AxiosInstance.ts"

const getCourse = async (id: number) => {
    const token = localStorage.getItem('token');

    const { data } = await axiosInstance.get(`/api/courses/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });

    return data.course;
}

export default getCourse;