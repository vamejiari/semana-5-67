const router = require ('express').Router();
const UserController=require('../../controllers/UserController.js');
const auth=require('../../middlewares/auth')


router.get('/list', auth.verifyUsuario,UserController.list);
router.post('/add',auth.verifyUsuario, UserController.add);
router.put('/update', auth.verifyUsuario,UserController.update);
router.put('/activate', auth.verifyUsuario, UserController.activate);
router.put('/deactivate', auth.verifyUsuario, UserController.deactivate );

router.post('/login', UserController.login);


module.exports=router;
