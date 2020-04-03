const express = require('express');
const fs = require('fs');
const datafile = 'server/data/clothing.json';
const router = express.Router();

/* GET all clothing */
router.route('/')
  .get(function(req, res) {
    getClothingData()
      .then(data => {
        console.log('Sending data to browser');
        res.send(data);
      })
      .catch(error => res.status(500).send(error))
      .finally(() => console.log('Complete processing Promise'));

    console.log('doing more work');
  });

async function getClothingData() {
  return new Promise((resolve, reject) => {
    fs.readFile(datafile, 'utf8', (error, data) => {
      if (error) {
        reject(error)
      }
      else {
        resolve(data);
      }
    });
  });
  // A promise object returned by Promise Constructor(executor)
};

module.exports = router;
