const router = require("express").Router();
const { verifyToken } = require("../middleware/authMiddleware");
const userController = require("../controllers/userController");

router.use(verifyToken);

router.get("/stores", userController.getAllStores);
router.post("/rate", userController.rateStore);
router.put("/change-password", userController.changePassword);

module.exports = router;