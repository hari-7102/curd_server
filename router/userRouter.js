
const express = require('express');
const router = express.Router();
const { createUser, getuserbyid , getAllUsers , updateUser ,deleteuser} = require('../contoller/userContoller');



router.post('/', createUser);
router.get('/:id', getuserbyid);   
router.get('/', getAllUsers);   
router.put('/:id', updateUser);
router.delete('/:id', deleteuser)





module.exports = router;