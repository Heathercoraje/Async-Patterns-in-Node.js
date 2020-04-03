const express = require('express');
const fs = require('fs');
const fsPromises = require('fs').promises;
const datafile = 'server/data/clothing.json';
const router = express.Router();

/* GET all clothing */
router.route('/').get(async function(req, res) {
  try {
    const clothingData = await getClothingData();
    res.send(clothingData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.toString() });
  }
});

async function getClothingData() {
  const rawData = await fsPromises.readFile(datafile, 'utf8');
  const data = JSON.parse(rawData);
  return data;
}

module.exports = router;
