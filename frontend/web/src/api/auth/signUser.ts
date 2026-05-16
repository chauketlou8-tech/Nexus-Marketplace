import axios from 'axios';

const signup = async (name : string, email : string, password : string, year : number) => {
    const { data } = await axios.post('/api/auth/register', { name, email, password, year });
    const { user, token, refreshToken } = data;

    localStorage.setItem('token', token);
    localStorage.setItem('refreshToken', refreshToken);

    return user;

}

export default signup;