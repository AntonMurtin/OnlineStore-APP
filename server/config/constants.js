const CONSTANTS = {
    port: process.env.PORT || 3030,
    conectionStr:'mongodb+srv://antonmurtin:GgEpb74BfTM5XVG8@cluster0.hcsbvva.mongodb.net/?retryWrites=true&w=majority',
    dataBase: 'Rain-Systems',
    Secret: '14cc22b50ac8e123523d94693e6d1a4d61ca685baac2a0f7a3cd13a7ddb6f75b',
    error: {
        userExists: 'User already exists!',
        invalideUser: 'Invalid Username or Password!',
        missmatch:'Password missmatch!',
        buy:'You already add the product to Shopping Bag',
        favorite:'You already add the product to Favorite',
        
    }

}

module.exports = CONSTANTS;