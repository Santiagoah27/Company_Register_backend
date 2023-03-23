import User from "../models/User.js"
import generateId from "../helpers/generateId.js";
import generateJWT from "../helpers/generateJWT.js";
import asyncHandler from "express-async-handler";
import { registerEmail, recoverPasswordEmail } from "../helpers/email.js";

const createError = (status, message) => {
    const error = new Error(message);
    error.status = status;
    return error;
}

const register = asyncHandler(async (req, res) => {
    // Avoid duplicate records
    const { email } = req.body;
    const userExists = await User.findOne({ email: email});

    if(userExists) {
        return res.status(400).send('Usuario ya registrado')
    }
    const user = new User(req.body)
    user.token = generateId();
    await user.save()
    //Send confirmation email
    registerEmail({
        email: user.email,
        name: user.name,
        token: user.token
    })
    res.json({ msg: "Usuario Creado Correctamente, Revisa tu email pata confirmar tu cuenta"})
})

const authenticate = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    //Validate if the user exists
    const user = await User.findOne({email})
    if(!user) {
        return res.status(404).send("El usuario no existe");
    }

    //Validate if the user is confirmed
    if(!user.confirmed) {
        return res.status(403).send("Tu cuenta no ha sido confirmada");
    }

    //Validate User password
    if(await user.validatePassword(password)){
        res.send({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateJWT(user._id)
        })
    } else {
        return res.status(403).send("El password es incorrecto");
    }
})

const confirm = asyncHandler( async (req, res) => {
    const { token } = req.params;
    const userConfirm = await User.findOne({token});
    if(!userConfirm) {
        return res.status(403).json({ msg: createError(403, "Token no valido").message });
    }

    userConfirm.confirmed = true;
    userConfirm.token = '';
    await userConfirm.save();
    res.json({msg: "Usuario Confirmado correctamente"})
})

const forgotPassword = asyncHandler( async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({email})
    if(!user) {
        return res.status(404).send("El usuario no existe");
    }

    user.token = generateId()
    await user.save();

    //Send email
    recoverPasswordEmail({
        email: user.email,
        name: user.name,
        token: user.token
    })

    res.json({msg: 'Hemos enviado un email con las instrucciones'})
})

const validateToken = asyncHandler( async (req, res) => {
    const { token } = req.params;

    const tokenValid = await User.findOne({ token });

    if(tokenValid){
        res.json({ msg: "Token válido y el Usuario existe"})
    } else {
        return res.status(403).json({ msg: createError(403, "Token no valido").message });
    }
})

const newPassword = asyncHandler( async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;
    const user = await User.findOne({ token });

    if(user){
        user.password = password;
        user.token = "";

        await user.save();
        res.json({ msg: "Password modificado correctamente"})

    } else {
        return res.status(403).json({ msg: createError(403, "Token no valido").message });
    }
})

const profile = asyncHandler( async (req, res) => {
    const { user } = req
    res.json(user)
})

export {
    register,
    authenticate,
    confirm,
    forgotPassword,
    validateToken,
    newPassword,
    profile
}