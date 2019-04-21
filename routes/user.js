const express = require("express");
const router = express.Router();


const controllers = require("../controllers/usersControllers");

router.post("/register", controllers.registerController);

router.post("/login", controllers.loginController);

router.get("/:id", controllers.searchCurrentUserController);

router.post("/addParcell", controllers.addParcellController);

router.get("/parcell/:id", controllers.searchParcellsFromUserController);

router.delete("/deleteParcell", controllers.deleteParcellController);

module.exports = router;