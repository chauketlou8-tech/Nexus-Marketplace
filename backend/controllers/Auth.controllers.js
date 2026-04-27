import User from "../Models/User"

//login
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send({
            error: 'Email or Password is required',
        });
    }

    const existsUser = await User.findOne({ email });

    if (!existsUser) {
        return res.status(404).send({
            error: 'User not found',
        });
    }

    return res.status(200).send({
        user: existsUser,
    });
}



module.exports = {
    loginUser,
}