import axios from "axios";

const getCourses = async () => {
    const token = localStorage.getItem("token");

    const { data } = await axios.get("/api/courses", {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });

    return data.courses;
}

export default getCourses;