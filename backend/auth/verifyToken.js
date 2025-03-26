import jwt from 'jsonwebtoken'
import Doctor from '../models/DoctorSchema'
import User from '../models/UserSchema'


export const authenticate = async(req, res, next)=>{
    //get token from headers
    const authToken = req.headers.authorization 


    //check token is exists or not
    if(!authToken || !authToken.startsWith('Bearer')){
        return res.status(401).json({success: false, message:'No token, authorization denied'})
    }
}