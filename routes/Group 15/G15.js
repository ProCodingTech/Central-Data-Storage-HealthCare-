const express = require("express");
const router = express.Router();
const userController = require("../../Controllers/Group 15/UserController");

// User Routes
router.post("/user", userController.createUser);
router.get("/user", userController.getAllUsers);
router.get("/user/:id", userController.getUserById);
router.put("/user/:id", userController.updateUser);
router.delete("/user/:id", userController.deleteUser);

// Role Routes
router.post("/role", userController.createRole);
router.get("/role", userController.getAllRoles);
router.put("/role/:roleId", userController.updateRole);
router.delete("/role/:roleId", userController.deleteRole);

// Role Assignment
router.put("/user/:id/role/:roleName", userController.assignRoleToUser);
router.delete("/user/:id/role/:roleName", userController.revokeRoleFromUser);

module.exports = router;