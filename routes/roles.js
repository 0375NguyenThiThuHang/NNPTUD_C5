var express = require('express');
var router = express.Router();
let roleController = require('../controllers/roles')
var {CreateSuccessRes,CreateErrorRes} = require('../utils/ResHandler')

// GET roles (không yêu cầu quyền)
router.get('/', async function(req, res, next) {
  try {
    let roles = await roleController.GetAllRole();
    CreateSuccessRes(res, 200, roles);
  } catch (error) {
    next(error);
  }
});
router.get('/:id', async function(req, res, next) {
  try {
    let user = await roleController.GetRoleById(req.params.id)
    CreateSuccessRes(res,200,user);
  } catch (error) {
    next(error);
  }
});
// POST (create), PUT (update), DELETE (admin)
router.post('/', check_authentication, check_authorization(constants.ADMIN_PERMISSION), async function(req, res, next) {
  try {
    let newRole = await roleController.CreateRole(req.body.name);
    CreateSuccessRes(res, 200, newRole);
  } catch (error) {
    next(error);
  }
});


module.exports = router;