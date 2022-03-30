
const mongoose = require("mongoose");

const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name:{ type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    dateofBirth: { type: String, required: false },
    gender:{type:String,required:false}
}
    , {
        versionKey: false,
        timestamps:true
});

userSchema.pre("save", function (next) {
    if (!this.isModified("password")) return next();

    const hash = bcrypt.hashSync(this.password, 8);
    this.password = hash;
    return next();
});

userSchema.methods.checkpassword = function (password) {
   return bcrypt.compareSync(password, this.password); 
}

module.exports = mongoose.model("users", userSchema);