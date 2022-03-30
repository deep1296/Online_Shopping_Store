const express = require("express");

const { body, validationResult } = require("express-validator");
const connect  = require("./configs/db");

const cors = require("cors");

const { register, login } = require("./controller/auth.controller");
const usercontroller = require("./controller/user.controller");

const app = express();
app.use(express.json());

app.use(cors());


app.post("/register",
    
    body("first_name")    
    .isString()      
    .isLength({ min: 3, max: 20 })   
    .withMessage("First name should be 3 to 20 characters long"),
    
    body("last_name").isString().isLength({ min: 3, max: 20 })
    .withMessage("Last name should be 3 to 20 characters long"),
         body("email")
        .isEmail()
        .withMessage("Please enter a valid E-Mail address"),
         
        body("password")
        .isLength({ min: 8, max: 20 })
        .custom((value) => {
          let pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
          if (pattern.test(value)) {
            return true;
          }
          throw new Error("Your password must contain at least 8 characters, one uppercase letter, one number, and one special character.");
        }),

    
    register);


app.post("/login", login);

app.use("/users", usercontroller);

app.listen(4005, async () => {
    try {
        await connect();
        console.log("listening on port 4005");
    }
    catch (e) {
        console.log({ message: e.message }) 
    }
});
    
