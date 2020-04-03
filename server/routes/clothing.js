const express = require('express');
const fs = require('fs');
const fsPromises = require('fs').promises;
const datafile = 'server/data/clothing.json';
const router = express.Router();

/* GET all clothing */
router
  .route('/')
  .get(async function(req, res) {
    try {
      const clothingData = await getClothingData();
      res.send(clothingData);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.toString() });
    }
  })
  .post(async function(req, res) {
    let data = await getClothingData();
    let nextID = getNextAvailableID(data);
    let newClothingItem = {
      clothingID: nextID,
      itemName: req.body.itemName,
      price: req.body.price
    };

    data.push(newClothingItem);
    await saveClothingData(data);
    res.status(201).send(newClothingItem);
  });
async function getClothingData() {
  const rawData = await fsPromises.readFile(datafile, 'utf8');
  const data = JSON.parse(rawData);
  return data;
}

async function saveClothingData(data) {
  return fsPromises.writeFile(datafile, JSON.stringify(data, null, 4));
}

function getNextAvailableID(data) {
  let max = 0;
  data.forEach(data => {
    if(data.clothingID > max) {
      max = data.clothingID;
    }
  });
  return ++max
}

module.exports = router;
