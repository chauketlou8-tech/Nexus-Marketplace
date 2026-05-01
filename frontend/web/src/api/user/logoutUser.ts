import axios from 'axios';

const logout = async () => {
    const user = await axios.post("/api/users/logout", {});

    return user;
}

export default logout;