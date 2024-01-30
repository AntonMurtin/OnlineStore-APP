const jwt = require('../lib/jwt');
const { Secret } = require('../config/constants');

exports.generateToken = async (user) => {

    const payload = {
        _id: user._id,
        username: `${user.name} ${user.lastname}`,
        email: user.email,
    };
    const token = await jwt.sing(payload, Secret, { expiresIn: '2d' });
    
    return token;
}