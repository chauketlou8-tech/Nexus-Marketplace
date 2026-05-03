import axios from 'axios';

const getCourse = async (id: number) => {
    const token = localStorage.getItem('token');

    const { data } = await axios.get(`/api/courses/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });

    return data.course;
}

export default getCourse;