const { Router } = require('express');
const router = new Router();
const controller = require('./controller');

router.post("/user", controller.auth);
router.delete("/user", controller.delAcc);
router.put("/set-name", controller.setName);
router.put("/set-level", controller.setLevel);
router.post("/get-level", controller.getLevel);
router.post("/complete-level", controller.completeLevel)






module.exports = router