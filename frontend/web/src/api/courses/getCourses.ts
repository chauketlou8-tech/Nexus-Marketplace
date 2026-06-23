import axiosInstance from "../../utils/AxiosInstance.ts"

const getCourses = async () => {
    const token = localStorage.getItem("token");

    const { data } = await axiosInstance.get("/api/courses", {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });

    return data.courses;
}

export default getCourses;