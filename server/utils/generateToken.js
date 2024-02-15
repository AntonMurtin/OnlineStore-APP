const jwt = require('../lib/jwt');


exports.generateToken = async (user) => {

    const payload = {
        _id: user._id,
        username: `${user.name} ${user.lastname}`,
        email: user.email,
    };
    const token = await jwt.sing(payload, process.env.SECRET, { expiresIn: '2d' });
    
    return token;
}