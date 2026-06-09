import bcrypt from "bcryptjs";
import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true });

// mongoose hook to hash password before saving in the database
userSchema.pre("save", async function () {
    // isModified -- mongoose built in method
    // password not changed, do nothing
    if (!this.isModified("password")) return;
    // bcrypt.hash() takes 2 parameters-- password, number of salt rounds
    // if password is changed, hash it
    this.password = await bcrypt.hash(this.password, 10);
});

// returs true or false
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;