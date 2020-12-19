const router = require ('express').Router();
const UserController=require('../../controllers/UserController.js');
const auth=require('../../middlewares/auth')


//router.get('/list', auth.verifyUsuario,UserController.list);
//router.post('/register',auth.verifyUsuario, UserController.register);
//router.put('/update', auth.verifyUsuario,UserController.update);

router.post('/login', UserController.login);


module.exports=router;
