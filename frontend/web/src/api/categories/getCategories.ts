import axios from 'axios';

const getCategories = async () => {
    const { data } = await axios.get(`/api/category`);
    return data.categories;
}

export default getCategories;