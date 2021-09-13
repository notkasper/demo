const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');
const spawn = require('child_process').spawn;

const yieldPath = path.join(__dirname, '../fixtures/Yield_MOCK.csv');

const yield = [];

fs.createReadStream(yieldPath)
  .pipe(csv())
  .on('data', (row) => {
    yield.push(row);
  })
  .on('end', () => {
    console.log(`CSV file successfully processed; ${yield.length} rows read`);
  });

const getCrops = async (req, res) => {
  const crops = yield.reduce((acc, curr) => {
    if (acc.length > 10) {
      return acc;
    }
    if (!acc.includes(curr.Crop)) {
      acc.push(curr.Crop);
    }
    return acc;
  }, []);
  res.status(200).send({ data: crops });
};

const getproposals = async (req, res) => {
  const proposals = yield.reduce((acc, curr) => {
    const code = curr['Proposal code'];
    if (!acc.includes(code)) {
      acc.push(code);
    }
    return acc;
  }, []);
  res.status(200).send({ data: proposals });
};

const getAreaYieldModel = async (req, res) => {
  const process = spawn('python', ['./engine/app.py', 7, 3]);

  process.stdout.on('data', (data) => {
    result = JSON.parse(data.toString());
    console.log('Sum ' + result.sum);
  });
};

module.exports = { getCrops, getproposals, getAreaYieldModel };
