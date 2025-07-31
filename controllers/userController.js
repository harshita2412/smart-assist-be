 // controllers/userController.js
const registerUser = (req, res) => {
    res.send("Register user endpoint");
};

const loginUser = (req, res) => {
    res.send("Login user endpoint");
};

module.exports = { registerUser, loginUser };