const express = require("express");
const {
  createShipping,
  readShipping,
  readShippingById,
  updateShipping,
  deleteShipping,
  
} = require("../controllers/shippingController");

const router = express.Router();

router.post("/createShip", createShipping);
router.get("/readShip", readShipping);
router.get("/readShipById/:id", readShippingById);
router.put('/updateShip/:id', updateShipping); 
router.delete("/deleteShip", deleteShipping);

module.exports = router;
