require("dotenv").config();

const { body, validationResult } = require("express-validator");
 const jwt = require("jsonwebtoken") 
const User = require("../models/user.model");

const newToken = (user) => {

    // console.log(process.env);
    return jwt.sign({user }, process.env.JWT_SECRET_KEY);

}

const register = async (req, res) => {
    try {

        const errors = validationResult(req);
        
        if (!errors.isEmpty()) {
          let newErrors;
          newErrors = errors.array().map((err) => {
              console.log("err", err);
              
            //   let status = "notok"
            return ({ key: err.param, message: err.msg  });
          });
          return res.status(400).send({ errors: newErrors });
        }

        let user = await User.findOne({email:req.body.email}).lean().exec()
       
        if (user) {
            return res.status(500).send({message:"Email Already Exist"})
        } 

        user = await User.create(req.body);

        const token = newToken(user);

        let status = "ok";
       
        res.send({ user, token , status});
    }
    catch (e) {
        return res.status(500).send(e.message);
    }
}

const login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            return res.status(400).send({ message:"Invalid email or password"})
        }

        const match = user.checkpassword(req.body.password);

        if (!match) {
            return res.status(400).send({ message: "Invalid email or password" });
        }

        const token = newToken(user);

        let status = "ok";
       
        res.send({ user, token ,status});
        
    }
    catch (e) {
        return res.status.send(e.message);
    }
}

module.exports = { register, login };