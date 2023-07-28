const jwt = require("jsonwebtoken")

const createToken = (user_id, username) => {
    console.log('createToken  ' + username)
    return jwt.sign(
        {
            user_id: user_id,
            username: username
            
        },
        process.env.JWT_SECRET_KEY,
        { expiresIn: '1d' }
    )
}

const verifyToken = (token)=> {
    console.log('verify token  ')
    console.log('verify token  '+ token )
    try{
        return jwt.verify(token, process.env.JWT_SECRET_KEY);
    } catch (error) {
        throw new Error("Invalid token")
    }
}


module.exports = {createToken, verifyToken}