import axios from "axios";

export const login = async (email: string, password: string) => {
    const { data } = await axios.post("/api/auth/login", { email, password });
    const { user, token, refreshToken } = data;

    localStorage.setItem("token", token);
    localStorage.setItem("refreshToken", refreshToken);

    return user;
}

export default login;