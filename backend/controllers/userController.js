import { hashedPassword, matchPassword } from "../helper/passwordHelper.js";
import { loginSchema, registerSchema } from "../validations/userValidations.js";
import userModel from "../models/userModel.js"

export const register = async (req, res) => {
    try {
        const {data, error} = registerSchema.safeParse(req.body)
        if(error){
            return res.status(400).send({success:false,message:'Validation error!',validateErrors:error.format()})
        }

        const {name, email, password} = data;

        const userExist = await userModel.findOne({email:email})
        if(userExist){
            return res.status(400).send({success:false,message:'Email already taken.'})
        }

        const hash = await hashedPassword(password)
        const user = await userModel.create({name,email,password:hash})

        user.password=undefined
        return res.status(201).send({success:true,message:'User register successfully.',user:user})

    } catch (error) {
        console.log('Register controller error : ' + error);
        return res.status(400).send({success:false,message:`Error : ${error}`})
    }
}
export const login = async (req, res) => {
    try {
        const {data,error} = loginSchema.safeParse(req.body);
        if(error){
            return res.status(400).send({success:false,message:'Validation error!',validateErrors:error.format()})
        }
        const {email, password} = data;
        const user = await userModel.findOne({email});
        if(!user){
            return res.status(404).send({success:false,message:'Not Found.'})
        }

        const isMatched = matchPassword(password, user.password)
        if(!isMatched){
            return res.status(401).send({success:false,message:'Invalid Credentials.'})
        }

        const token = await jwt.sign({id:user._id},process.env.JWT_SECRET_KEY, {expiresIn:'1d'})

        user.password = undefined;
        return res.status(200).send({success:true,message:'Login Successfully!',user,token})

    } catch (error) {
        console.log('Login controller error : ' + error);
        return res.status(400).send({success:false,message:`Error : ${error}`})
    }
}
export const logout = (req, res) => {
    return res.status(200).send({success:true,message:'User logout successfully.'})
}