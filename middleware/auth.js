const jwt = require('jsonwebtoken')
const User = require('../models/User')

const auth = async(req,res,next) => {
    const token = req.header('Authorization').replace('Bearer ','')
    if(token){
        jwt.verify(token, process.env.JWT_KEY, async (err, data) => {
            if (err) {
                return res.send({error: "Token not verified"});
            }else{
                try{
                    const user = await User.findOne({_id: data._id, 'tokens.token': token})
                    if(!user){
                        throw new Error();
                    }
                    req.user = user
                    req.token = token
                    next()
                }catch(error){
                    res.status(401).send({error: error})
                }
            }
        });
    }
   
   
}


module.exports = auth;