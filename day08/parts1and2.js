const fs = require('fs');

let inputFile = fs.readFileSync(process.argv[2], 'utf8');
let lines = inputFile.split('\n');

const regList = {};
let globalMax = -Infinity;

function doOp(reg, operator, amount) {
  if (!regList[reg]) {
    regList[reg] = 0;
  }

  if (operator === 'dec') {
    regList[reg] -= amount;
  } else {
    regList[reg] += amount;
  }
}

function findMax(regList) {
  let max = -Infinity;
  for (const reg in regList) {
    if (regList[reg] > max) {
      max = regList[reg];
    }
  };

  return max;
}

function evalCondition(varr, op, value) {
  if (!regList[varr]) {
    regList[varr] = 0;
  }

  switch (op) {
    case '<':
      return regList[varr] < value;
    case '<=':
      return regList[varr] <= value;
    case '==':
      return regList[varr] == value;
    case '>':
      return regList[varr] > value;
    case '>=':
      return regList[varr] >= value;
    case '!=':
      return regList[varr] != value;
    default:
      console.log('oops')
  }
}

for (const line of lines) {
  let parts = line.split(' if ');
  let left = parts[0].split(' ');
  let right = parts[1].split(' ');

  let reg = left[0];
  let operator = left[1];
  let amount = Number(left[2]);

  let conditionVar = right[0];
  let conditionOp = right[1];
  let conditionValue = Number(right[2]);

  if (evalCondition(conditionVar, conditionOp, conditionValue)) {
    doOp(reg, operator, amount);
  }

  const currentMax = findMax(regList);
  if (currentMax > globalMax) {
    globalMax = currentMax;
  }
}

console.log(findMax(regList));
console.log(globalMax);