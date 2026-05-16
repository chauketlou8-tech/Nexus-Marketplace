const jwt = require("jsonwebtoken");

const authenticationMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).send("No token provided");
    }

    const token = authHeader.split(" ")[1];

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const { id, name, role } = decoded;

        req.user = { id, name, role };
        next()
    }
    catch(err){
        return res.status(403).send("Not authorized");
    }

}

module.exports = authenticationMiddleware;