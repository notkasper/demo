const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');
const spawn = require('child_process').spawn;

const yieldPath = path.join(__dirname, '../engine/Yield_MOCK.csv');

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

const delay = 500;

const getAreaYieldGraph = async (req, res) => {
  spawn('python', ['./engine/area_yield.py', 7, 3]);

  // super ugly temporary workaround
  setTimeout(() => {
    filename = 'area-yield.png';
    res.status(200).send({ data: filename });
  }, delay);
};

const getYieldCost = async (req, res) => {
  spawn('python', ['./engine/yield_cost.py', 7, 3]);

  // super ugly temporary workaround
  setTimeout(() => {
    filename = 'yield-cost.png';
    res.status(200).send({ data: filename });
  }, delay);
};

module.exports = { getCrops, getproposals, getAreaYieldGraph, getYieldCost };
