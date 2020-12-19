
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const models=require('../models');
const tokenServices=require('../services/token.js')

exports.login=async(req,res,next)=>{
    try{
        const user= await models.Usuario.findOne({where: {email: req.body.email}});
        if(user){
            const passwordIsValid=bcrypt.compareSync(req.body.password, user.password);
            if(passwordIsValid){
                const token =await tokenServices.encode(user);
                res.status(200).send({
                    user,
                    tokenReturn: token,
                })
            }else{
                res.status(401).send({auth: false, tokenReturn: null, reason: "Invalid Password!"});
            }
        }else{
            res.status(404).send('User Not Found.');
        }
    }
    catch(error){
        res.status(500).send({
            message: 'error->'
        })
        next(error);
    }
}

exports.register=async(req,res,next)=>{
    try {
        const user=await models.Usuario.findOne({where: {email: req.body.email}});
        if(user){
            res.status(409).send({
                message: "Error, el correo ya se encuentra registrado en el sistema"
            })
        }else{
            req.body.password=bcrypt.hashSync(req.body.password, 10);
            const user=await models.Usuario.create(req.body);
            res.status(200).json(user);
        }
    } catch (error) {
        res.status(500).send({
            message: 'Error->'
        })
        next(error);
    }
}

exports.list=async(req,res,next)=>{
    try {
        const user=await models.Usuario.findAll();
        if(user){
            res.status(200).json(user);
        }
        else{
            res.status(404).send({
                message: "No es un usuario valido del sistema"
            })
        }
    } catch (error) {
        res.status(500).send({
            message: 'Error->'
        })
        next(error);
    }
}

exports.update=async(req,res,next)=>{
    try {
        const user=await models.Usuario.findOne({where: {email:req.body.email}});
        if(user){
            const user=await models.Usuario.update({name: req.body.name},
                {where:{email:req.body.email},});
            res.status(200).json(user);
        }else{
            res.status(404).send({
                message: "Usuario no encontrado"
            })
        }
    } catch (error) {
        res.status(500).send({
            message: 'Error->'
        })
        next(error);
    }
}



