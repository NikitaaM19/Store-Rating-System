const express = require("express");
const router = express.Router();

const adminController = require("../controllers/adminController");
router.get("/dashboard", adminController.dashboard);


// USERS
router.get("/users", adminController.getUsers);
router.post("/users", adminController.addUser);
router.put("/users/:id", adminController.updateUser);
router.delete("/users/:id", adminController.deleteUser);

// STORES
router.get("/store-owners", adminController.getStoreOwners);
router.get("/stores", adminController.getStores);
router.post("/stores", adminController.addStore);
router.put("/stores/:id", adminController.updateStore);
router.delete("/stores/:id", adminController.deleteStore);



module.exports = router;