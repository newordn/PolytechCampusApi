const jwt = require('jsonwebtoken')
const APP_SECRET = "POLYTECTCAMPUSAPPSECRET"
const ROLES = {
    USER: "ROLE_USER",
    ADMIN:"ROLE_ADMIN"
}

function getUserId(context){
    const Authorization = context.request.get('Authorization')
    if(Authorization){
        const token = Authorization.replace('Bearer ','')
        const {userId} = jwt.verify(token,APP_SECRET)
        return userId
    }
    throw new Error('Veuillez vous authentifiez')
}
module.exports={
    getUserId,
    APP_SECRET,
    ROLES
}