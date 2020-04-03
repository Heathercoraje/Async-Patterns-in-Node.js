const express = require('express');
const fs = require('fs');
const datafile = 'server/data/clothing.json';
const router = express.Router();

/* GET all clothing */
router.route('/')
  .get(function(req, res) {
    getClothingData((error, data) => {
      if (error) console.log(error);
      else {
        console.log('returning clothing data');
        res.send(data); 
      }
    });
    console.log('doing more work')
  });

async function getClothingData(callback) {
  fs.readFile(datafile, 'utf8', (error, data) => {
    if (error) callback(error, null);
    else {
      callback(null, data);
    }
  });
};

module.exports = router;
