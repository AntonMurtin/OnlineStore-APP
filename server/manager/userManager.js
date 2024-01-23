const User = require('../models/User');
const bcrypt = require('bcrypt')
const { generateToken } = require('../utils/generateToken')




exports.register = async (userData) => {
    const oldUser = await User.findOne({ email: userData.email });

    if (oldUser) {
        throw new Error('User already exists!');
    };
    const user = await User.create(userData);

    const token = await generateToken(user);

    const result = {
        username:user.username,
        _id: user._id,
        email: user.email,
        accessToken: token,
    }

    return result;
};

exports.login = async (userData) => {
    
    const user = await User.findOne({ email: userData.email });

    if (!user) {
        throw new Error('Invalid Username or Password!');
    };
    const isValide = await bcrypt.compare(userData.password, user.password);
    if (!isValide) {
        throw new Error('Invalid Username or Password!');
    };
    const token = await generateToken(user);
    const result = {
        username:user.username,
        _id: user._id,
        email: user.email,
        accessToken: token,
    }
    return result;
}