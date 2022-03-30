
require("dotenv").config();
const jwt = require("jsonwebtoken");

const verifytoken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
      if (err) return reject(err);

      resolve(user);
    });
  });
};

module.exports = async (req, res, next) => {
   
    
    if (!req.headers.authorization) {
        return res.status(400).send({ message: "authorization token is not valid" });

    }

    if (!req.headers.authorization.startsWith("Bearer ")) {
        return res.status(400).send({ message: "authorization token is not valid" });
        
    }

    const token = req.headers.authorization.split(" ")[1];

    let user;
    try {
         user = await verifytoken(token);
    }
    catch (e) {
        return res.status(400).send({ message: "authorization token is not valid" });
       
}
   
    req.user = user.user;
    console.log("user",req.user);

    return next();

}