const express = require("express");
const haversine = require("haversine-distance");

const router = express.Router();

function calculateDeliveryFee(distance) {
  const perKmRate = 0.2;
  return distance * perKmRate;
}

router.post("/calculate", async (req, res) => {
  try {
    const { manufacturerLocation, wholesalerLocation } = req.body;
    console.log(manufacturerLocation, wholesalerLocation )
    if (!manufacturerLocation || !wholesalerLocation) {
      return res.status(400).json({ error: "Invalid locations provided" });
    }
    
    const distance = haversine(manufacturerLocation, wholesalerLocation) / 1000; 
    const fee = calculateDeliveryFee(distance);

    console.log({ distance: `${distance.toFixed(2)} km`, fee: `$${fee.toFixed(2)}` });

    res.json({ distance: `${distance.toFixed(2)} km`, fee: `$${fee.toFixed(2)}` });
  } catch (error) {
    console.error("Error calculating delivery fee:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
